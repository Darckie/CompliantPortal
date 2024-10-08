
import React from 'react';
import '../css/complaint.css';
import { Container, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Button, Grid, Box, FormControlLabel, Checkbox } from '@mui/material';
import styled from 'styled-components';
import { Tty, Warning, ContactEmergencyRounded, PendingActions, PlusOne, Remove, ContactPage, ExpandOutlined, Compress, SecurityUpdate, ChevronLeft, FirstPage, WorkHistoryOutlined, AppRegistration, Phone, Close } from '@mui/icons-material';
import { useRef, useState, useEffect } from 'react';
import { useSidebar } from '../components/SidebarContext';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';



//css -------------------------------------

const StyledContainer = styled(Container)({
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    minWidth: '66vw !important',
    flexDirection: 'column',
    fontFamily: 'system-ui',
    background: 'white',
    paddingBottom: '40px !important',
    fontWeight: '500',
    padding: '2rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledBox = styled(Box)({
    margin: '0px 2%',
    marginTop: '1.8rem',
    transition: '.5s ease',
    marginBottom: '2.8rem',
});

const StyledButton = styled(Button)({
    float: 'right',
    width: '130px',
    marginRight: '10px !important'
});
const StyledButton2 = styled(Button)({
    float: 'left',
    background: 'red !important',
});


const StyledTypography = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    fontWeight: 'boldER',
    fontSize: '1.1rem',

});

const StyledIcon = styled(AppRegistration)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: 'green',
});
const StyledIcon2 = styled(ContactEmergencyRounded)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: 'green',
});
const StyledIcon3 = styled(ContactPage)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: 'green',
});
const StyledIcon4 = styled(SecurityUpdate)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: 'green',
});
const StyledIcon5 = styled(PendingActions)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: 'green',
});
const StyledIcon6 = styled(WorkHistoryOutlined)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: 'green',
});


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



