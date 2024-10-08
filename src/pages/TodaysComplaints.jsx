import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    Container,
    Paper,
    Typography,
    Grid,
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

const Heading = styled(Typography)( {
    marginBottom: '1rem !important',
    fontWeight: '500 !important',
    fontSize: '1.1rem  !important',
    fontFamily: 'system-ui !important',
    textAlign: 'center',
});

const StyledContainer = styled(Container)( {
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

export default function TodaysComplaints() {
    const { collapsed } = useSidebar();

   
        const [rows, setRows] = useState([
            {
                id: 1,
                col0: 'Complaint 1',
                col1: 'Public Safety',
                col2: 'Resolved',
                date: '2024-10-01',
                priority: 'High',
                assignedTo: 'John Doe',
                description: 'Traffic light malfunctioning at main intersection.'
            },
            {
                id: 2,
                col0: 'Complaint 2',
                col1: 'Consumer Complaints',
                col2: 'Pending',
                date: '2024-10-02',
                priority: 'Medium',
                assignedTo: 'Jane Smith',
                description: 'Issue with product quality reported by several customers.'
            },
            {
                id: 3,
                col0: 'Complaint 3',
                col1: 'Cyber Crime',
                col2: 'In Progress',
                date: '2024-10-03',
                priority: 'Critical',
                assignedTo: 'Alice Johnson',
                description: 'Suspicious activity detected on user accounts.'
            },
            {
                id: 4,
                col0: 'Complaint 4',
                col1: 'Critical Infrastructure',
                col2: 'Resolved',
                date: '2024-10-04',
                priority: 'High',
                assignedTo: 'Robert Brown',
                description: 'Power outage affecting several neighborhoods.'
            },
            {
                id: 5,
                col0: 'Complaint 5',
                col1: 'Environmental Issues',
                col2: 'Pending',
                date: '2024-10-05',
                priority: 'Low',
                assignedTo: 'Emily Davis',
                description: 'Illegal dumping of waste near the park.'
            },
            {
                id: 6,
                col0: 'Complaint 6',
                col1: 'Traffic Violations',
                col2: 'Resolved',
                date: '2024-10-06',
                priority: 'Medium',
                assignedTo: 'Michael Wilson',
                description: 'Numerous reports of speeding in residential areas.'
            },
        ]);
        
    
    
        const [columns, setColumns] = useState([
            { field: 'col0', headerName: 'Complaint', width: 190 },
            { field: 'col1', headerName: 'Category', width: 190 },
            { field: 'col2', headerName: 'Status', width: 190 },
            { field: 'date', headerName: 'Date', width: 150 },
            { field: 'priority', headerName: 'Priority', width: 120 },
            { field: 'assignedTo', headerName: 'Assigned To', width: 150 },
            { field: 'description', headerName: 'Description', width: 450 },
        ]);
        
    const [loading, setLoading] = useState(false); // Set loading to false since we're using dummy data

    return (
        <div id={`${collapsed ? 'heroSection' : 'hero'}`} className="hero">
            <div id="tableContY" className='compSection'>
                <StyledContainer style={{ minWidth: collapsed ? '84vw' : '', marginLeft: collapsed ? '-40px' : '', transition: '.4s ease' }} className='Bigcontainer' maxWidth="sm">
                    <Heading component="h1">Today's Complaints</Heading>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                            <ClipLoader color={'#000'} loading={loading} size={40} />
                        </div>
                    ) : (
                        <Box sx={{ height: 550, width: '100%' }}>
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
