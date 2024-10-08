import React, { useState, useEffect } from 'react';
import TrackDash from './TrackDash';
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

import '../css/complaint.css';
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
import { ArrowCircleLeft, ArrowLeft, Article, ArticleSharp, ArticleTwoTone, ChevronLeft, Clear, Compress, ExpandOutlined, FirstPage, KeyboardReturn, Launch, Pageview, Preview, QueryStats, Report, ReportGmailerrorredRounded, SearchTwoTone } from '@mui/icons-material';
import { useSidebar } from '../components/SidebarContext';
import zIndex from '@mui/material/styles/zIndex';



const StyledContainer = styled(Container)({
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    minWidth: '79vw',
    flexDirection: 'column',
    fontFamily: 'system-ui',
    background: 'white',
    paddingBottom: '40px !important',
    fontWeight: '500',
    padding: '1.5rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    '& MuiInputLabel-root': {

        fontFamily: 'Recursive, sans-serif !important',
    },

    '& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiInputLabel-shrink': {
        transform: 'translate(14px, -20px) scale(0.88) !important',
        fontFamily: 'Recursive, sans-serif',
    },
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

const StyledIcon = styled(QueryStats)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    color: "rgb(36 36 37)"
})

const StyledIcon2 = styled(ArticleSharp)({
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

    const now = new Date();
    const currentDate = now.toISOString().slice(0, 16);

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

    const [searchTab, setsearchTab] = useState(true);
    const [tableOff, settableOff] = useState(true);

    const resizeSearchTab = () => {
        setsearchTab(!searchTab);
    }

    const resizeTableTab = () => {
        settableOff(!tableOff);
    }
    const [LoaderOn, setLoaderOn] = useState(false);

    const [formData, setformData] = useState();

    const [incidentXtime, setIncidentXTime] = useState();

    const [complaintFormView, setcomplaintFormView] = useState(false);
    const [ListData, setListData] = useState([]);


    const [formDataTrack, setformDataTrack] = useState({
        type: "search",
        complaint_id: "",
        caller_no: ClBox.callerNumber,
        nccrp_no: "",
        category_code: "",
        created_date: "",
        district: "",
        status: "",
        from_date: new Date().toISOString().split('T')[0] + "T00:00",
        to_date: new Date().toISOString().split('T')[0] + "T23:59"
    });



    const fncToGetDistrict = () => {
        //API CALL 1-

        const reqData = {
            "type": "district_list",
            action_user: ClBox.agentId
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqData)
        }
        fetch(GlobalUrl, options).then(res => {
            if (!res.ok) {
                throw new Error('Internal server error')
            }
            return res.json();
        }).then(data => {

            if (data.success) {
                // console.log(data.result);
                setDistrictList(data.result);

            }
            else {
                console.log(data);
            }

        }).catch(err => {
            console.log(err);
        })


    }
    const fncToGetComplaintCategory = () => {
        //API CALL 1-
        const reqData = {
            "type": "complaint_category",
            action_user: ClBox.agentId
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqData)
        }
        fetch(GlobalUrl, options).then(res => {
            if (!res.ok) {
                throw new Error('Internal server error')
            }
            return res.json();
        }).then(data => {

            if (data.success) {
                // console.log(data.result);

                setcomplaintCategoryArray(data.result);
                //LOGIC TO AUTO SELECT THE ELEMENT 
            }
            else {
                console.log(data);
            }

        }).catch(err => {
            console.log(err);
        })

    }

    useEffect(() => {
        fncToGetDistrict();
        fncToGetComplaintCategory();
    }, []);

    useEffect(() => {
        setformDataTrack(prevFormData => ({
            ...prevFormData,
            caller_no: ClBox.callerNumber,
        }));
        if (formDataTrack.caller_no) {
            fncToSearch2();

        }
    }, [ClBox.callerNumber]);

    const handleInputChangeForAll = (event) => {
        const { name, value } = event.target;
        setformDataTrack({
            ...formDataTrack,
            [name]: value.trim(),
        })
    }

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
        setbox2(true);
        setLoaderOn(true);

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


                if (data.result.length != 0) {
                    // resizeSearchTab()
                    setsearchTab(false);
                    settableOff(true);
                    setListData(data.result);
                    setbox2(true);
                    setLoaderOn(false);
                } else {
                    settableOff(true);
                    setListData(data.result);
                    setbox2(true);
                    setLoaderOn(false);
                }

                // alert("data found on this number")
                // console.log(data.result);

            }
            else {
                resizeSearchTab()
                settableOff(true);
                console.log(data);
                setLoaderOn(false);
                alert("No Complaint found !")
            }

        }).catch(err => {
            setLoaderOn(false);
            // alert("No Complaint found !")
            console.log(err);
        })

    }

    const fncToSearch2 = () => {

        const dataX = {
            type: "search",
            complaint_id: formDataTrack.complaint_id,
            caller_no: ClBox.callerNumber,
            nccrp_no: formDataTrack.nccrp_no,
            category_code: formDataTrack.category_code,
            created_date: formDataTrack.created_date,
            district: formDataTrack.district,
            status: formDataTrack.status,
            from_date: "",
            to_date: ""
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataX)
        }

        fetch(GlobalUrl, options).then(res => {
            if (!res.ok) {
                throw new Error('Internal server error')
            }
            return res.json();
        }).then(data => {

            if (data.success) {

                setListData(data.result);
                setbox2(true);
                // alert("data found on this number")
                // console.log(data.result);
                settableOff(true);
                resizeSearchTab()

            }
            else {
                console.log(data);
                resizeSearchTab()
                settableOff(true);

                setLoaderOn(false);
                // alert("No Complaint found !")
            }

        }).catch(err => {
            console.log(err);
        })

    }



    const formToOpen = (id) => {

        const reqData = {
            type: "complaint_details",
            complaint_id: id,
            action_user: ClBox.agentId,
            agent_level: ''
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqData)
        }
        fetch(GlobalUrl, options).then(res => {
            if (!res.ok) {
                throw new Error('Internal server error')
            }
            return res.json();
        }).then(data => {
            if (data.success) {
                const result = data.result;


                setIncidentXTime(result.incident_time);


                setformData(prevFormData => ({
                    ...prevFormData,
                    email: result.email_id,
                    callerName: result.caller_name,
                    callerNumber: result.caller_no,
                    callerGender: result.caller_gender,
                    callerAge: result.caller_age,
                    victimName: result.victim_name,
                    victimGender: result.victim_gender,
                    victimAge: result.victim_age,
                    VictimNum: result.victim_contact_no,
                    VictimaltNum: result.alternate_number,
                    addressLine1: result.address_1,
                    addressLine2: result.address_2,
                    landmark: result.landmark,
                    // district: result.district,
                    pincode_flag: result.pincode_flag,
                    pincode: result.pincode,

                    districtCyberLab: result.district_cyber_labs,
                    incidentDetails: result.incident_details,
                    LostMoneyState: result.lost_money_state,
                    incidentDate: result.incident_date,
                    incidentTime: result.incident_time,
                    IdentificationId: result.identity_number,
                    samePerson: result.same_person,
                    TotalTransectionAmount: result.total_transaction_amount,
                    suspectedWebsite: result.suspect_website_url,
                    suspectedBankAccNum: result.suspect_bank_account_no,
                    suspectedMobileNum: result.suspect_mobile,
                    suspectedEmail: result.suspect_email,
                    suspect_name: result.suspect_name,
                    suspectedAddress: result.suspect_address,
                    remarks: result.suspect_remarks,
                    acknowledgement: result.acknowledge_1,
                    acknowledgement2: result.acknowledge_2,
                    acknowledgement3: result.acknowledge_3,
                    acknowledgement4: result.acknowledge_4,
                    updateTime: result.update_date,
                    status: result.status,
                    // Add any additional fields you might need
                    complaintId: result.complaint_id,
                    nccrpNo: result.nccrp_no,
                    transactionRemarks: result.transaction_remarks,
                    lastUserId: result.last_user_id,
                    lastUserIp: result.last_user_ip,
                    lastUpdateIp: result.last_update_ip,
                    createdDate: result.created_date,
                    suspectDetails: result.suspect_details,
                    complaintCategory: result.category_code,
                    complaintSubCategory: result.sub_category_code,
                    complaintDesc: result.category_desc_code,
                    sourceOfComplaint: result.complaint_source,
                    district: result.district,
                    state: result.state_code,
                    nearestPoliceStation: result.police_station,
                    complaintNumber: result.complaint_id,
                    identificationType: result.identity_type,
                    TotalBlockedAmount: result.total_blocked_amount,
                    status_remarks: result.status_remarks,
                    evidence_files: result.evidence_files

                }));

                // console.log(result);
                setcomplaintFormView(true);
            }
            else {
                if (data.result.startsWith('Agent ID:')) {
                    const agentIdEndIndex = data.result.indexOf(' ') + 1;
                    const message = data.result.slice(agentIdEndIndex);
                    alert(message);
                }
                console.log(data);
            }

        }).catch(err => {
            console.log(err);
        })


    }

    const fncToHideForm = () => {
        fncToGetDistrict();
        setcomplaintFormView(false);
        fncToSearch();
        // resizeSearchTab();
    }

    //call the api and fetch table data

    // ["5665656565","5665614412","1212121212","111111111111111"]


    const columns = [
        { field: 'caller_no', headerName: 'Caller Number', width: 150 },
        { field: 'victim_name', headerName: 'Victim Name', width: 150 },
        { field: 'victim_contact_no', headerName: 'Victim Number', width: 150 },
        {
            field: 'complaint_id',
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
        {
            field: 'nccrp_no',
            headerName: 'NCCRP Number',

            width: 200,
            renderCell: (params) => {
                let values = params.value;
                if (typeof values === 'string') {
                    try {
                        const parsedArray = JSON.parse(values);
                        if (Array.isArray(parsedArray)) {
                            values = parsedArray;
                        }
                    } catch (error) {

                    }
                }
                return (
                    <span style={{ color: "black", fontWeight: '500', textAlign: 'center' }}>
                        {Array.isArray(values) ? values.join(', ') : values}

                    </span>
                );
            }
        }

        ,
        { field: 'created_date', headerName: 'Date Of Complaint', width: 190 },
        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'last_user_id', headerName: 'Agent Name', width: 150 },
        { field: 'complaint_source', headerName: 'Source of Complaint', width: 180 },
        { field: 'police_station', headerName: 'Police Station', width: 150 },
        { field: 'category', headerName: 'Complaint Category', width: 180 },
        { field: 'total_transaction_amount', headerName: 'Fraud Amount', width: 150 },
    ];




    //Grid data 



    return (
        <>
            {
                complaintFormView ? (
                    <>

                        <div id={`${collapsed ? 'heroSection' : 'hero'}`} className="hero">

                            <button style={{marginTop:collapsed? '-14px':'', left: collapsed ? "205px" : "" ,position:collapsed? 'absolute':'', transform:collapsed ? 'rotate(0deg)' :"",}} onClick={fncToHideForm} className='Btn'>
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

                                <Box onClick={resizeSearchTab} className="Chead" sx={{ textAlign: 'left' }}>
                                    <StyledTypography variant="h4" component="h2">
                                        <StyledIcon /> Track Complaint <span style={{ fontSize: '10px', color: "green", marginLeft: '5px' }}>Track the complaint status through one of them: <Pageview style={{ width: '15px', height: '15px', fill: "#229da7" }} /></span>


                                    </StyledTypography>
                                    {
                                        searchTab ? (<Compress onClick={resizeSearchTab} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizeSearchTab} className='tabMngIcon' />)
                                    }
                                </Box>




                                <StyledBox>

                                    {
                                        searchTab ? <Grid container spacing={4}>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <TextField name='caller_no' onChange={handleInputChangeForAll} value={formDataTrack.caller_no} className='input' fullWidth label="Mobile Number" variant="outlined" />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <TextField name='nccrp_no' onChange={handleInputChangeForAll} value={formDataTrack.nccrp_no} className='input' fullWidth label="NCCRP Number" variant="outlined" />
                                            </Grid>

                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControl fullWidth variant="outlined" >
                                                    <InputLabel htmlFor="district">District</InputLabel>
                                                    <Select onChange={handleInputChangeForAll} value={formDataTrack.district} name="district" className='select' label="District" >
                                                        {
                                                            DistrictList.map((elm, index) => (
                                                                <MenuItem
                                                                    key={index}
                                                                    value={elm.district_code}>{elm.district_name}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>


                                                </FormControl>
                                            </Grid>


                                            <Grid item xs={12} sm={6} md={4}>
                                                <TextField value={formDataTrack.complaint_id} onChange={handleInputChangeForAll} name='complaint_id' className='input' fullWidth label="Complaint Number" variant="outlined" />
                                            </Grid>

                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel htmlFor="Complaint">Select Complaint</InputLabel>
                                                    <Select name="category_code" value={formDataTrack.category_code} className='select' label="Select Complaint" onChange={handleInputChangeForAll}  >
                                                        {
                                                            complaintCategoryArray.map((elm, index) => (
                                                                <MenuItem
                                                                    key={index}
                                                                    value={elm.category_id}>{elm.category}</MenuItem>
                                                            ))

                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControl fullWidth variant="outlined" >
                                                    <InputLabel htmlFor="district">Status</InputLabel>
                                                    <Select onChange={handleInputChangeForAll} value={formDataTrack.status} name="status" className='select' label="District" >
                                                        <MenuItem value=""><em>None</em></MenuItem>
                                                        <MenuItem value="NEW">New Complaints</MenuItem>
                                                        <MenuItem value="PENDING">Pending Complaints</MenuItem>
                                                        <MenuItem value="CLOSED">Closed Complaints </MenuItem>
                                                        <MenuItem value="registered_in_nccrp">Registerd in NCCRP</MenuItem>
                                                        <MenuItem value="fir_registered">FIR Registered</MenuItem>


                                                    </Select>


                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12} sm={3} md={12}>
                                                <Typography className='p' component="legend" variant="body1" style={{ marginTop: '10px', color: 'gray' }}>
                                                    Search Complaints by date range :
                                                </Typography>

                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <TextField
                                                    name='from_date'
                                                    onChange={handleInputChangeForAll}
                                                    value={formDataTrack.from_date}
                                                    className='input'
                                                    fullWidth
                                                    label="From Date"
                                                    variant="outlined"
                                                    type="datetime-local"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        max: currentDate,
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6} md={4}>
                                                <TextField
                                                    name='to_date'
                                                    onChange={handleInputChangeForAll}
                                                    value={formDataTrack.to_date}
                                                    className='input'
                                                    fullWidth
                                                    label="To Date"
                                                    variant="outlined"
                                                    type="datetime-local"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        max: currentDate,
                                                    }}
                                                />
                                            </Grid>



                                            <Grid item xs={12} >
                                                <StyledButton onClick={() => fncToSearch()} variant="contained" color="primary" className="button">
                                                    <SearchTwoTone className="bell" />
                                                    Search
                                                </StyledButton>
                                            </Grid>
                                        </Grid> : <></>
                                    }

                                </StyledBox>



                                {box2 ? (
                                    <>

                                        {LoaderOn ?
                                            (

                                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', zIndex: '999', background: 'rgb(242 246 250)' }}>

                                                    <ClipLoader size={40} color="green" />
                                                    <p style={{ color: 'green' }} className='p'>Searching...</p>
                                                </div>
                                            )
                                            :
                                            <>
                                                <Box onClick={resizeTableTab} className="Chead" sx={{ textAlign: 'left' }}>
                                                    <StyledTypography variant="h4" component="h2">
                                                        <StyledIcon2 /> Search Result
                                                    </StyledTypography>
                                                    {
                                                        tableOff ? (<Compress onClick={resizeTableTab} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizeTableTab} className='tabMngIcon' />)
                                                    }
                                                </Box>
                                                {tableOff ?
                                                    <StyledBox>
                                                        <TableContainer className='tblCont' component={Paper} sx={{ borderRadius: 1, height: "60vh", borderBottom: 0 }}>
                                                            <DataGrid
                                                                rows={ListData}
                                                                columns={columns}
                                                                pageSize={10}
                                                                getRowId={(row) => `${row.complaint_id}-${row.caller_no}`}
                                                                slots={{
                                                                    toolbar: CustomToolbar, // Use the custom toolbar here
                                                                }}
                                                                slotProps={{
                                                                    toolbar: {
                                                                        showQuickFilter: true,
                                                                    },
                                                                }}
                                                                disableDensitySelector
                                                                rowsPerPageOptions={[10]}
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
                                                    </StyledBox>
                                                    : <> </>
                                                }
                                            </>

                                        }

                                    </>) :

                                    <></>
                                }

                            </StyledContainer>

                        </div>
                    </div >
            } </>


    )


}