//css -------------------------------------
const TrackDash = ({ formdata }) => {

    const {
        collapsed,
        toggleSidebar,
        GlobalUrl,
        DistrictList,
        setDistrictList,
        PolicStationList,
        setPolicStationList,
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

    //use state to set value of the check box
    const [box2, setbox2] = useState(false);
    const [lessCharError, setError] = useState({
        value: '',
        no: false
    });

    const [HistoryList, setHistoryList] = useState([]);
    const [callerTab, setCallerTab] = useState(true);
    const [MandatoryTab, setMandatoryTab] = useState(false);
    const [OptionalTab, setOptionalTab] = useState(false);
    const [AcknowledgeTab, setAcknowledgeTab] = useState(false);
    const [statusTab, setstatusTab] = useState(false);
    const [updateHistoryTab, setupdateHistoryTab] = useState(false);

    // 
    const [complaintCate, setcomplaintCate] = useState('');
    const [complaintSubCate, setcomplaintSubCate] = useState('');
    const [complaintDecs, setcomplaintDecs] = useState('');
    const [comlaintDistrict, setDistrinct] = useState('');
    const [complaintpoliceStation, setcomplaintpoliceStation] = useState('');
    const [complaintSource, setcomplaintSource] = useState('');
    //form data 
    const [formData, setFormData] = useState({
        callerName: '',
        callerGender: '',
        callerAge: '',
        callerNumber: '',
        victimName: '',
        victimGender: '',
        victimAge: '',
        VictimNum: '',
        VictimaltNum: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',

        pincode: '',

        districtCyberLab: '',
        //second label
        incidentDetails: '',
        incidentDate: '',
        IdentificationId: '',
        samePerson: false,
        transactionDetails: [{ bankName: '', transactionId: '', transactionDate: '', transactionAmount: '' }],
        TotalTransectionAmount: '',
        suspectedWebsite: '',
        suspectedBankAccNum: '',
        suspectedMobileNum: '',
        suspectedEmail: '',
        suspectedAddress: '',
        remarks: '',

        //lvl to elm
        acknowledgement1: '',
        acknowledgement2: '',
        acknowledgement3: '',
        acknowledgement4: '',
        updateTime: '',
        status: '',

        complaintCategory: '',
        complaintSubCategory: '',
        complaintDesc: '',
        sourceOfComplaint: '',

        district: '',
        nearestPoliceStation: '',
        complaintNumber: '',


    });


    const fncToGetDistrict = () => {
        //API CALL 1-

        const reqData = {
            "type": "district"
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
            "type": "complaint_category"
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
                alert("failed")
                console.log(data);
            }

        }).catch(err => {
            console.log(err);
        })

    }

    const fncToGetComplaintSource = () => {
        //API CALL 1-

        const reqData = {
            "type": "complaint_source_list",
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
                setcomplaintSourceArray(data.result);

            }
            else {
                console.log(data);
            }

        }).catch(err => {
            console.log(err);
        })

    }


    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            ...formdata,
        }));

        fncToGetDistrict(),

            fncToGetComplaintSource()
        fncToGetComplaintCategory(),
            console.log({ formdata });
    }, [formdata]);



    useEffect(() => {
        if (complaintCategoryArray && formData.complaintCategory) {
            const elm = complaintCategoryArray.find(obj => obj.category_id === formData.complaintCategory);
            if (elm) {
                setcomplaintCate(elm.category);
                fncToGetSubComplaintCategory(elm.category_id);
            }
        }

        if (DistrictList && formData.district) {
            const elm2 = DistrictList.find(obj => obj.district_code === formData.district);
            if (elm2) {
                setDistrinct(elm2.district_name);
                fncToGetPoliceStations(elm2.district_code);
            }
        }

        if (complaintSourceArray && formData.sourceOfComplaint) {
            const elm3 = complaintSourceArray.find(obj => obj.source_id === formData.sourceOfComplaint);
            if (elm3) {
                setcomplaintSource(elm3.source_name);
            }
        }



        if (formData.complaintNumber) {
            fncToGetUpdateHistory(formData.complaintNumber);
        }
        if (formData.LostMoneyState) {
            fncToGetTransactionDetails(formData.complaintNumber);
        }


    }, [complaintCategoryArray]);



    useEffect(() => {
        if (complaintSubCategoryArray && formData.complaintSubCategory) {
            const elm4 = complaintSubCategoryArray.find(obj => obj.sub_category_id === formData.complaintSubCategory);
            if (elm4) {
                setcomplaintSubCate(elm4.sub_category);
                fncToGetComplaintDesc(formData.complaintCategory, elm4.sub_category_id);
            }
        }



    }, [complaintCategoryArray]);



    useEffect(() => {
        if (PolicStationList && formData.nearestPoliceStation) {
            const elm6 = PolicStationList.find(obj => obj.police_station_code === formData.nearestPoliceStation);
            if (elm6) {
                setcomplaintpoliceStation(elm6.police_station_name);
            }
        }

    }, [PolicStationList]);

    useEffect(() => {
        if (complaintComplaintDescArray && formData.complaintDesc) {
            const elm5 = complaintComplaintDescArray.find(obj => obj.complaint_desc_id === formData.complaintDesc);

            if (elm5) {
                setcomplaintDecs(elm5.complaint_desc);

            }
        }
    }, [complaintComplaintDescArray]);


    const fncToGetUpdateHistory = (id) => {
        //API CALL 1-

        const reqData = {
            type: "complaint_history",
            complaint_id: id
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

                setHistoryList(data.result);
                
            }
            else {
                console.log(data);
            }

        }).catch(err => {
            console.log(err);
        })


    }


    // 3rd api 
    const fncToGetSubComplaintCategory = (id) => {
        //API CALL 1-
        if (id) {
            const reqData = {
                "type": "complaint_sub_category",
                category_id: id
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
    const fncToGetTransactionDetails = (id) => {
        //API CALL 1-
        if (id) {
            const reqData = {
                "type": "complaint_transaction",
                complaint_id: id
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
                    setFormData(prevState => ({
                        ...prevState,
                        transactionDetails: data.result
                    }));


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
    const fncToGetComplaintDesc = (cid, csid) => {
        //API CALL 1-

        const reqData = {
            "type": "complaint_desc",
            "category_id": cid,
            "sub_category_id": csid
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


    const fncToGetPoliceStations = (id) => {
        //API CALL 1-
        if (id) {
            const reqData = {
                "type": "police_station",
                "district_code": id
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
                    setPolicStationList(data.result);


                }
                else {
                    console.log(data);
                }

            }).catch(err => {
                console.log(err);
            })
        }

    }

    //TRANSECTION DETAILS---------------------------
    const handleTransactionChange = (index, event) => {
        const { name, value } = event.target;
        const updatedTransactions = [...formData.transactionDetails];
        updatedTransactions[index] = {
            ...updatedTransactions[index],
            [name]: value
        }

        let totallLostMoney = 0;
        updatedTransactions.forEach(elem => {
            totallLostMoney += parseFloat(elem.transactionAmount || 0, 10); // Safeguard against NaN
        });

        console.log(totallLostMoney);
        setFormData({
            ...formData,
            transactionDetails: updatedTransactions,
            TotalTransectionAmount: totallLostMoney,
        })

    }

    //operate a new transection detail box
    const addTransaction = () => {
        setFormData({
            ...formData,
            transactionDetails: [
                ...formData.transactionDetails,
                { bankName: '', transactionId: '', transactionDate: '', transactionAmount: '' }
            ]
        })
    }
    const removeTransaction = (index) => {
        const updatedTransactions = [...formData.transactionDetails];
        updatedTransactions.splice(index, 1); // Remove the transaction at the given index

        let totallLostMoney = 0;
        updatedTransactions.forEach(elem => {
            totallLostMoney += parseFloat(elem.transactionAmount || 0, 10); // Safeguard against NaN
        });

        setFormData({
            ...formData,
            transactionDetails: updatedTransactions,
            TotalTransectionAmount: totallLostMoney,
        });
    };



    const handleInputChangeForAll = (event) => {
        const { name, value } = event.target;
        const specialCharPattern = /[^a-zA-Z0-9\s.,'-]/;

        if (name === "incidentDetails") {
            if (specialCharPattern.test(value)) {
                return;
            }
            if (value.length < 200) {
                setError({
                    value: "A minimum of 200 characters  !",
                    no: true
                })
            }
        }




        setFormData({
            ...formData,
            [name]: value,
        })


    }

    const handleSamePersonCheckboxChange = (event) => {
        const { checked } = event.target;


        setFormData((prevFormData) => ({
            ...prevFormData,
            samePerson: checked,
            victimName: checked ? prevFormData.callerName : '',
            victimGender: checked ? prevFormData.callerGender : '',
            victimAge: checked ? prevFormData.callerAge : '',

        }))
    };

    const formRef = useRef(null);


    //HANDLE LOST MONEY CHANGE
    // const handleLostMoneyChange = (event) => {
    //     const { checked } = event.target;
    //     setLostMoneyState(checked);
    // };
    const handleLostMoneyChange = (event) => {

        const { checked } = event.target;

        setFormData({
            ...formData,
            LostMoneyState: checked,
            transactionDetails: checked ? [{ bankName: '', transactionId: '', transactionDate: '', transactionAmount: '' }] : '',
        });



    };


    const SecondBox = () => {
        if (box2) {
            setbox2(false);
        } else {
            setbox2(true);
        }
    }

    //TABBING SYSTEM EXPEND AND COMPRESS
    const resizeCaller = () => {
        setCallerTab(!callerTab);
    }

    const resizeOptional = () => {
        setOptionalTab(!OptionalTab);
    }


    const resizeMandatory = () => {
        setMandatoryTab(!MandatoryTab);
    }
    const resizeAknowledgeTab = () => {
        setAcknowledgeTab(!AcknowledgeTab);
    }


    const resizestatusTab = () => {
        setstatusTab(!statusTab);
    }

    const resizeupdateHistoryTab = () => {
        setupdateHistoryTab(!updateHistoryTab);
    }


    return (

        <div className='compSection'>
            <StyledContainer className='Bigcontainer' maxWidth="sm">

                <Box onClick={resizeCaller} className="Chead" sx={{ textAlign: 'left' }}>
                    <StyledTypography variant="h4" component="h2">
                        <StyledIcon /> Complaint Registration  <span className='callerNumbHeading'>{formData.callerNumber}<Phone style={{ marginLeft: '4px', height: '14px', width: '14px' }} /> </span>
                        {/* <StyledIcon /> Complaint Registration  <span className='callerNumbHeading'>{ formData.callerNumber}</span> */}
                    </StyledTypography>
                    {
                        callerTab ? (<Compress onClick={resizeCaller} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizeCaller} className='tabMngIcon' />)
                    }

                </Box>
                <StyledBox>

                    {
                        callerTab ? (
                            <Grid className='tab' container spacing={4}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                        Complaint Details :
                                    </Typography>

                                </Grid>

                                {/* <Grid item xs={12} sm={6} md={4}> */}


                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="Ccategory" className='input' value={complaintCate} fullWidth label="complaint Category" variant="outlined" />
                                </Grid>




                                {/* <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="Ccategory">complaint Category</InputLabel>
                                        <Select className="select" disabled={true}  value={formData.complaintCategory} name="complaintCategory" label="complaint Category" >
                                            <MenuItem value="District1">Complaint one </MenuItem>
                                            <MenuItem value="District2">Complaint two</MenuItem>
                                        </Select>
                                    </FormControl> */}
                                {/* </Grid> */}
                                {/* <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="Cscategory">complaint sub-category</InputLabel>
                                        <Select disabled={true}  value={formData.complaintSubCategory} name="complaintSubCategory" className='select' label="complaint sub-category" >
                                            <MenuItem value="District1">Complaint one </MenuItem>
                                            <MenuItem value="District2">Complaint two</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid> */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="Ccategory" className='input' value={complaintSubCate} fullWidth label="Complaint sub-category" variant="outlined" />
                                </Grid>



                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="complaintDecs" className='input' value={complaintDecs} fullWidth label="Complaint Description" variant="outlined" />
                                </Grid>


                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="Ccategory" className='input' value={complaintSource} fullWidth label="complaint Source" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                        Caller Details :
                                    </Typography>

                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="callerName" className='input' value={formData.callerName} fullWidth label="Name of the Caller" variant="outlined" />
                                </Grid>



                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="Gender">Gender</InputLabel>
                                        <Select disabled={true} name="callerGender" value={formData.callerGender} className='select' label="Gender" id="incident-sub-type" >

                                            <MenuItem value="male">male</MenuItem>
                                            <MenuItem value="female">female</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="callerAge" className='input' value={formData.callerAge} fullWidth label="Age" variant="outlined" />
                                </Grid>


                                <Grid item xs={12} sm={6} md={12}>
                                    <FormControl style={{ display: 'block' }} component="fieldset">
                                        <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                            Both are the same ?  <FormControlLabel disabled={true}
                                                control={<Checkbox name="yes" checked={formData.samePerson} onChange={handleSamePersonCheckboxChange} />}
                                                label="Yes"
                                            />
                                        </Typography>

                                    </FormControl>
                                </Grid>
                                {/* //if both are same--  */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="victimName" className='input' value={formData.victimName} fullWidth label="Name of the Victim" variant="outlined" />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="Gender">Gender</InputLabel>
                                        <Select disabled={true} name="victimGender" value={formData.victimGender} className='select' label="Gender"  >

                                            <MenuItem value="male">male</MenuItem>
                                            <MenuItem value="female">female</MenuItem>

                                        </Select>
                                    </FormControl>


                                    {/* <TextField  name="victimGender" disabled={formData.samePerson} className='input' value={formData.victimGender} fullWidth label="Gender" variant="outlined"  /> */}
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="victimAge" className='input' value={formData.victimAge} fullWidth label="Age" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="VictimNum" value={formData.VictimNum} className='input' fullWidth label="Contact Number Of victim" variant="outlined" />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="VictimaltNum" className='input' value={formData.VictimaltNum} fullWidth label="Alternative Number if any" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="email" className='input' value={formData.email} fullWidth label="Email Id" variant="outlined" />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                        Address Details :
                                    </Typography>

                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField disabled={true} name="addressLine1" className='input' value={formData.addressLine1} fullWidth label="Address Line 1" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField disabled={true} name="addressLine2" className='input' value={formData.addressLine2} fullWidth label="Address Line 2" variant="outlined" />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="landmark" className='input' value={formData.landmark} fullWidth label="Landmark" variant="outlined" />
                                </Grid>

                                {/* <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="district">District</InputLabel>
                                        <Select disabled={true}  value={formData.district} name="district" className='select' label="District" >
                                            <MenuItem value="District1">District1</MenuItem>
                                            <MenuItem value="District2">District2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid> */}

                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="District" className='input' value={comlaintDistrict} fullWidth label="District" variant="outlined" />
                                </Grid>



                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="pincode" className='input' value={formData.pincode} fullWidth label="Pincode" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="nearestPoliceStation" className='input' value={complaintpoliceStation} fullWidth label="Nearest Police station" variant="outlined" />
                                </Grid>

                                {/* <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="districtCyberLab" className='input' value={formData.districtCyberLab} fullWidth label="District Cyber Lab" variant="outlined" />
                                </Grid> */}


                            </Grid>

                        ) : <>

                        </>
                    }

                </StyledBox>
                <Box onClick={resizeMandatory} className="Chead" sx={{ textAlign: 'left' }}>
                    <StyledTypography variant="h4" component="h2">
                        <StyledIcon2 /> Mandatory Information
                    </StyledTypography>
                    {
                        MandatoryTab ? (<Compress onClick={resizeMandatory} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizeMandatory} className='tabMngIcon' />)
                    }
                </Box>
                <StyledBox >
                    {

                        MandatoryTab ? (


                            <Grid className='tab' container spacing={4}>

                                <>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            disabled={true}

                                            name="incidentDetails"
                                            className="input"
                                            value={formData.incidentDetails}
                                            fullWidth
                                            label="Incident Details (min 200 characters)"
                                            variant="outlined"

                                            multiline
                                            rows={8}
                                        />
                                    </Grid>
                                    {lessCharError.no ? (<ErrorBox item xs={1} sm={12} md={12}>
                                        {lessCharError.value} <Warning />
                                    </ErrorBox>) : (<></>)


                                    }
                                    <Grid id="incidentDate" item xs={12} sm={6} md={4}>
                                        <TextField
                                            disabled={true}
                                            type='datetime-local'
                                            fullWidth
                                            label="Incident Date and Time"
                                            variant="outlined"


                                            name='incidentDate'
                                            value={formData.incidentDate}
                                            InputLabelProps={{ shrink: true }}

                                        />
                                    </Grid>


                                    <Grid item xs={12} sm={6} md={8}>
                                        <TextField disabled={true} name="IdentificationId" className='input' value={formData.IdentificationId} fullWidth label="Identification Id(e.g.,Voter Id,Aadhar Number, PanCard Number,Passport ,Driving License)" variant="outlined" />
                                    </Grid>




                                    {/* // if financial fraud */}

                                    <Grid item xs={12} sm={6} md={12}>
                                        <FormControl style={{ display: 'block' }} component="fieldset">
                                            <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                                Have You Lost Money?  <FormControlLabel disabled={true}
                                                    control={<Checkbox name="yes" checked={formData.LostMoneyState} onChange={handleLostMoneyChange} />}

                                                />
                                            </Typography>
                                        </FormControl>
                                    </Grid>
                                </>





                                {formData.LostMoneyState && (
                                    < >
                                        {formData.transactionDetails.map((transaction, index) => (

                                            <React.Fragment key={index}> {/* Add the key prop here */}
                                                <Grid item xs={12} sm={6} md={12}>
                                                    <Typography className='p' component="legend" variant="body1" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', textAlign: 'center', color: 'white', padding: '10px', background: "#3884e1" }}>
                                                        Transaction : {index + 1}
                                                        <Close style={{ fill: 'white', height: '21px', width: '21px' }} onClick={() => removeTransaction(index)} />
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <TextField
                                                        disabled={true}
                                                        onChange={(e) => handleTransactionChange(index, e)}
                                                        name="bankName"
                                                        className='input'
                                                        value={transaction.bank_name}
                                                        fullWidth
                                                        label="Name of the Bank/ Wallet/Merchant"
                                                        variant="outlined"

                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={6}>
                                                    <TextField
                                                        disabled={true}
                                                        onChange={(e) => handleTransactionChange(index, e)}
                                                        name="transactionId"
                                                        className='input'

                                                        value={transaction.transaction_id}
                                                        fullWidth
                                                        label="12-digit Transaction id/UTR No."
                                                        variant="outlined"
                                                        inputProps={{ maxLength: 12 }}

                                                    />
                                                </Grid>

                                                <Grid id='transDate' item xs={12} sm={6} md={6}>
                                                    <TextField
                                                        disabled={true}
                                                        onChange={(e) => handleTransactionChange(index, e)}
                                                        name="transactionDate"
                                                        type='datetime-local'
                                                        fullWidth
                                                        label="Date of Transaction"
                                                        variant="outlined"

                                                        value={transaction.transaction_date}
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={6}>
                                                    <TextField
                                                        disabled={true}
                                                        onChange={(e) => handleTransactionChange(index, e)}
                                                        name="transactionAmount"
                                                        className='input'
                                                        type='number'
                                                        fullWidth
                                                        label="Transaction Amount"
                                                        variant="outlined"

                                                        value={transaction.transaction_amount}
                                                    />
                                                </Grid>

                                                {/* Remove Transaction Button */}
                                                <Grid item xs={12}>
                                                    <StyledButton2 disabled={true} onClick={() => removeTransaction(index)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: "10px", width: "20px", marginBottom: '20px', height: '20px' }} variant="contained" >
                                                        <Remove />
                                                    </StyledButton2>

                                                </Grid>
                                            </React.Fragment>
                                        ))}

                                        {/* Add Transaction Button */}



                                        <Grid item xs={12} >

                                            <TextField disabled={true} name="TotalTransectionAmount" className='input' value={formData.TotalTransectionAmount} label="Total Amount Lost" variant="outlined" />

                                            <StyledButton disabled={true} onClick={addTransaction} style={{ width: "auto", marginBottom: '12px' }} variant="contained" color="primary" className="button">
                                                <PlusOne className="bell" />
                                                Add
                                            </StyledButton>
                                        </Grid>
                                    </>

                                )}
                            </Grid>

                        ) : <></>

                    }
                </StyledBox>


                {/* //3rd option feilds  */}
                <Box onClick={resizeOptional} className="Chead" sx={{ textAlign: 'left' }}>
                    <StyledTypography variant="h4" component="h2">
                        <StyledIcon3 /> Optional Details
                    </StyledTypography>
                    {
                        OptionalTab ? (<Compress onClick={resizeOptional} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizeOptional} className='tabMngIcon' />)
                    }
                </Box>
                <StyledBox>

                    {
                        OptionalTab ? (
                            <Grid className='tab' container spacing={4}>


                                <Grid item xs={12} sm={4} md={6}>
                                    <TextField disabled={true} name="suspectedWebsite" className='input' value={formData.suspectedWebsite} fullWidth label="Suspected Website Urls/Social Media handles" variant="outlined" />
                                </Grid>


                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                        Suspect's Details (if available) :
                                    </Typography>

                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="suspectedMobileNum" className='input' value={formData.suspectedMobileNum} fullWidth label="Mobile Number" variant="outlined" />
                                </Grid>



                                {/* //if both are same--  */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="suspectedEmail" className='input' value={formData.suspectedEmail} fullWidth label="Email Id" variant="outlined" />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField disabled={true} name="suspectedBankAccNum" className='input' value={formData.suspectedBankAccNum} fullWidth label="Bank Account Number Or UPI Id" variant="outlined" />
                                </Grid>

                                {/* //remarks  */}

                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField

                                        disabled={true}
                                        className="input"
                                        value={formData.suspectedAddress}
                                        fullWidth
                                        label="Address"
                                        name='suspectedAddress'
                                        variant="outlined"

                                        multiline
                                        rows={2}
                                    />
                                </Grid>



                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField

                                        disabled={true}
                                        className="input"
                                        value={formData.remarks}
                                        fullWidth
                                        label="Remarks"
                                        name='remarks'
                                        variant="outlined"
                                        multiline
                                        rows={2}
                                    />
                                </Grid>


                            </Grid>

                        ) : <> </>

                    }

                </StyledBox>


                {/* //4th Acknowledgement   */}

                <Box onClick={resizeAknowledgeTab} className="Chead" sx={{ textAlign: 'left' }}>
                    <StyledTypography variant="h4" component="h2">
                        <StyledIcon4 /> Update Details
                    </StyledTypography>
                    {
                        AcknowledgeTab ? (<Compress onClick={resizeAknowledgeTab} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizeAknowledgeTab} className='tabMngIcon' />)
                    }
                </Box>
                <StyledBox>

                    {
                        AcknowledgeTab ? (
                            <Grid className='tab' container spacing={4}>

                                {/* //acknowlegement remarks  */}

                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField

                                        className="input"
                                        value={formData.acknowledgement1}
                                        fullWidth
                                        disabled={true}
                                        label="Acknowledgement 1"
                                        name='acknowledgement'
                                        variant="outlined"
                                        multiline

                                        rows={2}
                                    />
                                </Grid>


                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField

                                        className="input"
                                        value={formData.acknowledgement2}
                                        fullWidth
                                        disabled={true}
                                        label="Acknowledgement 2"
                                        name='acknowledgement2'
                                        variant="outlined"
                                        multiline
                                        rows={2}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField

                                        className="input"
                                        value={formData.acknowledgement3}
                                        fullWidth
                                        label="Acknowledgement 3"
                                        name='acknowledgement3'
                                        variant="outlined"
                                        disabled={true}
                                        multiline
                                        rows={2}

                                    />
                                </Grid> <Grid item xs={12} sm={12} md={6}>
                                    <TextField

                                        className="input"
                                        value={formData.acknowledgement4}
                                        fullWidth
                                        label="Acknowledgement 4"
                                        name='acknowledgement4'
                                        variant="outlined"
                                        multiline
                                        disabled={true}

                                        rows={2}
                                    />
                                </Grid>

                            </Grid>

                        ) : <> </>

                    }

                </StyledBox>

                {/* 5th status tab  */}

                <Box onClick={resizestatusTab} className="Chead" sx={{ textAlign: 'left' }}>
                    <StyledTypography variant="h4" component="h2">
                        <StyledIcon5 /> Status
                    </StyledTypography>
                    {
                        statusTab ? (<Compress onClick={resizestatusTab} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizestatusTab} className='tabMngIcon' />)
                    }
                </Box>
                <StyledBox>

                    {
                        statusTab ? (
                            <Grid className='tab' container spacing={4}>
                                {/* //acknowlegement remarks  */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="Status">Status</InputLabel>
                                        <Select disabled={true} name="status" value={formData.status} className='select' label="Status"  >
                                            <MenuItem value="NEW">New</MenuItem>
                                            <MenuItem value="PENDING">Pending</MenuItem>
                                            <MenuItem value="CLOSED">close</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/* <Grid id="updateTime" item xs={12} sm={6} md={4}>
                                    <TextField
                                        type='datetime-local'
                                        fullWidth
                                        label="Update Time"
                                        disabled={true}
                                        variant="outlined"
                                        
                                        
                                        name='updateTime'
                                        value={formData.updateTime}
                                        InputLabelProps={{ shrink: true }}

                                    />
                                </Grid> */}

                            </Grid>


                        ) : <> </>

                    }

                </StyledBox>
                {/* //UPDATE HISTORY TAB   */}

                <Box onClick={resizeupdateHistoryTab} className="Chead" sx={{ textAlign: 'left' }}>
                    <StyledTypography variant="h4" component="h2">
                        <StyledIcon6 /> Complaint History
                    </StyledTypography>
                    {
                        updateHistoryTab ? (<Compress onClick={resizeupdateHistoryTab} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizeupdateHistoryTab} className='tabMngIcon' />)
                    }
                </Box>

                {updateHistoryTab ? (
                    <StyledBox>



                        <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                            Complaint Update History
                        </Typography>

                        <TableContainer className='tblCont' component={Paper} sx={{ borderRadius: 1, borderBottom: 0 }}>

                            <Table id='complaintGrid'>
                                <TableHead sx={{ backgroundColor: '#ecf0f3' }}>
                                    <TableRow>
                                        <TableCell><strong>Acknowledgement-1</strong></TableCell>
                                        <TableCell><strong>Acknowledgement-2</strong></TableCell>
                                        <TableCell><strong>Acknowledgement-3</strong></TableCell>
                                        <TableCell><strong>Acknowledgement-4</strong></TableCell>
                                        <TableCell><strong>Updated By</strong></TableCell>
                                        <TableCell><strong>Update Time</strong></TableCell>
                                        <TableCell><strong>Status</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {HistoryList.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.acknowledge_1 || 'N/A'}</TableCell>
                                            <TableCell>{row.acknowledge_2 || 'N/A'}</TableCell>
                                            <TableCell>{row.acknowledge_3 || 'N/A'}</TableCell>
                                            <TableCell>{row.acknowledge_4 || 'N/A'}</TableCell>
                                            <TableCell>{row.last_user_id || 'N/A'}</TableCell>
                                            <TableCell>{row.update_date || 'N/A'}</TableCell>
                                            <TableCell>{row.status || 'N/A'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>


                    </StyledBox>
                ) : <> </>

                }

            </StyledContainer >


        </div >

    );
};

export default TrackDash;






