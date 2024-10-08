import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    Container,
    Paper,
    Typography,
    Box
} from '@mui/material';
import { ClipLoader } from 'react-spinners';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarQuickFilter,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';

// Custom Toolbar Component
function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />  {/* Column selection button */}
            <GridToolbarFilterButton />   {/* Filter button */}
            <GridToolbarQuickFilter />    {/* Quick filter input */}
        </GridToolbarContainer>
    );
}
import { useSidebar } from '../components/SidebarContext';

const StyledContainer = styled(Container)({
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    minWidth: '79vw',
    flexDirection: 'column',
    fontFamily: 'system-ui',
    background: 'inherit',
    paddingBottom: '40px !important',
    fontWeight: '500',
    padding: '1.5rem',

});

const Heading = styled(Typography)({
    marginBottom: '1.2rem !important',
    fontWeight: '500 !important',
    fontSize: '1.1rem  !important',
    fontFamily: 'system-ui !important',
    textAlign: 'center',
    color: '#213547 !important'

});

export default function CallDetails() {
    const { collapsed, GlobalUrl, ClBox } = useSidebar();

    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDashData = async () => {
        setLoading(true);
        try {
            const agentId = ClBox.agentId;
            if (!agentId) return;

            const reqData = {
                type: "dynamic_procedure",
                procedure_name: "asterisk.sp_callregister_cyber_dash",
                procedure_param: ["", "", "ALL", agentId]
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
            };

            const response = await fetch(GlobalUrl, options);
            if (!response.ok) throw new Error('Internal server error');

            const data = await response.json();

            if (data.success) {
                const result = data.result || {};
                const fetchedColumns = result.columns.map((header, index) => ({
                    field: `col${index}`,
                    headerName: header,
                    width: 190,
                }));
                const fetchedRows = result.rows.map((row, rowIndex) =>
                    row.reduce((acc, cell, cellIndex) => ({
                        ...acc,
                        [`col${cellIndex}`]: cell,
                    }), { id: rowIndex })
                );
                setColumns(fetchedColumns);
                setRows(fetchedRows);
            } else {
                console.log(data);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (ClBox.agentId) {
            fetchDashData();
        }
    }, [ClBox.agentId]);

    return (
        <div id={`${collapsed ? 'heroSection' : 'hero'}`} className="hero">
            <div id="tableContY" className='compSection'>
                <StyledContainer style={{ minWidth: collapsed ? '84vw' : '', marginLeft: collapsed ? '-40px' : '', transition: '.4s ease' }} className='Bigcontainer' maxWidth="sm">
                    <Heading component="h1">Call Details</Heading>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                            <ClipLoader color={'#000'} loading={loading} size={40} />
                        </div>
                    ) : (
                        <Box sx={{ height: '60vh', width: '100%' }}>
                            <DataGrid
                                style={{ background: "white", padding: '5px 3px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                slots={{ toolbar: CustomToolbar }}
                                slotProps={{
                                    toolbar: {
                                        showQuickFilter: true,

                                    },
                                }}
                                disableDensitySelector
                                sx={{
                                    '& .MuiDataGrid-root': {
                                        border: 'none', // Remove grid border
                                    },
                                    '& .MuiDataGrid-cell': {
                                        color: '#1c1b1b',
                                        fontWeight: '400',
                                        fontSize: '14.5px',
                                        fontFamily: 'Recursive, sans-serif',
                                        backgroundColor: '#f2f6fa',
                                        border: '1px solid white'
                                    },
                                    '& .MuiDataGrid-columnHeaders': {
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '13.5px',
                                        fontFamily: 'system-ui',
                                        whiteSpace: 'normal', // Allow text wrapping
                                        overflow: 'visible',  // Ensure content is visible when wrapping
                                        lineHeight: '1.2em',  // Adjust line height for readability

                                        // Styling the child .MuiSvgIcon-root elements
                                        '& .MuiSvgIcon-root': {
                                            color: '#adadad',
                                        },
                                    },
                                    '& .MuiDataGrid-footerContainer': {
                                        backgroundColor: '#f2f6fa', // Footer background color
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: 'black',
                                    },
                                    '& .MuiDataGrid-row': {
                                        borderBottom: '1px solid white',
                                        backgroundColor: '#f2f6fa',
                                    },


                                    '& .MuiDataGrid-sortIcon': {
                                        color: 'red !important'
                                    }
                                }}
                            />
                        </Box>
                    )}
                </StyledContainer>
            </div>
        </div>
    );
}
