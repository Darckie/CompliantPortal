import React, { useState, useEffect } from 'react';
import TrackDash from './TrackDash';
import { ClipLoader } from 'react-spinners';
import '../css/complaint.css';
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
import {
    Container, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, Typography, TextField, Button, Grid, Box, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import styled from 'styled-components';
import { ArrowCircleLeft, ChevronLeft, Clear, FirstPage, Launch, NewReleases, Pageview, PendingActions, PendingActionsOutlined, QueryStats, SearchTwoTone } from '@mui/icons-material';
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


const StyledBox = styled(Box)({
    margin: '0px 2%',
    marginTop: '1.8rem',
    marginBottom: '2rem',
});

const StyledButton = styled(Button)({
    float: 'right',
    width: '130px',
    marginRight: '10px !important',

});



const StyledTypography = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    fontWeight: 'boldER',
    fontSize: '1.1rem',
    color: '#302e2e'
});

const StyledIcon = styled(NewReleases)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    color: "rgb(36 36 37)"
})

const StyledIcon2 = styled(ChevronLeft)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    color: "rgb(36 36 37)"
})


const ErrorBox = styled(Box)({
    display: 'flex',
    color: 'red',
    width: '100%',
    fontSize: '12px',
    alignItems: 'center',
    gap: '4px',
    justifyContent: 'flex-end',
    margin: '2px',
});


