import React, { useState, useEffect } from 'react';

import { ClipLoader } from 'react-spinners';
import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    DataGrid
} from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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
import { ArrowCircleLeft, ArrowLeft, Article, ArticleSharp, ArticleTwoTone, ChevronLeft, Clear, Compress, ExpandOutlined, FeaturedPlayList, Filter, FirstPage, Key, KeyboardReturn, Launch, Pageview, PictureAsPdf, Preview, QueryStats, Report, ReportGmailerrorredRounded, ReportOffRounded, Restore, RestoreTwoTone, SaveAlt, Scoreboard, SearchTwoTone } from '@mui/icons-material';
import { useSidebar } from '../components/SidebarContext';


//custom toolbar 
// Custom Toolbar Component


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
    width: '160px',
    marginRight: '10px !important',


});

const StyledButtonx = styled(Button)({
    float: 'right',
    width: '10px',
    marginTop: '-6px !important',
    marginBottom: '-20px !important'
});

const StyledButton2 = styled(Button)({
    float: 'right',
    width: '200px',
    marginBottom: '3px !important'
});


const StyledTypography = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    fontWeight: 'boldER',
    fontSize: '1.1rem',
    color: '#302e2e'
});

const StyledIcon = styled(Scoreboard)({
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

    const [StatusArray, setStatusArray] = useState([

        {
            value: "NEW",
            name: "New Complaints"

        },


        {
            value: "PENDING",
            name: "Pending Complaints"

        }
        , {
            value: "CLOSED",
            name: "Closed Complaints"

        }
        , {
            value: "registered_in_nccrp",
            name: "Registerd in NCCRP"

        }, {
            value: "fir_registered",
            name: "FIR Registered"

        }


    ])

    const [AllFilters, setAllFilters] = useState([

        {
            value: "CM",
            name: "Current Month"

        },


        {
            value: "PM",
            name: "Previous Month"

        }
        , {
            value: "7days",
            name: "Last 7 Days"

        }
        , {
            value: "15days",
            name: "Last 15 Days"

        }, {
            value: "custom",
            name: "Custom Select"

        }


    ])

    const resizeSearchTab = () => {
        setsearchTab(!searchTab);
    }

    const resizeTableTab = () => {
        settableOff(!tableOff);
    }
    const [LoaderOn, setLoaderOn] = useState(false);

    const [showFilter, setshowFilter] = useState([]);

    const [complaintFormView, setcomplaintFormView] = useState(false);
    const [filterData, setfilterData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [PolicestationList, setPolicestationList] = useState([]);
    const [PincodeList, setPincodeList] = useState([

        "110001",
        "110002",
        "110003",
        "110004",
        "110005",
        "110006",
        "110007",
        "110008",

    ]);

    const [isCustom, setisCustom] = useState(false);

    const [formDataTrack, setformDataTrack] = useState({
        type: "search",
        filter: '',
        district: "",
        policestation: "",
        pincode: '',
        complaint_category: "",
        complaintSubCategory: '',
        complaintDesc: '',
        status: "",
        result_type: '',
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

                // setDistrictList(data.result);

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
    const fncToGetSubComplaintCategory = (id) => {
        //API CALL 1-
        if (id) {
            const reqData = {
                "type": "complaint_sub_category",
                category_id: id,
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

                    setcomplaintSubCategoryArray(data.result);

                }
                else {
                    console.log(data);
                }

            }).catch(err => {
                console.log(err);
            })
        }

    }
    //4th api 
    const fncToGetComplaintDesc = (cid, cmc) => {
        const reqData = {
            "type": "complaint_desc",
            "category_id": formDataTrack.complaint_category, cmc,
            "sub_category_id": cid,
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
                setcomplaintComplaintDescArray(data.result);
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


    const CustomToolbar = ({ data = [] }) => {

        const exportExcel = () => {
            if (!Array.isArray(data) || data.length === 0) {
                console.error("No data available for Excel export");
                return;
            }

            try {
                const worksheet = XLSX.utils.json_to_sheet(data);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                XLSX.writeFile(workbook, 'data.xlsx');
            } catch (error) {
                console.error("Error exporting Excel file: ", error);
            }
        };

        const exportPDF = () => {
            if (!Array.isArray(data) || data.length === 0) {
                console.error("No data available for PDF export");
                return;
            }

            try {
                const doc = new jsPDF();
                doc.text('Data Export', 20, 10);

                // Use the headers array to create dynamic table headers
                const head = [headers]; // Creating a nested array for header

                // Map data dynamically based on headers
                const body = data.map(row => headers.map(header => row[header])); // Creating rows dynamically

                doc.autoTable({
                    head: head,
                    body: body,
                });
                doc.save('data.pdf');
            } catch (error) {
                console.error("Error exporting PDF file: ", error);
            }
        };

        return (
            <GridToolbarContainer>
                {/* <GridToolbarColumnsButton /> */}
                <GridToolbarFilterButton />
                <Box sx={{ flexGrow: 1 }} />
                <StyledButton2 onClick={exportExcel} color="primary" variant="contained">
                    Export to Excel<SaveAlt style={{ fill: 'white', marginLeft: '4px' }} />
                </StyledButton2>


                <StyledButton2 onClick={exportPDF} variant="contained" color="primary" className="button">
                    Export to PDF <PictureAsPdf style={{ fill: 'white' }} />
                </StyledButton2>
            </GridToolbarContainer>
        );
    };



    const handleInputChangeForAll = (event) => {
        const { name, value } = event.target;

        if (name === 'filter') {
            if (value === 'custom') {
                setisCustom(true)
            }
            else {
                setisCustom(false)
            }

        }

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


    const fncToReset = () => {
        setformDataTrack({
            type: "search",
            filter: '',
            district: "",
            policestation: "",
            pincode: '',
            complaint_category: "",
            complaintSubCategory: '',
            complaintDesc: '',
            status: "",
            from_date: new Date().toISOString().split('T')[0] + "T00:00",
            to_date: new Date().toISOString().split('T')[0] + "T23:59"
        })

        setisCustom(false);
    }


    const fetchfilterData = async () => {
        // setLoaderOn(true);

        //LOGIC TO SHOW AllFilters APPLIED :

        let formatX = []

        function fnctoshowAllFilters() {
            const filteredName = AllFilters
                .filter(obj => obj.value === formDataTrack.filter)
                .map(obj => obj.name)[0];
            // for multiple i would prefer [0,4,5] .map(obj=>obj.name).join(',');

            //2nd filter ---------------------
            const dist = DistrictList
                .filter(obj => obj.district_code === formDataTrack.district)
                .map(obj => obj.district_name)[0];

            // 3rd filter 
            const compCate = complaintCategoryArray
                .filter(obj => obj.category_id === formDataTrack.complaint_category)
                .map(obj => obj.category)[0];


            //4th filter
            const compSubCate = complaintSubCategoryArray
                .filter(obj => obj.sub_category_id === formDataTrack.complaintSubCategory)
                .map(obj => obj.sub_category)[0];


            // 5 th filter 
            const compDesc = complaintComplaintDescArray
                .filter(obj => obj.complaint_desc_id === formDataTrack.complaintDesc)
                .map(obj => obj.complaint_desc)[0];


            //6 th filter 

            const statusx = StatusArray
                .filter(obj => obj.value === formDataTrack.status)
                .map(obj => obj.name)[0];


            formatX.push({
                name: "Day Filter",
                value: filteredName
            });

            formatX.push({
                name: "District",
                value: dist
            });
            formatX.push({
                name: "Complliant Category",
                value: compCate
            });
            formatX.push({
                name: "Complaint Sub Category",
                value: compSubCate
            });
            formatX.push({
                name: "Complaint Description",
                value: compDesc
            });
            formatX.push({
                name: "Status",
                value: statusx
            });
            formatX.push({
                name: "Result Type",
                value: formDataTrack.result_type
            });

            setshowFilter(formatX);

        }

        fnctoshowAllFilters();

       
    };




 
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
    

    return (
        <>
            <div id={`${collapsed ? 'heroSection' : 'hero'}`} className="hero">
                <div className='compSection'>
                    <StyledContainer style={{ minWidth: collapsed ? '84vw' : '', marginLeft: collapsed ? '-40px' : '', transition: '.4s ease' }} className='Bigcontainer' maxWidth="sm">

                        <Box onClick={resizeSearchTab} className="Chead" sx={{ textAlign: 'left' }}>
                            <StyledTypography variant="h4" component="h2">
                                <StyledIcon />  Complaint Board
                            </StyledTypography>


                            {

                                searchTab ? (

                                    <Compress onClick={resizeSearchTab} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizeSearchTab} className='tabMngIcon' />)
                            }
                        </Box>

                        {
                            searchTab ?
                                <StyledButtonx onClick={() => fncToReset()} variant="contained" color="primary" className="button">
                                    <RestoreTwoTone className="bell" />

                                </StyledButtonx> : <></>
                        }


                        <StyledBox>

                            {
                                searchTab ? <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <FormControl fullWidth variant="outlined" >
                                            <InputLabel htmlFor="Filter">Filter</InputLabel>
                                            <Select onChange={handleInputChangeForAll} value={formDataTrack.filter} name="filter" className='select' label="dayfilter" >
                                                {/* <MenuItem value=""><em>None</em></MenuItem> */}


                                                {
                                                    AllFilters.map((obj, index) => (

                                                        <MenuItem key={index} value={obj.value}>{obj.name}</MenuItem>
                                                    ))
                                                }

                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {isCustom ? <>
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

                                    </> : <>

                                        <Grid item xs={12} sm={6} md={8}>

                                        </Grid>
                                    </>
                                    }






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
                                        <FormControl fullWidth variant="outlined" >
                                            <InputLabel htmlFor="policestation">Police Station</InputLabel>
                                            <Select onChange={handleInputChangeForAll} value={formDataTrack.policestation} name="policestation" className='select' label="policestation" >
                                                {
                                                    PolicestationList.map((elm, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={elm.policestation_code}>{elm.policestation_name}</MenuItem>
                                                    ))
                                                }
                                            </Select>


                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <FormControl fullWidth variant="outlined" >
                                            <InputLabel htmlFor="PinCode">Pin Code</InputLabel>
                                            <Select onChange={handleInputChangeForAll} value={formDataTrack.pincode} name="pincode" className='select' label="PinCode" >
                                                {
                                                    PincodeList.map((elm, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={elm}>{elm}</MenuItem>
                                                    ))
                                                }
                                            </Select>


                                        </FormControl>
                                    </Grid>






                                    <Grid item xs={12} sm={6} md={4}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="Complaint">Select Complaint</InputLabel>
                                            <Select name="complaint_category" value={formDataTrack.complaint_category} className='select' label="Select Complaint" onChange={handleInputChangeForAll}  >
                                                {
                                                    complaintCategoryArray.map((elm, index) => (
                                                        <MenuItem onClick={() => fncToGetSubComplaintCategory(elm.category_id)}
                                                            key={index}
                                                            value={elm.category_id}>{elm.category}</MenuItem>
                                                    ))

                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <FormControl fullWidth variant="outlined" >
                                            <InputLabel htmlFor="Cscategory">Complaint sub-category </InputLabel>
                                            <Select onChange={handleInputChangeForAll} value={formDataTrack.complaintSubCategory} name="complaintSubCategory" className='select' label="complaint sub-category" required>
                                                {
                                                    complaintSubCategoryArray.map((elm, index) => (
                                                        <MenuItem onClick={() => fncToGetComplaintDesc(elm.sub_category_id, '')} key={index} value={elm.sub_category_id}>{elm.sub_category}</MenuItem>
                                                    ))

                                                }
                                            </Select>

                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={12} sm={6} md={4}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="Cdesc">Complaint Description</InputLabel>
                                            <Select onChange={handleInputChangeForAll} value={formDataTrack.complaintDesc} name="complaintDesc" className='select' label="complaint Description" required>
                                                {
                                                    complaintComplaintDescArray.map((elm, index) => (
                                                        <MenuItem key={index} value={elm.complaint_desc_id}>{elm.complaint_desc}</MenuItem>
                                                    ))
                                                }

                                            </Select>

                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <FormControl fullWidth variant="outlined" >
                                            <InputLabel htmlFor="district">Status</InputLabel>
                                            <Select onChange={handleInputChangeForAll} value={formDataTrack.status} name="status" className='select' label="District" >
                                                {
                                                    StatusArray.map((elm, index) => (
                                                        <MenuItem key={index} value={elm.value}>{elm.name}</MenuItem>

                                                    ))

                                                }

                                                {/* <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value="NEW">New Complaints</MenuItem>
                                                <MenuItem value="PENDING">Pending Complaints</MenuItem>
                                                <MenuItem value="CLOSED">Closed Complaints </MenuItem>
                                                <MenuItem value="registered_in_nccrp">Registerd in NCCRP</MenuItem>
                                                <MenuItem value="fir_registered">FIR Registered</MenuItem> */}


                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <FormControl fullWidth variant="outlined" >
                                            <InputLabel htmlFor="result_type">Type</InputLabel>
                                            <Select onChange={handleInputChangeForAll} value={formDataTrack.result_type} name="result_type" className='select' label="result_type" >
                                                <MenuItem value="details">Details</MenuItem>
                                                <MenuItem value="summary">Summary</MenuItem>
                                            </Select>


                                        </FormControl>
                                    </Grid>

                                    {/* <Grid item xs={12} sm={3} md={12}>
                                                <Typography className='p' component="legend" variant="body1" style={{ marginTop: '10px', color: 'gray' }}>
                                                    Search Complaints by date range :
                                                </Typography>

                                            </Grid> */}



                                    <Grid item xs={12} >
                                        <StyledButton onClick={() => fetchfilterData()} variant="contained" color="primary" className="button">
                                            <FeaturedPlayList className="bell" />
                                            Generate
                                        </StyledButton>
                                    </Grid>
                                </Grid> : <></>
                            }

                        </StyledBox>



                        {!box2 ? (
                            <>
                                {LoaderOn ?
                                    (
                                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', zIndex: '999', background: 'rgb(242 246 250)' }}>

                                            <ClipLoader size={40} color="black" />
                                            <p style={{ color: 'black' }} className='p'>Searching...</p>
                                        </div>
                                    )
                                    :
                                    <>
                                        <Box onClick={resizeTableTab} className="Chead" sx={{ textAlign: 'left' }}>
                                            <StyledTypography variant="h4" component="h2">
                                                <StyledIcon2 />Result
                                                <Typography className='p' component="legend" variant="body1" style={{ marginLeft: '10px', color: 'gray' }}>
                                                    <div style={{ fontFamily: 'math', fontWeight: '500', fontSize: '12.8px', color: 'navy', display: 'flex' }}>

                                                        {
                                                            showFilter.map((obj, index) => (

                                                                obj.value ? <p style={{ border: '1px solid #edd6d6', padding: '4px 8px', marginRight: '6px', borderRadius: '4px', background: 'rgb(255 254 239 / 81%)' }} key={index}>{obj.name}  <span style={{ fontSize: '11px', color: 'gray', marginLeft: '6px' }}>{obj.value}</span>  </p> : <></>
                                                            )

                                                            )
                                                        }


                                                    </div>
                                                </Typography>
                                            </StyledTypography>
                                            {
                                                tableOff ? (<Compress onClick={resizeTableTab} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizeTableTab} className='tabMngIcon' />)
                                            }
                                        </Box>
                                        {tableOff ?
                                            <StyledBox>
                                                <TableContainer className='tblCont' component={Paper} sx={{ borderRadius: 1, height: "60vh", borderBottom: 0 }}>
                                                    <DataGrid
                                                        style={{ background: "white", padding: '5px 3px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}
                                                        rows={rows}
                                                        columns={columns}
                                                        pageSize={10}
                                                        rowsPerPageOptions={[10]}
                                                        slots={{ toolbar: CustomToolbar }}
                                                        slotProps={{ toolbar: { data: rows } }}
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
        </>


    )


}
