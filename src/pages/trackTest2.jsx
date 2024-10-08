import React from 'react';
import '../css/complaint.css';
import { Container, Paper, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Button, Grid, Box, FormControlLabel, Checkbox, FormHelperText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import styled from 'styled-components';
import { Tty, Warning, ContactEmergencyRounded, PlusOne, Remove, ContactPage, ExpandOutlined, Compress, Save, Close, AppRegistration, CallMadeSharp, Phone, PendingActions, SecurityUpdate, ChevronLeft, FirstPage, WorkHistoryOutlined } from '@mui/icons-material';
import { useRef, useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useSidebar } from '../components/SidebarContext';
import { useNavigate } from 'react-router-dom';

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
    color: 'rgb(36 36 37)',
});
const StyledIcon2 = styled(ContactEmergencyRounded)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: 'rgb(36 36 37)',
});
// const StyledIcon3 = styled(ContactPage)({
//     marginRight: '0.5rem',
//     marginTop: '-0.25rem',
//     height: '1.5rem !important',
//     width: '1.5rem !important',
//     color: 'green',
// });

const StyledIcon3 = styled(ContactPage)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: 'rgb(36 36 37)',
});
const StyledIcon4 = styled(SecurityUpdate)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: 'rgb(36 36 37)',
});
const StyledIcon5 = styled(PendingActions)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: 'rgb(36 36 37)',
});
const StyledIcon6 = styled(WorkHistoryOutlined)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: 'rgb(36 36 37)',
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
const NewComplaint = ({ formdata }) => {

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
        setcomplaintSubCategoryArray,
        setBankList,
        BankList
    } = useSidebar();

    const navigate = useNavigate();
    const [callerNumFound, setcallerNumFound] = useState(false);
    //useref---------------------------------
    const complaintCategoryRef = useRef(null);
    const [isIdentificationIdRequired, setIsIdentificationIdRequired] = useState(false);
    const sourceOfComplaintRef = useRef(null);
    const complaintSubCategoryRef = useRef(null);
    const callerNameRef = useRef(null);
    const victimNameRef = useRef(null);
    const complaintDescRef = useRef(null);
    const callerGenderRef = useRef(null);
    const callerAgeRef = useRef(null);
    const victimGenderRef = useRef(null);
    const victimAgeRef = useRef(null);
    const VictimNumRef = useRef(null);


    const acknowledgementNumRef = useRef(null);

    const addressLine1Ref = useRef(null);
    const districtRef = useRef(null);
    const IdentificationIdRef = useRef(null);
    const callernumref = useRef(null);
    const [AcknowledgeTab, setAcknowledgeTab] = useState(false);
    const [statusTab, setstatusTab] = useState(false);
    const [updateHistoryTab, setupdateHistoryTab] = useState(false);
    const [ackNumGiven, setackNumGiven] = useState(false);
    const [statusIsNccrp, setstatusIsNccrp] = useState(false);


    const pincodeRef = useRef(null);
    const nearestPoliceStationRef = useRef(null);
    const incidentDateRef = useRef(null);
    //use state to set value of the check box
    const [box2, setbox2] = useState(false);
    const [lessCharError, setError] = useState({
        value: '',
        no: false
    });


    const [HistoryList, setHistoryList] = useState([]);
    const [complaintId, setcomplaintId] = useState('');
    const [callerTab, setCallerTab] = useState(true);
    const [MandatoryTab, setMandatoryTab] = useState(false);
    const [OptionalTab, setOptionalTab] = useState(false);
    const [callerNumber, setCallerNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [LoaderOn, setLoaderOn] = useState(false);
    const [isFinancial, setisFinancial] = useState(false);


    const [CcidBox, setCcidBox] = useState(false);
    //initial formData
    // const [formData, setFormData] = useState({
    // });

    const [formData, setFormData] = useState({
        complaintCategory: '',
        complaintSubCategory: '',
        complaintDesc: '',
        sourceOfComplaint: '',
        callerName: '',
        callerGender: '',
        callerNumber: callerNumber,
        callerAge: '',
        victimName: '',
        victimGender: '',
        victimAge: '',
        VictimNum: '',
        VictimaltNum: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        district: '',
        pincode: '',
        nearestPoliceStation: '',
        districtCyberLab: '',
        //second label
        incidentDetails: '',
        LostMoneyState: false,
        remarks: '',
        incidentDate: '',
        IdentificationId: '',
        identificationType: '',
        samePerson: false,
        transactionDetails: [{ bank_name: '', transaction_id: '', transaction_date: '', transaction_amount: '', transaction_complaint_desc: '' }],
        TotalTransectionAmount: '',
        suspectedWebsite: '',
        suspectedBankAccNum: '',
        suspectedMobileNum: '',
        suspectedEmail: '',
        suspectedAddress: '',
        status: '',
        acknowledgement: '',
        acknowledgement2: '',
        acknowledgement3: '',
        acknowledgement4: '',


        // });



        //GET URLS DATA 
    });


    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            ...formdata,
        }));


        if (formdata) {
            fncToGetUpdateHistory(formData.complaintNumber);
            fncToGetSubComplaintCategory(formdata.complaintCategory);
            fncToGetComplaintDesc(formdata.complaintCategory, formdata.complaintSubCategory);
            fncToGetPoliceStations(formdata.district);
            console.log("Updated formdata:", formdata);
            if (formdata && formdata.LostMoneyState) {
                setisFinancial(true);
                fncToGetTransactionDetails(formdata.complaintNumber);
            } else {
                setisFinancial(false);


            }

        }


        // Optionally, handle other formdata changes here

        console.log({ formdata });
    }, [formdata]);



    // useEffect(() => {
    //     // Perform actions when formdata changes
    //     if (formdata.LostMoneyState) {
    //         setisFinancial(true);
    //         fncToGetTransactionDetails(formdata.complaintNumber);
    //         console.log("LostMoneyState is true");
    //     } else {
    //         setisFinancial(false);
    //     }

    //     // Optionally, handle other formdata changes here
    //     console.log("Updated formdata:", formdata);

    // }, [formdata]);


    //     useEffect(() => {
    //         if (formdata.LostMoneyState) {
    //             setisFinancial(true);
    //             fncToGetTransactionDetails(formdata.complaintNumber);
    //             console.log("alert 1")
    //         }

    // //  fncToGetSubComplaintCategory(formData.complaintCategory);

    //     }, [formdata]);
    // ALL API CALL HERE-------------------------------

    // 1 st api call fnc 
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
    // 2nd api call fnc 
    const fncToGetComplaintSource = () => {
        //API CALL 1-

        const reqData = {
            "type": "complaint_source_list",
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
                setcomplaintSourceArray(data.result);

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
                    console.log(data.result);
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
    const fncToGetComplaintDesc = (cid, csid) => {
        //API CALL 1-

        const reqData = {
            "type": "complaint_desc",
            "category_id": cid,
            "sub_category_id": csid,
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




    // useEffect(() => {


    //     if (ackNumGiven) {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             status: 'registered_in_nccrp'
    //         }));


    //     }


    // }, [ackNumGiven])

    //5th api 


    const fncToGetDistrict = () => {
        //API CALL 1-

        const reqData = {

            "type": "district",
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


    //6th api 


    const fncToGetPoliceStations = (id) => {
        //API CALL 1-
        if (id) {
            const reqData = {
                "type": "police_station",
                "district_code": id,
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


    const fncToGetUpdateHistory = (id) => {
        //API CALL 1-

        const reqData = {
            type: "complaint_history",
            complaint_id: id,
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

                setHistoryList(data.result);


            }
            else {
                console.log(data);
            }

        }).catch(err => {
            console.log(err);
        })


    }

    const fncToGetTransactionDetails = (id) => {
        //API CALL 1-
        if (id) {
            const reqData = {
                "type": "complaint_transaction",
                complaint_id: id,
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
                    setFormData(prevState => ({
                        ...prevState,
                        transactionDetails: data.result
                    }));

                    // console.log(data.result);
                    // console.log(formData);
                }
                else {
                    console.log(data);
                }

            }).catch(err => {
                console.log(err);
            })
        }

    }

    const fncToGetbank_names = () => {
        //API CALL 1-

        const reqData = {

            "type": "banks",
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
                setBankList(data.result);

            }
            else {
                console.log(data);
            }

        }).catch(err => {
            console.log(err);
        })


    }


    useEffect(() => {
        // aPI CALL 1
        // https://example.com/?callerid=%2B919911108228&callnumber=3996836&transinfo=&lrefid=I2024081417501811108228&lsid=INBOUND_3&leads=5&ctype=I&cdnd=0&ivrinfo=Hindi^categoryxyz^xyc
        fncToGetComplaintCategory();
        fncToGetComplaintSource();
        fncToGetDistrict();
        fncToGetbank_names();




    }, []);







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
            totallLostMoney += parseFloat(elem.transaction_amount || 0, 10); // Safeguard against NaN
        });

        // console.log(totallLostMoney);
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
                { bank_name: '', transaction_id: '', transaction_date: '', transaction_amount: '', transaction_complaint_desc: '' }
            ]
        })
    }
    const removeTransaction = (index) => {
        const updatedTransactions = [...formData.transactionDetails];
        updatedTransactions.splice(index, 1); // Remove the transaction at the given index

        let totallLostMoney = 0;
        updatedTransactions.forEach(elem => {
            totallLostMoney += parseFloat(elem.transaction_amount || 0, 10); // Safeguard against NaN
        });

        setFormData({
            ...formData,
            transactionDetails: updatedTransactions,
            TotalTransectionAmount: totallLostMoney,
        });
    };


    // const handleInputChangeForAll = (event) => {
    //     const { name, value } = event.target;
    //     const specialCharPattern = /[^a-zA-Z0-9\s.,'-]/;



    //     if (name == 'acknowledgement') {
    //         alert('1')
    //         if (value) {  // Check if the acknowledgement field has a value
    //             setFormData(prevState => ({
    //                 ...prevState,
    //                 status: "registered_in_nccrp",  
    //                 [name]: value 
    //             }));

    //         } else {
    //             setFormData(prevState => ({
    //                 ...prevState,
    //                 status: "",  
    //                 [name]: value
    //             }));

    //         }
    //     }
    //         if (name === 'identificationType') {
    //             setIsIdentificationIdRequired(!!value);

    //         }

    //         if (name === "incidentDetails") {
    //             if (specialCharPattern.test(value)) {
    //                 return;
    //             }
    //             if (value.length < 200) {
    //                 setError({
    //                     value: "A minimum of 200 characters required !",
    //                     no: true
    //                 })
    //             }
    //         }

    //         if (name === "complaintCategory") {
    //             if (value === "01") {

    //                 setisFinancial(true);

    //             } else {
    //                 setisFinancial(false);
    //             }
    //         }


    //         setFormData({
    //             ...formData,
    //             [name]: value,
    //         })


    //     }

    const handleInputChangeForAll = (event) => {
        const { name, value } = event.target;
        // const specialCharPattern = /[^a-zA-Z0-9\s.,'-]/;

        let updatedFormData = { ...formData, [name]: value };


        if (name === 'status' && value === "registered_in_nccrp") {
            setstatusIsNccrp(true);
        } else {
            setstatusIsNccrp(false);
        }


        if (name === 'acknowledgement') {
            if (value) {  // Check if the acknowledgement field has a value
                updatedFormData.status = "registered_in_nccrp";
                setackNumGiven(true);
            } else {
                updatedFormData.status = formdata.status;  // Clear status if there's no value
                setackNumGiven(false);
            }
        }

        if (name === 'identificationType') {
            setIsIdentificationIdRequired(!!value);
        }

        // if (name === "incidentDetails") {
        //     if (specialCharPattern.test(value)) {
        //         return;
        //     }
        //     if (value.length < 200) {
        //         setError({
        //             value: "A minimum of 200 characters required!",
        //             no: true
        //         });
        //     } else {
        //         setError({
        //             value: "",
        //             no: false
        //         });
        //     }
        // }




        if (name === "complaintCategory") {
            setisFinancial(value === "01");
        }

        setFormData(updatedFormData);
    };
    const handleSamePersonCheckboxChange = (event) => {
        const { checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            samePerson: checked,
            victimName: checked ? prevFormData.callerName : '',
            victimGender: checked ? prevFormData.callerGender : '',
            victimAge: checked ? prevFormData.callerAge : '',
            VictimNum: checked ? prevFormData.callerNumber || ClBox.callerNumber : '',

        }))
    };
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
            transactionDetails: checked ? [{ bank_name: '', transaction_id: '', transaction_date: '', transaction_amount: '', transaction_complaint_desc: '' }] : '',
        });



    };


    //TABBING SYSTEM EXPEND AND COMPRESS
    const resizeCaller = () => {
        setCallerTab(!callerTab);
    }


    const resizeOptional = () => {
        setOptionalTab(!OptionalTab);
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
    const resizeMandatory = () => {
        setMandatoryTab(!MandatoryTab);
    }
    //SUBMIT FORM ACTIVITY

    const validateForm = () => {
        let tempErrors = {};
        let firstErrorField = null;

        const fieldsToValidate = [
            { field: 'complaintCategory', ref: complaintCategoryRef },
            { field: 'sourceOfComplaint', ref: sourceOfComplaintRef },
            { field: 'complaintSubCategory', ref: complaintSubCategoryRef },
            { field: 'callerName', ref: callerNameRef },
            { field: 'victimName', ref: victimNameRef },
            { field: 'complaintDesc', ref: complaintDescRef },
            { field: 'callerGender', ref: callerGenderRef },

            { field: 'victimGender', ref: victimGenderRef },

            { field: 'VictimNum', ref: VictimNumRef },
            { field: 'addressLine1', ref: addressLine1Ref },
            { field: 'district', ref: districtRef },
            { field: 'pincode', ref: pincodeRef },
            { field: 'callerNumber', ref: callernumref },
            { field: 'nearestPoliceStation', ref: nearestPoliceStationRef },
            { field: 'IdentificationId', ref: IdentificationIdRef },
            { field: 'incidentDate', ref: incidentDateRef },
            { field: 'acknowledgement', ref: acknowledgementNumRef }
        ];

        if (formData.LostMoneyState) {
            formData.transactionDetails.forEach((detail, index) => {
                if (!detail.bank_name) tempErrors[`transactionDetails[${index}].bank_name`] = "This field is required.";
                if (!detail.transaction_id) tempErrors[`transactionDetails[${index}].transaction_id`] = "This field is required.";
                if (!detail.transaction_date) tempErrors[`transactionDetails[${index}].transaction_date`] = "This field is required.";
                if (!detail.transaction_amount) tempErrors[`transactionDetails[${index}].transaction_amount`] = "This field is required.";
                if (!detail.transaction_complaint_desc) tempErrors[`transactionDetails[${index}].transaction_complaint_desc`] = "This field is required.";
            });
        }



        if (formData.identificationType === "Aadhar Number") {
            const aadharPattern = /^\d{12}$/;
            if (!aadharPattern.test(formData.IdentificationId)) {
                tempErrors['IdentificationId'] = "Aadhar number must be a 12-digit number.";
                if (!firstErrorField) firstErrorField = IdentificationIdRef;
            }
        } else if (formData.identificationType === "PanCard Number") {
            const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
            if (!panPattern.test(formData.IdentificationId)) {
                tempErrors['IdentificationId'] = "PAN number must follow the format ABCDE1234F.";
                if (!firstErrorField) firstErrorField = IdentificationIdRef;
            }
        } else if (isIdentificationIdRequired && !formData.IdentificationId) {
            // If required and not provided
            tempErrors['IdentificationId'] = "Identification ID is required.";
            if (!firstErrorField) firstErrorField = IdentificationIdRef;
        }

        fieldsToValidate.forEach(({ field, ref }) => {


            if (field === 'IdentificationId' && !isIdentificationIdRequired) {
                return;
            }
            if (field === 'complaintDesc' && isFinancial) {
                return;
            }

            if (field === 'acknowledgement' && !ackNumGiven && !statusIsNccrp) {

                return;
            }


            if (!formData[field]) {
                tempErrors[field] = "This field is required.";
                if (!firstErrorField && ref.current) {
                    firstErrorField = ref;
                }
            }
        });

        // Scroll to the first field with an error
        if (firstErrorField) {
            firstErrorField.current.scrollIntoView({ behavior: 'smooth' });
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };




    const SubmitForm = (event) => {
        event.preventDefault();
        console.log(formData);
        if (validateForm()) {
            // api call 7th

            const reqData = {
                type: "update",
                action_user: ClBox.agentId,
                complaint_id: formData.complaintNumber,
                caller_id: ClBox.call_Id,
                ivr_lang: ClBox.language,
                last_user_id: ClBox.agentId,
                caller_name: formData.callerName,
                caller_gender: formData.callerGender,
                caller_age: formData.callerAge,
                victim_name: formData.victimName,
                victim_gender: formData.victimGender,
                victim_age: formData.victimAge,
                victim_contact_no: formData.VictimNum,
                alternate_number: formData.VictimaltNum,
                address_1: formData.addressLine1,
                address_2: formData.addressLine2,
                landmark: formData.landmark,
                district: formData.district,
                pincode: formData.pincode,
                police_station: formData.nearestPoliceStation,
                district_cyber_labs: formData.districtCyberLab,
                email_id: formData.email,
                caller_no: ClBox.callerNumber || formData.callerNumber,
                incident_date_time: formData.incidentDate,
                incident_details: formData.incidentDetails,
                identity_number: formData.IdentificationId,
                identification_type: formData.identificationType,
                lost_money_state: formData.LostMoneyState,
                transaction_data: formData.LostMoneyState ? formData.transactionDetails.map(txn => ({
                    bank_name: txn.bank_name,
                    transaction_id: txn.transaction_id,
                    transaction_date: txn.transaction_date,
                    transaction_amount: txn.transaction_amount,
                    transaction_complaint_desc: txn.transaction_complaint_desc


                })) : [],
                total_transaction_amount: formData.TotalTransectionAmount.toString(),
                suspect_website_url: formData.suspectedWebsite,
                suspect_details: '',
                suspect_mobile: formData.suspectedMobileNum,
                suspect_email: formData.suspectedEmail,
                suspect_bank_account_no: formData.suspectedBankAccNum,
                suspect_address: formData.suspectedAddress,
                complaint_source: formData.sourceOfComplaint,
                category_code: formData.complaintCategory,
                sub_category_code: formData.complaintSubCategory,
                transaction_remarks: '',
                nccrp_no: formData.nccrpNo,
                acknowledge_1: formData.acknowledgement,
                acknowledge_2: formData.acknowledgement2,
                acknowledge_3: formData.acknowledgement3,
                acknowledge_4: formData.acknowledgement4,
                category_desc_code: formData.complaintDesc,
                suspect_remarks: formData.remarks,
                same_person: formData.samePerson,
                status: formData.status,
                status_remarks: formData.status_remarks,


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

                    setLoaderOn(true);
                    // setTimeout(() => {
                    // setFormData({
                    //     complaintCategory: '',
                    //     complaintSubCategory: '',
                    //     complaintDesc: '',
                    //     sourceOfComplaint: '',
                    //     callerName: '',
                    //     callerGender: '',
                    //     callerNumber: '',
                    //     callerAge: '',
                    //     victimName: '',
                    //     victimGender: '',
                    //     victimAge: '',
                    //     VictimNum: '',
                    //     VictimaltNum: '',
                    //     email: '',
                    //     addressLine1: '',
                    //     addressLine2: '',
                    //     landmark: '',
                    //     district: '',
                    //     pincode: '',
                    //     nearestPoliceStation: '',
                    //     districtCyberLab: '',
                    //     //second label
                    //     incidentDetails: '',
                    //     LostMoneyState: false,
                    //     remarks: '',
                    //     incidentDate: '',
                    //     IdentificationId: '',
                    //     samePerson: false,
                    //     transactionDetails: [{ bank_name: '', transaction_id: '', transaction_date: '', transaction_amount: '', transaction_complaint_desc: '' }],
                    //     TotalTransectionAmount: '',
                    //     suspectedWebsite: '',
                    //     suspectedBankAccNum: '',
                    //     suspectedMobileNum: '',
                    //     suspectedEmail: '',
                    //     suspectedAddress: ''
                    // })
                    setLoaderOn(false);
                    console.log("Form is valid, submitting...");
                    // setcomplaintId(data.result);
                    setCcidBox(true);
                    // navigate('/pcp/TrackComplaint');
                    // }, 5000);


                }
                else {
                    console.log(data);
                    setLoaderOn(false);
                }

            }).catch(err => {
                console.log(err);
                setLoaderOn(false);
                setCcidBox(false);
            })

        } else {
            console.log("Form is invalid.");
        }


    }
    const closeBoth = () => {
        setLoaderOn(false);
        setCcidBox(false);
    }


    return (
        <div id={`${collapsed ? 'heroSection' : 'hero'}`} className="hero">
            {
                CcidBox ?
                    <div className='compSection'>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="alertBox">
                                {/* <Close style={{ fill: 'red', alignSelf: 'flex-end' }} onClick={closeBoth} className='Hicon' /> */}
                                <p style={{ marginTop: "30px" }} className='p'>Your complaint has been successfully updated.</p>

                            </div>

                        </div>



                    </div>

                    : LoaderOn ?

                        <div style={{ display: 'block', margin: 'auto', height: '100% ', zIndex: '999', background: 'rgb(242 246 250)' }}>

                            <ClipLoader size={40} color="green" />
                            <p style={{ color: 'green' }} className='p'>Processing...</p>
                        </div>

                        :

                        <div className='compSection'>

                            <StyledContainer className='Bigcontainer' maxWidth="sm">
                                <Box onClick={resizeCaller} className="Chead" sx={{ textAlign: 'left' }}>
                                    <StyledTypography variant="h4" component="h2">
                                        <StyledIcon /> Incident / Complaint Registration  <span className='callerNumbHeading'>{callerNumber || formData.callerNumber}<Phone style={{ marginLeft: '4px', height: '14px', width: '14px' }} /> </span>
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
                                                        Caller Details :
                                                    </Typography>

                                                </Grid>
                                                <Grid ref={callernumref} item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        disabled={true}
                                                        error={!!errors.callerNumber}
                                                        helperText={errors.callerNumber}
                                                        InputLabelProps={{
                                                            required: true,
                                                            classes: {
                                                                asterisk: 'custom-asterisk',
                                                            },
                                                        }}
                                                        onChange={handleInputChangeForAll} name="callerNumber"
                                                        //  disabled={callerNumFound} 
                                                        className='input' value={callerNumber || formData.callerNumber} fullWidth label="Caller Number" variant="outlined" />
                                                </Grid>








                                                <Grid ref={callerNameRef} item xs={12} sm={6} md={4}>
                                                    <TextField onChange={handleInputChangeForAll} name="callerName" className='input' InputLabelProps={{
                                                        required: true,

                                                        classes: {
                                                            asterisk: 'custom-asterisk',
                                                        },

                                                    }}

                                                        error={!!errors.callerName}
                                                        helperText={errors.callerName}
                                                        value={formData.callerName}
                                                        fullWidth label="Name of the Caller"
                                                        variant="outlined" />
                                                </Grid>
                                                <Grid ref={callerGenderRef} item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth variant="outlined" error={!!errors.callerGender}>
                                                        <InputLabel htmlFor="Gender">Gender<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                        <Select name="callerGender" value={formData.callerGender} className='select' label="Gender" onChange={handleInputChangeForAll} id="incident-sub-type" >
                                                            <MenuItem value="male">male</MenuItem>
                                                            <MenuItem value="female">female</MenuItem>
                                                        </Select>
                                                        {errors.callerGender && (
                                                            <FormHelperText>{errors.callerGender}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField onChange={handleInputChangeForAll} name="callerAge" className='input' value={formData.callerAge} fullWidth label="Age" variant="outlined"


                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12}>

                                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                                        Complaint Details :
                                                    </Typography>

                                                </Grid>





                                                <Grid ref={complaintCategoryRef} item xs={12} sm={6} md={4}>


                                                    <FormControl fullWidth variant="outlined" error={!!errors.complaintCategory}>
                                                        <InputLabel htmlFor="Ccategory">Complaint Category <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                                        </InputLabel>
                                                        <Select disabled={true} onChange={handleInputChangeForAll} value={formData.complaintCategory} name="complaintCategory" className='select' label="complaint Category<span style={{ color: 'red', fontSize: '20px' }}>*</span>" >
                                                            {
                                                                complaintCategoryArray.map((elm, index) => (
                                                                    <MenuItem onClick={() => fncToGetSubComplaintCategory(elm.category_id)}
                                                                        key={index}
                                                                        value={elm.category_id}>{elm.category}</MenuItem>
                                                                ))

                                                            }

                                                        </Select>
                                                        {errors.complaintCategory && (
                                                            <FormHelperText>{errors.complaintCategory}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid ref={complaintSubCategoryRef} item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth variant="outlined" error={!!errors.complaintSubCategory}>
                                                        <InputLabel htmlFor="Cscategory">Complaint sub-category <span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                        <Select disabled={true} onChange={handleInputChangeForAll} value={formData.complaintSubCategory} name="complaintSubCategory" className='select' label="complaint sub-category" >
                                                            {
                                                                complaintSubCategoryArray.map((elm, index) => (
                                                                    <MenuItem onClick={() => fncToGetComplaintDesc(elm.sub_category_id)} key={index} value={elm.sub_category_id}>{elm.sub_category}</MenuItem>
                                                                ))

                                                            }
                                                        </Select>
                                                        {errors.complaintSubCategory && (
                                                            <FormHelperText>{errors.complaintSubCategory}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>

                                                {

                                                    !isFinancial ? (
                                                        <Grid ref={complaintDescRef} item xs={12} sm={6} md={4}>
                                                            <FormControl fullWidth variant="outlined" error={!!errors.complaintDesc}>
                                                                <InputLabel htmlFor="Cdesc">Complaint Description <span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                                <Select disabled={true} onChange={handleInputChangeForAll} value={formData.complaintDesc} name="complaintDesc" className='select' label="complaint Description" >
                                                                    {
                                                                        complaintComplaintDescArray.map((elm, index) => (
                                                                            <MenuItem key={index} value={elm.complaint_desc_id}>{elm.complaint_desc}</MenuItem>
                                                                        ))
                                                                    }

                                                                </Select>
                                                                {errors.complaintDesc && (
                                                                    <FormHelperText>{errors.complaintDesc}</FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>

                                                    ) : <></>
                                                }

                                                <Grid ref={sourceOfComplaintRef} item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth variant="outlined" error={!!errors.sourceOfComplaint}>
                                                        <InputLabel htmlFor="Ccategory">Complaint Source<span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                                        </InputLabel>
                                                        <Select disabled={true} onChange={handleInputChangeForAll} value={formData.sourceOfComplaint} name="sourceOfComplaint" className='select' label="complaint Source<span style={{ color: 'red', fontSize: '20px' }}>*</span>" >
                                                            {
                                                                complaintSourceArray.map((elm, index) => (
                                                                    <MenuItem key={index} value={elm.source_id}>{elm.source_name}</MenuItem>
                                                                ))

                                                            }
                                                        </Select>
                                                        {errors.sourceOfComplaint && (
                                                            <FormHelperText>{errors.sourceOfComplaint}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>


                                                <Grid item xs={12} sm={6} md={12}>
                                                    <FormControl style={{ display: 'block' }} component="fieldset">
                                                        <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                                            Caller & victim are the same ?  <FormControlLabel
                                                                control={<Checkbox name="yes" checked={formData.samePerson} onChange={handleSamePersonCheckboxChange} />}
                                                                label="Yes"
                                                            />
                                                        </Typography>

                                                    </FormControl>
                                                </Grid>
                                                {/* //if both are same--  */}
                                                <Grid ref={victimNameRef} item xs={12} sm={6} md={4}>
                                                    <TextField InputLabelProps={{
                                                        required: true,
                                                        classes: {
                                                            asterisk: 'custom-asterisk',

                                                        },
                                                    }}

                                                        error={!!errors.victimName}
                                                        helperText={errors.victimName}
                                                        onChange={handleInputChangeForAll} disabled={formData.samePerson} name="victimName" className='input' value={formData.victimName} fullWidth label="Name of the Victim" variant="outlined" />
                                                </Grid>

                                                <Grid ref={victimGenderRef} item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth variant="outlined" error={!!errors.victimGender}>
                                                        <InputLabel htmlFor="Gender">Gender<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                        <Select name="victimGender" value={formData.victimGender} disabled={formData.samePerson} className='select' label="Gender" onChange={handleInputChangeForAll} >

                                                            <MenuItem value="male">male</MenuItem>
                                                            <MenuItem value="female">female</MenuItem>

                                                        </Select>
                                                        {errors.victimGender && (
                                                            <FormHelperText>{errors.victimGender}</FormHelperText>
                                                        )}
                                                    </FormControl>


                                                    {/* <TextField onChange={handleInputChangeForAll} name="victimGender" disabled={formData.samePerson} className='input' value={formData.victimGender} fullWidth label="Gender" variant="outlined"  /> */}
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        onChange={handleInputChangeForAll} name="victimAge" disabled={formData.samePerson} className='input' value={formData.victimAge} fullWidth label="Age" variant="outlined" />
                                                </Grid>
                                                <Grid ref={VictimNumRef} item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        error={!!errors.VictimNum}

                                                        helperText={errors.VictimNum}
                                                        InputLabelProps={{
                                                            required: true,
                                                            classes: {
                                                                asterisk: 'custom-asterisk',
                                                            },
                                                        }} onChange={handleInputChangeForAll} name="VictimNum" disabled={formData.samePerson} value={formData.VictimNum} className='input' fullWidth label="Contact Number Of victim" variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField onChange={handleInputChangeForAll} name="VictimaltNum" className='input' value={formData.VictimaltNum} fullWidth label="Alternative Number if any" variant="outlined" />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        // error={!!errors.email}
                                                        // helperText={errors.email}
                                                        // InputLabelProps={{
                                                        //     required: true,
                                                        //     classes: {
                                                        //         asterisk: 'custom-asterisk',
                                                        //     },
                                                        // }} 

                                                        onChange={handleInputChangeForAll} name="email" className='input' value={formData.email} fullWidth label="Email Id" variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12}>
                                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                                        Address Details :
                                                    </Typography>

                                                </Grid>
                                                <Grid ref={addressLine1Ref} item xs={12} sm={6} md={6}>
                                                    <TextField

                                                        error={!!errors.addressLine1}
                                                        helperText={errors.addressLine1}
                                                        InputLabelProps={{
                                                            required: true,
                                                            classes: {
                                                                asterisk: 'custom-asterisk',
                                                            },
                                                        }} onChange={handleInputChangeForAll} name="addressLine1" className='input' value={formData.addressLine1} fullWidth label="Address Line 1" variant="outlined" />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <TextField onChange={handleInputChangeForAll} name="addressLine2" className='input' value={formData.addressLine2} fullWidth label="Address Line 2" variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField onChange={handleInputChangeForAll} name="landmark" className='input' value={formData.landmark} fullWidth label="Landmark" variant="outlined" />
                                                </Grid>
                                                <Grid ref={pincodeRef} item xs={12} sm={6} md={4}>
                                                    <TextField

                                                        error={!!errors.pincode}
                                                        helperText={errors.pincode}
                                                        InputLabelProps={{
                                                            required: true,
                                                            maxLength: 6,
                                                            classes: {
                                                                asterisk: 'custom-asterisk',
                                                            },
                                                        }} onChange={handleInputChangeForAll} name="pincode" className='input' value={formData.pincode} fullWidth label="Pincode" variant="outlined" />
                                                </Grid>
                                                <Grid ref={districtRef} item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth variant="outlined" error={!!errors.district}>
                                                        <InputLabel htmlFor="district">District<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                        <Select onChange={handleInputChangeForAll} value={formData.district} name="district" className='select' label="District" >
                                                            {
                                                                DistrictList.map((elm, index) => (
                                                                    <MenuItem onClick={() => fncToGetPoliceStations(elm.district_code)}
                                                                        key={index}
                                                                        value={elm.district_code}>{elm.district_name}</MenuItem>
                                                                ))

                                                            }
                                                        </Select>

                                                        {errors.district && (
                                                            <FormHelperText>{errors.district}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid ref={nearestPoliceStationRef} item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth variant="outlined" error={!!errors.nearestPoliceStation}>
                                                        <InputLabel htmlFor="nearestPoliceStation">Nearest Police station<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                        <Select onChange={handleInputChangeForAll} value={formData.nearestPoliceStation} name="nearestPoliceStation" className='select' label="Nearest Police station" >
                                                            {
                                                                PolicStationList.map((elm, index) => (
                                                                    <MenuItem
                                                                        key={index}
                                                                        value={elm.police_station_code}>{elm.police_station_name}</MenuItem>
                                                                ))

                                                            }
                                                        </Select>

                                                        {errors.nearestPoliceStation && (
                                                            <FormHelperText>{errors.nearestPoliceStation}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                {/* 
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        error={!!errors.nearestPoliceStation}
                                                        helperText={errors.nearestPoliceStation}

                                                        InputLabelProps={{
                                                            required: true,

                                                            classes: {
                                                                asterisk: 'custom-asterisk',
                                                            },
                                                        }} onChange={handleInputChangeForAll} name="nearestPoliceStation" className='input' value={formData.nearestPoliceStation} fullWidth label="" variant="outlined" />
                                                </Grid> 

                                                 <Grid item xs={12} sm={6} md={4}>
                                                    <TextField

                                                      

                                                        onChange={handleInputChangeForAll} name="districtCyberLab" className='input' value={formData.districtCyberLab} fullWidth label="District Cyber Lab" variant="outlined" />
                                                </Grid>  */}


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
                                                            // error={!!errors.incidentDetails}
                                                            // helperText={errors.incidentDetails}
                                                            // InputLabelProps={{
                                                            //     required: true,
                                                            //     classes: {
                                                            //         asterisk: 'custom-asterisk',
                                                            //     },
                                                            // }}
                                                            onChange={handleInputChangeForAll}
                                                            name="incidentDetails"
                                                            className="input"
                                                            value={formData.incidentDetails}
                                                            fullWidth
                                                            label="Incident Details"
                                                            variant="outlined"

                                                            multiline
                                                            rows={8}
                                                        />
                                                    </Grid>
                                                    {/* {lessCharError.no ? (<ErrorBox item xs={1} sm={12} md={12}>
                                                        {lessCharError.value} <Warning />
                                                    </ErrorBox>) : (<></>)


                                                    } */}
                                                    <Grid ref={incidentDateRef} id="incidentDate" item xs={12} sm={6} md={4}>
                                                        <TextField

                                                            error={!!errors.incidentDate}
                                                            helperText={errors.incidentDate}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                                required: true,
                                                                classes: {
                                                                    asterisk: 'custom-asterisk',
                                                                },
                                                            }}
                                                            type='datetime-local'
                                                            fullWidth
                                                            label="Incident Date and Time"
                                                            variant="outlined"
                                                            onChange={handleInputChangeForAll}
                                                            name='incidentDate'
                                                            value={formData.incidentDate}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={4}>
                                                        <FormControl fullWidth variant="outlined">
                                                            <InputLabel htmlFor="identificationType">Identification Type</InputLabel>
                                                            <Select
                                                                name="identificationType"
                                                                value={formData.identificationType}
                                                                onChange={handleInputChangeForAll}
                                                                label="Identification Type"
                                                            >
                                                                <MenuItem value=""><em>None</em></MenuItem>
                                                                <MenuItem value="Voter Id">Voter Id</MenuItem>
                                                                <MenuItem value="Aadhar Number">Aadhar Number</MenuItem>
                                                                <MenuItem value="PanCard Number">PanCard Number</MenuItem>
                                                                <MenuItem value="Passport">Passport</MenuItem>
                                                                <MenuItem value="Driving License">Driving License</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid ref={IdentificationIdRef} item xs={12} sm={6} md={4}>
                                                        <TextField
                                                            error={!!errors.IdentificationId}
                                                            helperText={errors.IdentificationId}
                                                            onChange={handleInputChangeForAll}
                                                            name="IdentificationId"
                                                            value={formData.IdentificationId}
                                                            fullWidth
                                                            label="Identification ID"
                                                            variant="outlined"
                                                            InputLabelProps={{
                                                                required: isIdentificationIdRequired,
                                                                classes: {
                                                                    asterisk: 'custom-asterisk',
                                                                },
                                                            }}
                                                        />
                                                    </Grid>





                                                    {/* // if financial fraud */}


                                                    {
                                                        isFinancial ? (

                                                            <Grid item xs={12} sm={6} md={12}>
                                                                <FormControl style={{ display: 'block' }} component="fieldset">
                                                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                                                        Have You Lost Money?  <FormControlLabel disabled={true}
                                                                            control={<Checkbox name="yes" checked={formData.LostMoneyState} onChange={handleLostMoneyChange} />}

                                                                        />
                                                                    </Typography>
                                                                </FormControl>
                                                            </Grid>

                                                        ) : <></>
                                                    }

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

                                                                <Grid ref={complaintDescRef} item xs={12} sm={6} md={6}>
                                                                    <FormControl fullWidth variant="outlined" error={!!errors[`transactionDetails[${index}].bank_name`]}>
                                                                        <InputLabel htmlFor="Cdesc">
                                                                            Name of the Bank/ Wallet/Merchant <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                                                        </InputLabel>
                                                                        <Select
                                                                            onChange={(e) => handleTransactionChange(index, e)}
                                                                            value={transaction.bank_name}
                                                                            name="bank_name"
                                                                            className='select'
                                                                            label="Name of the Bank/ Wallet/Merchant"
                                                                        >
                                                                            {BankList.map((elm, index) => (
                                                                                <MenuItem key={index} value={elm}>{elm}</MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                        {errors[`transactionDetails[${index}].bank_name`] && (
                                                                            <FormHelperText>{errors[`transactionDetails[${index}].bank_name`]}</FormHelperText>
                                                                        )}
                                                                    </FormControl>
                                                                </Grid>

                                                                <Grid ref={complaintDescRef} item xs={12} sm={6} md={6}>
                                                                    <FormControl fullWidth variant="outlined" error={!!errors[`transactionDetails[${index}].transaction_complaint_desc`]} >
                                                                        <InputLabel htmlFor="Cdesc">Complaint Description <span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                                        <Select onChange={(e) => handleTransactionChange(index, e)} value={transaction.transaction_complaint_desc} name="transaction_complaint_desc" className='select' label="complaint Description" >
                                                                            {
                                                                                complaintComplaintDescArray.map((elm, index) => (
                                                                                    <MenuItem key={index} value={elm.complaint_desc_id}>{elm.complaint_desc}</MenuItem>
                                                                                ))
                                                                            }

                                                                        </Select>
                                                                        {/* {errors.complaintDesc && (
                                                                            <FormHelperText>{errors[`transactionDetails[${index}].complaintDesc`]}</FormHelperText>
                                                                    
                                                                        )} */}
                                                                    </FormControl>
                                                                </Grid>

                                                                <Grid item xs={12} sm={6} md={4}>
                                                                    <TextField
                                                                        onChange={(e) => handleTransactionChange(index, e)}
                                                                        name="transaction_id"
                                                                        className='input'
                                                                        error={!!errors[`transactionDetails[${index}].transaction_id`]}
                                                                        helperText={errors[`transactionDetails[${index}].transaction_id`]}
                                                                        value={transaction.transaction_id}
                                                                        fullWidth
                                                                        label="12-digit Transaction id/UTR No."
                                                                        variant="outlined"
                                                                        InputLabelProps={{
                                                                            required: true,
                                                                            maxLength: 12,
                                                                            classes: {
                                                                                asterisk: 'custom-asterisk',
                                                                            },
                                                                        }}
                                                                        required
                                                                    />
                                                                </Grid>

                                                                <Grid id='transDate' item xs={12} sm={6} md={4}>
                                                                    <TextField
                                                                        onChange={(e) => handleTransactionChange(index, e)}
                                                                        error={!!errors[`transactionDetails[${index}].transaction_date`]}
                                                                        helperText={errors[`transactionDetails[${index}].transaction_date`]}
                                                                        InputLabelProps={{
                                                                            required: true,
                                                                            shrink: true,
                                                                            classes: {
                                                                                asterisk: 'custom-asterisk',
                                                                            },
                                                                        }}
                                                                        name="transaction_date"
                                                                        type='datetime-local'
                                                                        fullWidth
                                                                        label="Date of Transaction"
                                                                        variant="outlined"
                                                                        required
                                                                        value={transaction.transaction_date}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={12} sm={6} md={4}>
                                                                    <TextField
                                                                        onChange={(e) => handleTransactionChange(index, e)}
                                                                        InputLabelProps={{
                                                                            required: true,
                                                                            classes: {
                                                                                asterisk: 'custom-asterisk',
                                                                            },
                                                                        }}
                                                                        error={!!errors[`transactionDetails[${index}].transaction_amount`]}
                                                                        helperText={errors[`transactionDetails[${index}].transaction_amount`]}
                                                                        name="transaction_amount"
                                                                        className='input'
                                                                        type='number'
                                                                        fullWidth
                                                                        label="Transaction Amount"
                                                                        variant="outlined"
                                                                        required
                                                                        value={transaction.transaction_amount}
                                                                    />
                                                                </Grid>
                                                            </React.Fragment>
                                                        ))}

                                                        {/* Add Transaction Button */}



                                                        <Grid item xs={12} >

                                                            <TextField onChange={handleInputChangeForAll} name="TotalTransectionAmount" className='input' value={formData.TotalTransectionAmount} label="Total Amount Lost" variant="outlined" />

                                                            <StyledButton onClick={addTransaction} style={{ width: "auto", marginBottom: '12px' }} variant="contained" color="primary" className="button">
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
                                                    <TextField onChange={handleInputChangeForAll} name="suspectedWebsite" className='input' value={formData.suspectedWebsite} fullWidth label="Suspected Website Urls/Social Media handles" variant="outlined" />
                                                </Grid>


                                                <Grid item xs={12} sm={12} md={12}>
                                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                                        Suspect's Details (if available) :
                                                    </Typography>

                                                </Grid>

                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField onChange={handleInputChangeForAll} name="suspectedMobileNum" className='input' value={formData.suspectedMobileNum} fullWidth label="Mobile Number" variant="outlined" />
                                                </Grid>



                                                {/* //if both are same--  */}
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField onChange={handleInputChangeForAll} name="suspectedEmail" className='input' value={formData.suspectedEmail} fullWidth label="Email Id" variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField onChange={handleInputChangeForAll} name="suspectedBankAccNum" className='input' value={formData.suspectedBankAccNum} fullWidth label="Bank Account Number Or UPI Id" variant="outlined" />
                                                </Grid>

                                                {/* //remarks  */}

                                                <Grid item xs={12} sm={12} md={6}>
                                                    <TextField
                                                        onChange={handleInputChangeForAll}

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
                                                        onChange={handleInputChangeForAll}

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

                                {/* //5th details  */}

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
                                            <Grid ref={acknowledgementNumRef} className='tab' container spacing={4}>

                                                {/* //acknowlegement remarks  */}

                                                <Grid item xs={12} sm={12} md={6}>
                                                    <TextField
                                                        error={!!errors.acknowledgement}
                                                        helperText={errors.acknowledgement}
                                                        InputLabelProps={{
                                                            required: statusIsNccrp,
                                                            classes: {
                                                                asterisk: 'custom-asterisk',
                                                            },
                                                        }}

                                                        onChange={handleInputChangeForAll}
                                                        className="input"
                                                        value={formData.acknowledgement}
                                                        fullWidth
                                                        // disabled={true}
                                                        label="Acknowledgement 1"
                                                        name='acknowledgement'
                                                        variant="outlined"
                                                        multiline


                                                    />
                                                </Grid>


                                                <Grid item xs={12} sm={12} md={6}>
                                                    <TextField

                                                        onChange={handleInputChangeForAll}
                                                        className="input"
                                                        value={formData.acknowledgement2}
                                                        fullWidth
                                                        // disabled={true}
                                                        label="Acknowledgement 2"
                                                        name='acknowledgement2'
                                                        variant="outlined"
                                                        multiline
                                                        rows={2}

                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6}>
                                                    <TextField

                                                        onChange={handleInputChangeForAll}
                                                        className="input"
                                                        value={formData.acknowledgement3}
                                                        fullWidth
                                                        label="Acknowledgement 3"
                                                        name='acknowledgement3'
                                                        variant="outlined"
                                                        // disabled={true}
                                                        multiline
                                                        rows={2}

                                                    />
                                                </Grid> <Grid item xs={12} sm={12} md={6}>
                                                    <TextField

                                                        onChange={handleInputChangeForAll}
                                                        className="input"
                                                        value={formData.acknowledgement4}
                                                        fullWidth
                                                        label="Acknowledgement 4"
                                                        name='acknowledgement4'
                                                        variant="outlined"
                                                        multiline
                                                        // disabled={true}

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
                                                        <Select disabled={ackNumGiven} onChange={handleInputChangeForAll} name="status" value={formData.status} className='select' label="Status"  >
                                                            <MenuItem value="NEW">New</MenuItem>
                                                            <MenuItem value="PENDING">Pending</MenuItem>
                                                            <MenuItem value="registered_in_nccrp">Registerd in NCCRP</MenuItem>
                                                            <MenuItem value="fir_registered">FIR Registered</MenuItem>
                                                            <MenuItem value="CLOSED">Close</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={8}>
                                                    <TextField

                                                        onChange={handleInputChangeForAll}
                                                        className="input"
                                                        value={formData.status_remarks}
                                                        fullWidth
                                                        // disabled={true}
                                                        label="remarks"
                                                        name='status_remarks'
                                                        variant="outlined"
                                                        multiline

                                                    // rows={2}
                                                    />
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
                                <Grid style={{ paddingBottom: '25px' }} item xs={12}   >
                                    <StyledButton onClick={SubmitForm} style={{ width: "auto", marginBottom: '22px' }} variant="contained" color="primary" className="button">
                                        <Save className="bell" />
                                        Update
                                    </StyledButton>
                                </Grid>
                            </StyledContainer >
                        </div >

            }
        </div >
    );
};

export default NewComplaint;