export default function TrackComplaint() {
    // const { collapsed, toggleSidebar } = useSidebar();
    const [box2, setbox2] = useState(false);



    const {
        collapsed,
        toggleSidebar,
        GlobalUrl,
        DistrictList,
        setDistrictList,
        complaintCategoryArray,
        ClBox, setClBox,
        setcomplaintCategoryArray,
        complaintComplaintDescArray,
        setcomplaintComplaintDescArray,
        complaintSourceArray,
        setcomplaintSourceArray,
        complaintSubCategoryArray,
        setcomplaintSubCategoryArray
    } = useSidebar();

    const [LoaderOn, setLoaderOn] = useState(false);

    const [formData, setformData] = useState();
    const [incidentXtime, setIncidentXTime] = useState();
    const [complaintFormView, setcomplaintFormView] = useState(false);
    // const [rows, setrows] = useState([]);
    const [rows, setRows] = useState([
        {
            id: 1,
            col0: 'Complaint 1',
            col1: 'Public Safety',
            col2: 'Resolved',
            date: '2024-10-01',
            priority: 'High',
            assignedTo: 'John Doe',
            description: 'Traffic light malfunctioning at main intersection.',
            complaintNumber: 'CMP-001' // Added complaint number
        },
        {
            id: 2,
            col0: 'Complaint 2',
            col1: 'Consumer Complaints',
            col2: 'Pending',
            date: '2024-10-02',
            priority: 'Medium',
            assignedTo: 'Jane Smith',
            description: 'Issue with product quality reported by several customers.',
            complaintNumber: 'CMP-002' // Added complaint number
        },
        {
            id: 3,
            col0: 'Complaint 3',
            col1: 'Cyber Crime',
            col2: 'In Progress',
            date: '2024-10-03',
            priority: 'Critical',
            assignedTo: 'Alice Johnson',
            description: 'Suspicious activity detected on user accounts.',
            complaintNumber: 'CMP-003' // Added complaint number
        },
        {
            id: 4,
            col0: 'Complaint 4',
            col1: 'Critical Infrastructure',
            col2: 'Resolved',
            date: '2024-10-04',
            priority: 'High',
            assignedTo: 'Robert Brown',
            description: 'Power outage affecting several neighborhoods.',
            complaintNumber: 'CMP-004' // Added complaint number
        },
        {
            id: 5,
            col0: 'Complaint 5',
            col1: 'Environmental Issues',
            col2: 'Pending',
            date: '2024-10-05',
            priority: 'Low',
            assignedTo: 'Emily Davis',
            description: 'Illegal dumping of waste near the park.',
            complaintNumber: 'CMP-005' // Added complaint number
        },
        {
            id: 6,
            col0: 'Complaint 6',
            col1: 'Traffic Violations',
            col2: 'Resolved',
            date: '2024-10-06',
            priority: 'Medium',
            assignedTo: 'Michael Wilson',
            description: 'Numerous reports of speeding in residential areas.',
            complaintNumber: 'CMP-006' // Added complaint number
        },
    ]);
    


    const [formDataTrack, setformDataTrack] = useState({
        type: "search",
        status: "NEW",
    })


    useEffect(() => {
        fncToSearch();
    }, [])



    //complaint result
    const showComplaintBox = () => {
        if (box2) {
            setbox2(false);
        } else {
            setbox2(true);
        }
    }
    //fnc to show form container
    const fncToSearch = () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataTrack)
        }

        fetch(GlobalUrl, options).then(res => {
            if (!res.ok) {
                throw new Error('Internal server error')
            }
            return res.json();
        }).then(data => {

            if (data.success) {
                // setrows(data.result);
            }
            else {
                console.log(data);

                alert("No Complaint found !")
            }

        }).catch(err => {

            console.log(err);
        })

    }




    const formToOpen = (id) => {

        setformData(prevFormData => ({
            ...prevFormData,
            email: "john.doe@example.com",
            callerName: "John Doe",
            callerNumber: "9876543210",
            callerGender: "Male",
            callerAge: "30",
            victimName: "Jane Smith",
            victimGender: "Female",
            victimAge: "28",
            VictimNum: "9988776655",
            VictimaltNum: "9988776656",
            addressLine1: "123 Main St",
            addressLine2: "Apt 4B",
            landmark: "Near Central Park",
            pincode_flag: true,
            pincode: "110001",
            suspect_name: "Doe Suspect",
            districtCyberLab: "Cyber Lab District 1",
            incidentDetails: "Fraudulent transaction on the bank account.",
            LostMoneyState: "Yes",
            incidentDate: "2024-10-01",
            incidentTime: "14:30",
            IdentificationId: "ID123456789",
            samePerson: false,
            TotalTransectionAmount: "5000",
            suspectedWebsite: "https://suspectedwebsite.com",
            suspectedBankAccNum: "1234567890123456",
            suspectedMobileNum: "9112233445",
            suspectedEmail: "suspect@example.com",
            suspectedAddress: "456 Elm St",
            remarks: "Urgent investigation needed.",
            acknowledgement: "Acknowledged by Officer A",
            acknowledgement2: "Reviewed by Officer B",
            acknowledgement3: "Under investigation",
            acknowledgement4: "Pending further action",
            updateTime: "2024-10-02T10:00:00Z",
            status: "In Progress",
            complaintId: "CMP123456",
            nccrpNo: "NCCRP-001",
            transactionRemarks: "Transaction flagged as suspicious.",
            lastUserId: "user123",
            lastUserIp: "192.168.1.1",
            lastUpdateIp: "192.168.1.2",
            createdDate: "2024-10-01T09:00:00Z",
            suspectDetails: "Last seen near Central Park.",
            complaintCategory: "Cyber Crime",
            complaintSubCategory: "Fraud",
            complaintDesc: "Online fraud through a phishing website.",
            sourceOfComplaint: "Online Portal",
            district: "District A",
            state: "Delhi",
            nearestPoliceStation: "Central Police Station",
            complaintNumber: "C123456789",
            identificationType: "Passport",
            TotalBlockedAmount: "2000",
            status_remarks: "Awaiting further information.",
            evidence_files: ["file1.jpg", "file2.pdf"]
        }));






        setIncidentXTime('');



        setcomplaintFormView(true);



    }

    const fncToHideForm = () => {
        setcomplaintFormView(false);
        fncToSearch();
        // resizeSearchTab();
    }

    //call the api and fetch table data



    const columns = [
        { field: 'col0', headerName: 'Complaint', width: 190 },
        { field: 'col1', headerName: 'Category', width: 190 },
        { field: 'col2', headerName: 'Status', width: 190 },
    
        {
            field: 'complaintNumber',
            headerName: 'Complaint Number',
            width: 200,
            renderCell: (params) => (
                <span
                    style={{ color: "blue", whiteSpace: 'nowrap', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => formToOpen(params.value)}
                >
                    {params.value}
                    <Launch style={{ width: '16px', marginLeft: '4px', verticalAlign: 'middle' }} />
                </span>
            )
        },
     
     


        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'priority', headerName: 'Priority', width: 120 },
        { field: 'assignedTo', headerName: 'Assigned To', width: 150 },
        { field: 'description', headerName: 'Description', width: 250 },


    ];


    //Grid data 



    return (
        <>
            {

                complaintFormView ? (
                    <>

                        <div id={`${collapsed ? 'heroSection' : 'hero'}`} className="hero">

                            <button style={{ marginTop: collapsed ? '-14px' : '', left: collapsed ? "205px" : "", position: collapsed ? 'absolute' : '', transform: collapsed ? 'rotate(0deg)' : "", }} onClick={fncToHideForm} className='Btn'>
                                <ArrowCircleLeft className='svg' />
                                Back
                            </button>

                            {incidentXtime !== undefined && formData && (
                                <TrackDash formdata={formData} incidentXTime={incidentXtime} />
                            )}
                        </div>
                    </>
                ) :
                    <div id={`${collapsed ? 'heroSection' : 'hero'}`} className="hero">
                        <div className='compSection'>
                            <StyledContainer style={{ minWidth: collapsed ? '84vw' : '', marginLeft: collapsed ? '-40px' : '', transition: '.4s ease' }} className='Bigcontainer' maxWidth="sm">
                                <Box className="Chead" sx={{ textAlign: 'left' }}>
                                    <StyledTypography variant="h4" component="h2">
                                        <StyledIcon /> New Registered Complaints <span style={{ fontSize: '10px', color: "green", marginLeft: '5px' }}>
                                            {/* Pending Complaints: <PendingActions style={{ width: '15px', height: '15px', fill: "#229da7" }} /> */}</span>
                                    </StyledTypography>
                                </Box>
                                <TableContainer className='tblCont' component={Paper} sx={{ borderRadius: 1, height: "60vh", borderBottom: 0 }}>

                                    <DataGrid
                                        style={{ background: "white", padding: '5px 3px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}
                                        rows={rows}
                                        columns={columns}
                                        pageSize={10}
                                        getRowId={(row) => `${row.complaint_id}-${row.caller_no}`}
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
                                </TableContainer>








                            </StyledContainer>

                        </div>
                    </div>
            } </>


    )


}
