import React from 'react';
import '../css/complaint.css';
import {
    Container, Autocomplete, Paper, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Button, Box, FormControlLabel, Checkbox, FormHelperText, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { useNavigate } from 'react-router-dom';
import { ContactEmergencyRounded, ContactPage, ExpandOutlined, Compress, Save, Close, AppRegistration, Phone, Delete, EditNote, Label, AddTask, SaveAlt, SavedSearch, SavingsTwoTone, DataSaverOn, BookmarkAdd } from '@mui/icons-material';
import { useRef, useState, useEffect } from 'react';
import { useSidebar } from '../components/SidebarContext';
import { ClipLoader } from 'react-spinners';
import { BarLoader } from 'react-spinners';


//css -------------------------------------
import dayjs from 'dayjs';

const StyledContainer = styled(Container)({
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    minWidth: '75vw ',
    flexDirection: 'column',
    fontFamily: 'system-ui',
    background: 'white',
    paddingBottom: '40px !important',
    fontWeight: '500',
    padding: '2rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    '& MuiInputLabel-root': {
        fontFamily: 'Recursive, sans-serif !important',
    },

    '& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiInputLabel-shrink': {
        transform: 'translate(14px, -20px) scale(0.88) !important',
        fontFamily: 'Recursive, sans-serif',
    },
    '& .Mui-error': {
        color: 'rgb(211, 47, 47) ',
        background: 'white !important',
        margin: '0px !important',
    },
    '& .Mui-disabled': {
        opacity: '1',
        background: '#fff9f6 !important',
        color: 'gray !important',

        cursor: 'not-allowed !important'


    },
    // '& .css-sghohy-MuiButtonBase-root-MuiButton-root.Mui-disabled': {
    //     opacity: '1',
    //     background: '#f3eae6 !important',
    //     backgroundColor: '#f3eae6 !important',
    //     cursor: 'not-allowed !important'
    // },


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
    color: '#061173',
});
const StyledIcon2 = styled(ContactEmergencyRounded)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: '#061173',
});
const StyledIcon3 = styled(ContactPage)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: '#061173',
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
const NewComplaint = () => {
    const navigate = useNavigate();
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
        BankList,
        statesList,
        setStateList,
        systemLanguage, setsystemLanguage
    } = useSidebar();



    //demo state list 
    //VALIDATION CONTAINERS |


    const [progressBar, setprogressBar] = useState(true);
    const IncidentSectionErrorFree = useRef(null);
    const SuspectSectionErrorFree = useRef(null);
    const [TransactionIsErrorFree, setTransactionIsErrorFree] = useState(true);
    const [callerNumFound, setcallerNumFound] = useState(false);
    const [callerSourceFound, setcallerSourceFound] = useState(false);



    // Function to get current date and time in IST
    // Current date and time in IST
    const currentDate = new Date().toISOString().slice(0, 10);

    const [PinCodeList, setPinCodeList] = useState([]);
    //useref---------------------------------
    const complaintCategoryRef = useRef(null);

    const [isLocalStorageDataRetrieved, setisLocalStorageDataRetrieved] = useState(false);
    const EditTransactionRef = useRef(null);
    const sourceOfComplaintRef = useRef(null);
    const complaintSubCategoryRef = useRef(null);
    const callerNameRef = useRef(null);
    const victimNameRef = useRef(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isTransactionAdded, setisTransactionAdded] = useState(false);
    const complaintDescRef = useRef(null);
    const callerGenderRef = useRef(null);
    const callerAgeRef = useRef(null);
    const victimGenderRef = useRef(null);
    const victimAgeRef = useRef(null);
    const VictimNumRef = useRef(null);
    const addressLine1Ref = useRef(null);
    const transactionDetailsRef = useRef(null);
    const districtRef = useRef(null);
    const stateRef = useRef(null);
    const callernumref = useRef(null);
    const IdentificationIdRef = useRef(null);
    const pincodeRef = useRef(null);
    const nearestPoliceStationRef = useRef(null);
    const incidentDateRef = useRef(null);
    //use state to set value of the check box
    const [box2, setbox2] = useState(false);

    const [isCreditCard, setisCreditCard] = useState(false);
    const [isUpi, setisUpi] = useState(false);
    const [lessCharError, setError] = useState({
        value: '',
        no: false
    });

    const [complaintId, setcomplaintId] = useState('');
    const [isIdentificationIdRequired, setIsIdentificationIdRequired] = useState(false);
    const [callerTab, setCallerTab] = useState(true);
    const [MandatoryTab, setMandatoryTab] = useState(false);
    const [OptionalTab, setOptionalTab] = useState(false);

    const [other_bank, setother_bank] = useState(false);
    const [callerNumber, setCallerNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [LoaderOn, setLoaderOn] = useState(false);
    const [isFinancial, setisFinancial] = useState(false);
    const [StateIsMaharastra, setStateIsMaharastra] = useState(true);

    const [TransEditable, setTransEditable] = useState(false);


    //object x------------------------

    // const [TransactionObject, setTransactionObject] = useState({
    //     bank_name: '',
    //     other_bank: false,
    //     transaction_complaint_desc: '',
    //     transaction_id: '',
    //     transaction_date: '',
    //     transaction_time: '',
    //     transaction_amount: '',
    //     transaction_remarks: '',
    //     block_amount: '',
    //     block_date: '',
    //     nccprc_no: '',
    //    
    //     account_no: '',
    //     credit_first: '',
    //     credit_last: ''
    // })


    const [TransactionObject, setTransactionObject] = useState({

        bank_name: '',
        other_bank: false,
        transaction_complaint_desc: '',
        transaction_id: '',
        transaction_date: '',
        transaction_amount: '',
        transaction_remarks: '',
        block_amount: '',
        block_date: '',
        block_time: '',
        transaction_time: '',
        nccprc_no: '',
        transaction_complaint_descname: '',
        //latest fields 
        credit_first: '',
        credit_last: '',
        ref_no: '',
        account_no: '',
        payment_gateway: '',
        background_info: '',
        office_profile_medium: '',
        affected_system_details: '',
        accused_contact_info: '',
        merchant_info: '',
        proof_of_owner_ship: '',

    })

    const [CcidBox, setCcidBox] = useState(false);
    //GET URLS DATA 

    // ALL API CALL HERE-------------------------------

    // 1 st api call fnc 
    const fncToGetComplaintCategory = () => {
        // setprogressBar(true);
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
                // setprogressBar(false);
                throw new Error('Internal server error');

            }
            return res.json();
        }).then(data => {

            if (data.success) {
                // console.log(data.result);

                setcomplaintCategoryArray(data.result);
                //LOGIC TO AUTO SELECT THE ELEMENT 
                // setprogressBar(false);

            }
            else {
                console.log(data);
                //show alert
                // setprogressBar(false);
            }

        }).catch(err => {
            console.log(err);
            // setprogressBar(false);
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
            "category_id": formData.complaintCategory || cmc,
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

    //5th api 

    const fncToGetDistrict = (pccode) => {
        //API CALL 1-

        const reqData = {

            "type": "district",
            action_user: ClBox.agentId,
            police_station_code: pccode

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


                setDistrictList(data.result);
            }
            else {
                console.log(data);
            }

        }).catch(err => {
            console.log(err);
        })


    }


    const fnctofetchStates = () => {
        //API CALL 1-
        setprogressBar(true);
        const reqData = {

            "type": "states",


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

            setprogressBar(false);
            if (data.success) {
                // console.log(data.result);
                setStateList(data.result);
            }
            else {
                console.log(data);
                setprogressBar(false);
            }

        }).catch(err => {
            console.log(err);
            setprogressBar(false);
        })


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


    //6th api 

    const fncToGetPinCode = (disId) => {
        //API CALL 1-

        const reqData = {
            type: "pincodes",
            state_code: 'MH',
            district_code: disId,
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

                setPinCodeList(data.result);
            }
            else {
                console.log(data);
            }

        }).catch(err => {
            console.log(err);
        })


    }






    const fncToGetPoliceStations = () => {
        //API CALL 1-
        const reqData = {
            "type": "police_station",
            action_user: ClBox.agentId,
            police_station_name: ""
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


    useEffect(() => {
        // aPI CALL 1
        // https://example.com/?callerid=%2B919911108228&callnumber=3996836&transinfo=&lrefid=I2024081417501811108228&lsid=INBOUND_3&leads=5&ctype=I&cdnd=0&ivrinfo=Hindi^categoryxyz^xyc
        fncToGetComplaintCategory();
        fncToGetComplaintSource();
        fncToGetPoliceStations();
        fncToGetbank_names();
        fnctofetchStates();
    }, []);

    useEffect(() => {
        const Csource = ClBox.Csource;
        const idx = ClBox.category;
        const selectedCategory = complaintCategoryArray.find(obj => obj.category_id === idx);
        const selectedcallsource = complaintSourceArray.find(obj => obj.source_id === Csource);
        if (selectedCategory) {
            setFormData(prevFormData => ({
                ...prevFormData,
                complaintCategory: selectedCategory.category_id
            }));
            fncToGetSubComplaintCategory(selectedCategory.category_id);
        }
        if (selectedcallsource) {
            setcallerSourceFound(true);
            setFormData(prevFormData => ({
                ...prevFormData,
                sourceOfComplaint: selectedcallsource.source_id
            }));
            // fncToGetSubComplaintCategory(selectedCategory.category_id);
        }

        if (statesList.length > 0) {
            setFormData(prevFormData => ({
                ...prevFormData,
                state: "MH",
            }));
        }

        setCallerNumber(ClBox.callerNumber);
        if (ClBox.callerNumber) {
            setcallerNumFound(true);
            setFormData(prevState => ({
                ...prevState,
                callerNumber: ClBox.callerNumber,
            }));
            //LOGIC TO GET DATA 
            GetProgressedDataOnThisNumber(ClBox.callerNumber);

            if (isLocalStorageDataRetrieved) {
                fncToGetBasicDetails(ClBox.callerNumber);
            }

        }

    }, [complaintCategoryArray, complaintSourceArray, ClBox.Csource, ClBox.callerNumber, isLocalStorageDataRetrieved]);



    //fnc to get basic details 
    const fncToGetBasicDetails = async (num) => {
        setprogressBar(true);
        //API CALL 1-

        const reqData = {
            "type": "complainant_details",
            "caller_no": num,
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

                setprogressBar(false);
                throw new Error('Internal server error')
            }
            return res.json();
        }).then(data => {
            setprogressBar(false);
            if (data.success) {

                // console.log(data.result);
                //    (data.result);

                const result = data.result;

                if (result.state_code != 'MH') {
                    setStateIsMaharastra(false);
                    setisFinancial(false);

                } else {
                    fncToGetDistrict(result.police_station);
                    if (result.pincode) {
                        fncToGetPinCode(result.district);
                    }


                }

                setFormData(prevState => ({
                    ...prevState,
                    email: result.email_id,
                    state: result.state_code || 'MH',
                    //got the solution----------------------
                    nearestPoliceStation: result.police_station,
                    district: result.district,
                    pincode_flag: result.pincode_flag,
                    pincode: result.pincode,
                    callerAge: result.caller_age,
                    callerName: result.caller_name,
                    callerGender: result.caller_gender,
                    VictimaltNum: result.alternate_number,
                    addressLine1: result.address_1,
                    addressLine2: result.address_2,
                    landmark: result.landmark,

                }));
            }
            else {

                // console.log(data);
                // console.log("New Number")
            }

        }).catch(err => {

            setprogressBar(false);
            console.log(err);
        })


    }

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
        state: '',
        incidentTime: '',
        district: '',
        pincode: '',
        pincode_flag: false,
        nearestPoliceStation: '',
        districtCyberLab: '',
        //second label
        incidentDetails: '',
        LostMoneyState: false,
        suspect_remarks: '',
        suspect_name: '',
        incidentDate: '',
        identificationType: '',
        IdentificationId: '',
        samePerson: false,
        transactionDetails: [],
        TotalTransectionAmount: '',
        suspectedWebsite: '',
        suspectedBankAccNum: '',
        suspectedMobileNum: '',
        suspectedEmail: '',
        suspectedAddress: '',
        TotalBlockedAmount: ''
    });


    //TRANSECTION DETAILS---------------------------


    const handleTransactionChange = (event) => {
        const { name, value, checked, type } = event.target;

        //ALL VALIDATION INSIDE THE  TRANSACTION SECTION-----------------------------------------------------------------
        //   ------------------------------------------------------------------------------------------------------------
        //   -----------------------------------------------------------------------------------------------------------
        //Transaction amount -1 ----------------------------------------------
        if (name === "transaction_amount") {
            if (!value) {
                setErrors((prev) => ({
                    ...prev,
                    transaction_amount: "Please enter a valid Amount",
                }));
            } else if (isNaN(value) || Number(value) <= 0) {

                setErrors((prev) => ({
                    ...prev,
                    transaction_amount: "Transaction amount must be greater than 0 and should be a valid number",
                }));
            } else if (!/^\d{1,48}(\.\d{1,2})?$/.test(value)) {

                setErrors((prev) => ({
                    ...prev,
                    transaction_amount: "Please enter a maximum of 50 digits, with up to 2 decimal places",
                }));
            } else {

                setErrors((prev) => ({
                    ...prev,
                    transaction_amount: "",
                }));
            }
        }

        if (name === "account_no") {
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    account_no: "",
                }));
            }
            else if (value.length < 5) {

                setErrors((prev) => ({
                    ...prev,
                    account_no: "Account Number cannot be less than 5 characters",
                }));


            } else {
                const isDuplicate = Object.entries(TransactionObject).some(([key, fieldValue]) => {
                    return key !== "account_no" && fieldValue === value;
                });

                if (isDuplicate) {
                    setErrors((prev) => ({
                        ...prev,
                        account_no: "Value cannot be similar to other fields",
                    }));
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        account_no: "",
                    }));
                }
            }
        }


        if (name === "ref_no") {
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    ref_no: "",
                }));
            }
            else if (value.length < 10) {

                // Check if the reference number is less than 10 characters
                setErrors((prev) => ({
                    ...prev,
                    ref_no: "Reference number must be at least 10 characters",
                }));
            } else {

                // If all checks pass, clear the error for reference_number
                setErrors((prev) => ({
                    ...prev,
                    ref_no: "",
                }));
            }
        }


        if (name === "transaction_id") {

            if (value.length <= 11 && value.length != 0) {
                if (!isCreditCard) {
                    setErrors((prev) => ({
                        ...prev,
                        transaction_id: "Transaction ID must include 12 characters",
                    }));

                }
            } else {
                setErrors((prev) => ({
                    ...prev,
                    transaction_id: "",
                }));
            }

        }


        if (name === "credit_first") {
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    credit_first: "",
                }));
            }

            else if (!/^\d{6}$/.test(value)) {

                setErrors((prev) => ({
                    ...prev,
                    credit_first: "Must include 6 digits",
                }));
            } else {

                // If all checks pass, clear the error for accused_contact_info
                setErrors((prev) => ({
                    ...prev,
                    credit_first: "",
                }));
            }
        }

        if (name === "credit_last") {
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    credit_last: "",
                }));
            }

            else if (!/^\d{4}$/.test(value)) {

                setErrors((prev) => ({
                    ...prev,
                    credit_last: "Must include 4 digits",
                }));
            } else {

                // If all checks pass, clear the error for accused_contact_info
                setErrors((prev) => ({
                    ...prev,
                    credit_last: "",
                }));
            }
        }




        if (name === "payment_gateway") {
            if (value === "") {
                setErrors((prev) => ({
                    ...prev,
                    payment_gateway: "",
                }));
            } else {
                const isDuplicate = Object.entries(TransactionObject).some(([key, fieldValue]) => {
                    return key !== "payment_gateway" && fieldValue === value;
                });

                if (isDuplicate) {
                    setErrors((prev) => ({
                        ...prev,
                        payment_gateway: "Value cannot be similar to other fields",
                    }));
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        payment_gateway: "",
                    }));
                }
            }
        }


        if (name === "merchant_info") {
            if (value === "") {
                setErrors((prev) => ({
                    ...prev,
                    merchant_info: "",
                }));
            } else {
                const isDuplicate = Object.entries(TransactionObject).some(([key, fieldValue]) => {
                    return key !== "merchant_info" && fieldValue === value;
                });

                if (isDuplicate) {
                    setErrors((prev) => ({
                        ...prev,
                        merchant_info: "Value cannot be similar to other fields",
                    }));
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        merchant_info: "",
                    }));
                }
            }
        }



        // Handle specific cases for transaction_complaint_desc
        if (name === "transaction_complaint_desc") {
            if (value === "3") {
                setisCreditCard(true);

                setisUpi(false);
            } else if (value === "8" || value === "7") {
                setisUpi(true);
                setisCreditCard(false);
                setTransactionObject((prev) => ({
                    ...prev,
                    credit_first: "",
                    credit_last: ""
                }));
            } else {
                setisUpi(false);
                setisCreditCard(false);
                setTransactionObject((prev) => ({
                    ...prev,
                    credit_first: "",
                    credit_last: ""
                }));
            }
        }

        // Handle checkbox case
        if (type === "checkbox" && checked === true) {
            setTransactionObject((prev) => ({
                ...prev,
                bank_name: "",
            }));
        }

        // Update transaction object with new value
        setTransactionObject((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };



    const handleDeleteTransaction = (index) => {
        const userConfirmed = confirm("Delete Transaction. Confirm?");
        if (!userConfirmed) return;
        setFormData((prev) => {
            const updatedTransactions = prev.transactionDetails.filter((_, i) => i !== index);
            // Recalculate total lost money
            const totalLostMoney = updatedTransactions.reduce((acc, elem) => acc + parseFloat(elem.transaction_amount || 0, 10), 0);
            return {
                ...prev,
                transactionDetails: updatedTransactions,
                TotalTransectionAmount: totalLostMoney,
            };
        });
    };


    const handleEditTransaction = (index) => {
        EditTransactionRef.current.scrollIntoView({ behavior: 'smooth' });
        setTransEditable(true);
        setTimeout(() => {
            setTransEditable(false);
        }, 10000);

        setEditingIndex(index);

        const transaction = formData.transactionDetails[index];

        if (transaction.transaction_complaint_desc === '3') {
            setisCreditCard(true);
            setisUpi(false);
        } else if (transaction.transaction_complaint_desc === '8' || transaction.transaction_complaint_desc === '7') {
            setisUpi(true);
            setisCreditCard(false);
        } else {
            setisUpi(false);
            setisCreditCard(false);
        }

        setTransactionObject(transaction);
        const transaction_time = transaction.transaction_time
            ? dayjs(transaction.transaction_time, 'HH:mm')
            : null;
        settransaction_timeValue(transaction_time);


    };

    const addTransaction = () => {
        const tempErrors = {};
        if (TransactionObject.transaction_amount) {
            const value = TransactionObject.transaction_amount;
            if (!value) {
                setErrors((prev) => ({
                    ...prev,
                    transaction_amount: "Please enter a valid Amount",
                }));

            } else if (isNaN(value) || Number(value) <= 0) {

                setErrors((prev) => ({
                    ...prev,
                    transaction_amount: "Transaction amount must be greater than 0 and should be a valid number",
                }));
                transactionDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
                return;

            } else if (!/^\d{1,48}(\.\d{1,2})?$/.test(value)) {

                setErrors((prev) => ({
                    ...prev,
                    transaction_amount: "Please enter a maximum of 50 digits, with up to 2 decimal places",
                }));
                transactionDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
                return;
            } else {

                setErrors((prev) => ({
                    ...prev,
                    transaction_amount: "",
                }));
            }
        }

        if (TransactionObject.account_no) {
            const value = TransactionObject.account_no;
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    account_no: "",
                }));
            }
            else if (value.length < 5) {

                setErrors((prev) => ({
                    ...prev,
                    account_no: "Account Number cannot be less than 5 characters",
                }));
                transactionDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
                return;


            } else {
                const isDuplicate = Object.entries(TransactionObject).some(([key, fieldValue]) => {
                    return key !== "account_no" && fieldValue === value;
                });

                if (isDuplicate) {
                    setErrors((prev) => ({
                        ...prev,
                        account_no: "Value cannot be similar to other fields",
                    }));
                    transactionDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
                    return;
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        account_no: "",
                    }));
                }
            }
        }

        if (TransactionObject.ref_no) {
            const value = TransactionObject.ref_no;
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    ref_no: "",
                }));
            }
            else if (value.length < 10) {

                // Check if the reference number is less than 10 characters
                setErrors((prev) => ({
                    ...prev,
                    ref_no: "Reference number must be at least 10 characters",
                }));
                transactionDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
                return;
            } else {

                // If all checks pass, clear the error for reference_number
                setErrors((prev) => ({
                    ...prev,
                    ref_no: "",
                }));
            }
        }

        // if (TransactionObject.transaction_id) {
        //     const value = TransactionObject.transaction_id;
        //     if (value === "") {

        //         setErrors((prev) => ({
        //             ...prev,
        //             transaction_id: "",
        //         }));
        //     }
        //     else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{12}$/.test(value)) {
        //         setErrors((prev) => ({
        //             ...prev,
        //             transaction_id: "Transaction ID must include 12 characters",
        //         }));
        //         transactionDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
        //         return;
        //     }
        //     else {

        //         // If all checks pass, clear the error for accused_contact_info
        //         setErrors((prev) => ({
        //             ...prev,
        //             transaction_id: "",
        //         }));
        //     }
        // }

        if (TransactionObject.credit_first) {
            const value = TransactionObject.credit_first;
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    credit_first: "",
                }));
            }

            else if (!/^\d{6}$/.test(value)) {

                setErrors((prev) => ({
                    ...prev,
                    credit_first: "Must include 6 digits",
                }));
                transactionDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
                return;
            } else {

                // If all checks pass, clear the error for accused_contact_info
                setErrors((prev) => ({
                    ...prev,
                    credit_first: "",
                }));
            }
        }

        if (TransactionObject.credit_last) {
            const value = TransactionObject.credit_last;
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    credit_last: "",
                }));
            }

            else if (!/^\d{4}$/.test(value)) {

                setErrors((prev) => ({
                    ...prev,
                    credit_last: "Must include 4 digits",
                }));
                transactionDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
                return;
            } else {

                // If all checks pass, clear the error for accused_contact_info
                setErrors((prev) => ({
                    ...prev,
                    credit_last: "",
                }));
            }
        }

        if (TransactionObject.payment_gateway) {
            const value = TransactionObject.payment_gateway;

            if (value === "") {
                setErrors((prev) => ({
                    ...prev,
                    payment_gateway: "",
                }));
            } else {
                // Check if the payment_gateway value is a duplicate among other fields, excluding itself
                const isDuplicate = Object.entries(TransactionObject).some(([key, fieldValue]) => {
                    return key !== "payment_gateway" && fieldValue === value;
                });

                if (isDuplicate) {
                    setErrors((prev) => ({
                        ...prev,
                        payment_gateway: "Value cannot be similar to other fields",
                    }));

                    return;
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        payment_gateway: "",
                    }));
                }
            }
        }

        if (TransactionObject.merchant_info) {

            const value = TransactionObject.merchant_info;
            if (value === "") {
                setErrors((prev) => ({
                    ...prev,
                    merchant_info: "",
                }));
            } else {
                const isDuplicate = Object.entries(TransactionObject).some(([key, fieldValue]) => {
                    return key !== "merchant_info" && fieldValue === value;
                });

                if (isDuplicate) {
                    setErrors((prev) => ({
                        ...prev,
                        merchant_info: "Value cannot be similar to other fields",
                    }));
                    // transactionDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
                    return;
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        merchant_info: "",
                    }));
                }
            }
        }


        // Validate TransactionObject
        if (!TransactionObject.bank_name) tempErrors.bank_name = "This field is required.";
        if (!TransactionObject.transaction_date) tempErrors.transaction_date = "This field is required.";
        if (!TransactionObject.transaction_amount) tempErrors.transaction_amount = "This field is required.";
        if (!TransactionObject.transaction_complaint_desc) tempErrors.transaction_complaint_desc = "This field is required.";
        if (!TransactionObject.account_no && isUpi) tempErrors.account_no = "This field is required.";
        if (!TransactionObject.ref_no && isCreditCard) tempErrors.ref_no = "This field is required.";

        if (!TransactionObject.transaction_id) {
            if (!isCreditCard) {
                tempErrors.transaction_id = "This field is required.";
            }

        } else if (TransactionObject.transaction_id.length !== 12) {

            tempErrors.transaction_id = "Transaction ID must include 12 digits";
        }





        // if (!TransactionIsErrorFree) {
        //     transactionDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
        //     console.log("Given transaction detail is not valid !")
        //     return;

        // }

        if (Object.keys(tempErrors).length > 0) {
            setErrors(tempErrors);
            return;
        } else {

            if (!TransactionObject.transaction_time) {
                const userConfirmed = confirm("No time specified. Continue?");
                if (!userConfirmed) return;
            }
            setisTransactionAdded(true)

            setTimeout(() => {
                setisTransactionAdded(false)
                transactionDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        }

        const compDesc = complaintComplaintDescArray.find(obj => obj.complaint_desc_id === TransactionObject.transaction_complaint_desc);
        const compDescName = compDesc ? compDesc.complaint_desc : '';
        TransactionObject.transaction_complaint_descname = compDescName;

        setFormData((prev) => {
            let updatedTransactions;
            if (editingIndex !== null) {
                // Replace existing transaction
                updatedTransactions = [...prev.transactionDetails];
                updatedTransactions[editingIndex] = TransactionObject;
            } else {
                // Add new transaction
                updatedTransactions = [...prev.transactionDetails, TransactionObject];
            }

            // Calculate total lost money
            const totalLostMoney = updatedTransactions.reduce((acc, elem) => acc + parseFloat(elem.transaction_amount || 0, 10), 0);

            return {
                ...prev,
                transactionDetails: updatedTransactions,
                TotalTransectionAmount: totalLostMoney,
            };
        });

        // Reset states after adding or updating
        setTransactionObject({
            bank_name: '',
            other_bank: false,
            transaction_complaint_desc: '',
            transaction_id: '',
            transaction_date: '',
            transaction_time: '',
            transaction_amount: '',
            transaction_remarks: '',
            block_amount: '',
            block_date: '',
            nccprc_no: '',
            transaction_complaint_descname: '',
            credit_first: '',
            credit_last: '',
            ref_no: '',
            account_no: '',
            payment_gateway: '',
            background_info: '',
            office_profile_medium: '',
            affected_system_details: '',
            accused_contact_info: '',
            merchant_info: '',
            proof_of_owner_ship: '',
        });
        settransaction_timeValue(null);
        // setblockedTimeValue(null);
        setErrors({});
        setEditingIndex(null); // Reset editing index


    };

    // tIME LOGIC HERE 

    const [incidentTimeValue, setIncidentTimeValue] = useState(
        formData.incidentTime ? dayjs(Number(formData.incidentTime)) : null
    );

    const [transaction_timeValue, settransaction_timeValue] = useState(
        TransactionObject.transaction_time ? dayjs(Number(TransactionObject.transaction_time)) : null
    );

    const handleIncidentTimeChange = (newValue) => {
        setIncidentTimeValue(newValue);

        if (newValue) {
            const formattedTime = newValue.format('HH:mm');
            handleInputChangeForAll({ target: { name: 'incidentTime', value: formattedTime } });
        } else {
            handleInputChangeForAll({ target: { name: 'incidentTime', value: '' } });
        }
    };

    const handletransaction_timeChange = (newValue) => {
        settransaction_timeValue(newValue);

        if (newValue) {
            const formattedTime = newValue.format('HH:mm');

            handleTransactionChange({ target: { name: 'transaction_time', value: formattedTime } });
        } else {
            handleTransactionChange({ target: { name: 'transaction_time', value: '' } });
        }
    };






    const handleInputChangeForAll = (event) => {
        const { name, value, checked, type } = event.target;

        let updatedFormData = { ...formData, [name]: type === "checkbox" ? checked : value };
        //validation ---------------------------------------1
        if (name === "callerAge") {
            updatedFormData.samePerson = false;
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    callerAge: "",
                }));
            }
            else if (isNaN(value) || Number(value) <= 0) {

                setErrors((prev) => ({
                    ...prev,
                    callerAge: "Invalid Age !",
                }));

            }
            else if (!/^\d{1,2}$/.test(value)) {

                setErrors((prev) => ({
                    ...prev,
                    callerAge: "Please enter a valid age (0-99)",
                }));
            } else {

                setErrors((prev) => ({
                    ...prev,
                    callerAge: "",
                }));
            }
        }

        // validation ---------------2 ----------------------
        if (name === "victimAge") {

            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    victimAge: "",
                }));
            }
            else if (isNaN(value) || Number(value) <= 0) {

                setErrors((prev) => ({
                    ...prev,
                    victimAge: "Invalid Age !",
                }));

            }
            else if (!/^\d{1,2}$/.test(value)) {

                setErrors((prev) => ({
                    ...prev,
                    victimAge: "Please enter a valid age (0-99)",
                }));
            } else {

                setErrors((prev) => ({
                    ...prev,
                    victimAge: "",
                }));
            }
        }

        // validation -3 ----------------------------------------
        if (name === "callerNumber") {
            updatedFormData.samePerson = false;
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    callerNumber: "",
                }));
            }

            else if (!/^\d{10}$/.test(value)) {

                // Check if the accused_contact_info is not exactly 10 digits
                setErrors((prev) => ({
                    ...prev,
                    callerNumber: "Please enter a valid 10-digit mobile number",
                }));
            } else {
                // If all checks pass, clear the error for accused_contact_info
                setErrors((prev) => ({
                    ...prev,
                    callerNumber: "",
                }));

            }
        }


        // validation -4  -------------------------------------
        if (name === "VictimNum") {
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    VictimNum: "",
                }));
            }
            else if (!/^\d{10}$/.test(value)) {

                // Check if the accused_contact_info is not exactly 10 digits
                setErrors((prev) => ({
                    ...prev,
                    VictimNum: "Please enter a valid 10-digit mobile number",
                }));
            } else {
                // If all checks pass, clear the error for accused_contact_info
                setErrors((prev) => ({
                    ...prev,
                    VictimNum: "",
                }));

            }
        }


        // validation -5 ---------------------------------------
        if (name === "VictimaltNum") {
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    VictimaltNum: "",
                }));
            }
            else if (!/^\d{10}$/.test(value)) {

                // Check if the accused_contact_info is not exactly 10 digits
                setErrors((prev) => ({
                    ...prev,
                    VictimaltNum: "Please enter a valid 10-digit mobile number",
                }));
            } else {
                // If all checks pass, clear the error for accused_contact_info
                setErrors((prev) => ({
                    ...prev,
                    VictimaltNum: "",
                }));

            }
        }


        // validation ------------------------------------------------------6
        if (name === "email") {
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    email: "",
                }));
            }
            else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {

                setErrors((prev) => ({
                    ...prev,
                    email: "Please enter a valid email address",
                }));
            }
            else {

                setErrors((prev) => ({
                    ...prev,
                    email: "",
                }));
            }
        }


        //suspect section -------------------------------------------------

        if (name === "suspectedMobileNum") {
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    suspectedMobileNum: "",
                }));
            }
            else if (!/^\d{10}$/.test(value)) {

                // Check if the accused_contact_info is not exactly 10 digits
                setErrors((prev) => ({
                    ...prev,
                    suspectedMobileNum: "Please enter a valid 10-digit mobile number",
                }));
            } else {
                // If all checks pass, clear the error for accused_contact_info
                setErrors((prev) => ({
                    ...prev,
                    suspectedMobileNum: "",
                }));

            }
        }

        if (name === "suspectedEmail") {
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    suspectedEmail: "",
                }));
            }
            else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {

                setErrors((prev) => ({
                    ...prev,
                    suspectedEmail: "Please enter a valid email address",
                }));
            }
            else {

                setErrors((prev) => ({
                    ...prev,
                    suspectedEmail: "",
                }));
            }
        }


        if (name === "suspectedBankAccNum") {
            if (value === "") {

                setErrors((prev) => ({
                    ...prev,
                    suspectedEmail: "",
                }));
            }
            else if (value.length < 5) {

                setErrors((prev) => ({
                    ...prev,
                    suspectedBankAccNum: "Account Number/Upi Id cannot be less than 5 characters",
                }));

            } else {
                setErrors((prev) => ({
                    ...prev,
                    suspectedBankAccNum: "",
                }));

            }
        }


        if (name === "callerName") {
            updatedFormData.samePerson = false;

            if (value === "") {
                setErrors((prev) => ({
                    ...prev,
                    callerName: "Name cannot be empty!",
                }));
            } else if (!/^[A-Za-z\s]+$/.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    callerName: "Invalid Name! Only letters are allowed.",
                }));
            } else {

                setErrors((prev) => ({
                    ...prev,
                    callerName: "",
                }));
            }
        }

        if (name === "victimName") {

            if (value === "") {
                setErrors((prev) => ({
                    ...prev,
                    victimName: "Name cannot be empty!",
                }));

            }
            else if (!/^[A-Za-z\s]+$/.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    victimName: "Invalid Name! Only letters are allowed.",
                }));

            } else {
                setErrors((prev) => ({
                    ...prev,
                    victimName: "",
                }));
            }
        }



        if (name === "suspect_name") {

            if (value === "") {
                setErrors((prev) => ({
                    ...prev,
                    suspect_name: "",
                }));
            } else if (!/^[A-Za-z\s]+$/.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    suspect_name: "Invalid Name! Only letters are allowed.",
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    suspect_name: "",
                }));
            }
        }


        if (name === "callerGender") {
            updatedFormData.samePerson = false;
        }




        if (name === "pincode") {
            // if (!formData.pincode_flag) {
            if (value === "") {
                setErrors((prev) => ({
                    ...prev,
                    pincode: "",
                }));
            }
            else if (!/^\d{6}$/.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    pincode: "Must include 6 digits",
                }));

            } else {
                setErrors((prev) => ({
                    ...prev,
                    pincode: "",
                }));
            }
            // }
        }
        // Update the state conditionally


        //TRANSACTION LOGIC


        if (name === 'identificationType') {
            if (value === "Aadhar" || value === "PanCard") {
                setIsIdentificationIdRequired(!!value);
            }
            else {
                setIsIdentificationIdRequired(false);
            }


        }




        if (name === "complaintCategory") {
            updatedFormData.complaintSubCategory = '';
            updatedFormData.complaintDesc = '';

            if (value === "1") {
                setisFinancial(true);
                updatedFormData.LostMoneyState = true;

                // updatedFormData.state = '14';
                if (formData.state != "MH") {
                    setisFinancial(false);
                    updatedFormData.LostMoneyState = false;
                    updatedFormData.nearestPoliceStation = '';
                    updatedFormData.TotalTransectionAmount = '';
                    updatedFormData.pincode = '';
                    updatedFormData.district = '';
                    updatedFormData.identificationType = '';
                    updatedFormData.IdentificationId = '';

                }

            } else {
                setisFinancial(false);
                updatedFormData.LostMoneyState = false;
                updatedFormData.TotalTransectionAmount = '';

                //remarks to Know------------
            }
        }


        if (name === "complaintSubCategory") {

            updatedFormData.complaintDesc = '';
            if (value === "6" || value === "8" || value === "1") {
                setisFinancial(true);
                updatedFormData.LostMoneyState = true;
                // updatedFormData.state = '14';
                if (formData.state != "MH") {
                    setisFinancial(false);
                    updatedFormData.LostMoneyState = false;
                    updatedFormData.nearestPoliceStation = '';
                    updatedFormData.TotalTransectionAmount = '';
                    updatedFormData.pincode = '';
                    updatedFormData.district = '';
                    updatedFormData.identificationType = '';
                    updatedFormData.IdentificationId = '';

                }

            } else {
                setisFinancial(false);
                updatedFormData.LostMoneyState = false;
                updatedFormData.TotalTransectionAmount = '';
                //remarks to Know------------
            }
        }

        if (name === "state") {
            if (value === 'MH') {
                setStateIsMaharastra(true);
                if (formData.complaintCategory === "1") {
                    setisFinancial(true);
                    updatedFormData.LostMoneyState = true;
                }
            } else {
                updatedFormData.nearestPoliceStation = '';
                updatedFormData.TotalTransectionAmount = '';
                updatedFormData.pincode = '';
                updatedFormData.identificationType = '';
                updatedFormData.IdentificationId = '';
                updatedFormData.district = '';
                setStateIsMaharastra(false);
                setisFinancial(false);
                updatedFormData.LostMoneyState = false;

            }
        }


        if (name === "nearestPoliceStation") {
            updatedFormData.district = '';
            updatedFormData.pincode = '';
        }

        if (name === "district") {

            updatedFormData.pincode = '';
        }
        setFormData(updatedFormData);


        // if (value === "pincode_flag" && checked) {
        //     updatedFormData.pincode_flag = true;
        // }
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



    //LOGIC TO PARTIALLY SAVE DATA TO THE DATABASE----------------

    const PartialSaveData = async () => {
        // Return early if user does not confirm or callerNumber is missing
        const sure = confirm("Save Progress?");
        if (!sure) {
            return;
        }



        let partialSaveData = { ...formData }

        if (!partialSaveData.state) {
            partialSaveData.state = 'MH';
            console.log("SOURCE OF COMPLAINT emergency !!!!")
        }
        if (!partialSaveData.callerNumber) {
            partialSaveData.callerNumber = ClBox.callerNumber;
            console.log("caller number not found emergency !!!!")
        }
        if (!partialSaveData.sourceOfComplaint) {
            partialSaveData.sourceOfComplaint = ClBox.Csource;
            console.log("SOURCE OF COMPLAINT emergency !!!!")
        }



        setprogressBar(true);
        // if (!formData.sourceOfComplaint) {
        //     alert("Please select Complaint source");
        //     return;
        // }


        //TWO OTHER CHECKS --------------------------------------
        try {

            const datasend = JSON.stringify(partialSaveData)
            const reqData = {
                type: "cache_set",
                action_user: ClBox.agentId,
                caller_no: ClBox.callerNumber,
                data: datasend,
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
            };

            // Await fetch request and handle response
            const response = await fetch(GlobalUrl, options);

            if (!response.ok) {
                setprogressBar(false);
                throw new Error('Internal server error');
            }

            const data = await response.json();

            if (data.success) {
                console.log(data.result);
                setprogressBar(false);
                alert("Progress Saved Successfully");
                // Optionally reset the form after saving
                // resetFormData();
            } else {
                console.warn("Failed to save progress:", data);
                setprogressBar(false);
            }

        } catch (error) {
            setprogressBar(false);
            console.error("Error saving data to local storage:", error);
        }
    };

    const GetProgressedDataOnThisNumber = async (key) => {

        try {
            setprogressBar(true);
            const reqData = {
                type: "cache_get",
                action_user: ClBox.agentId,
                caller_no: key
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
            };

            const response = await fetch(GlobalUrl, options);
            if (!response.ok) {

                setprogressBar(false);
                throw new Error('Failed to fetch: ' + response.statusText);
            }
            setprogressBar(false);
            const data = await response.json();
            if (!data.success) {

                setisLocalStorageDataRetrieved(true);
                return;
            }

            if (!data.result) {

                setisLocalStorageDataRetrieved(true);
                return;
            }

            const formdata = JSON.parse(data.result);
            handleState(formdata);

            // Handle Nearest Police Station
            if (formdata.nearestPoliceStation) {
                fncToGetDistrict(formdata.nearestPoliceStation);
            }
            if (formdata.district) {
                fncToGetPinCode(formdata.district);
            }
            // Handle Complaint Category and Sub-Category
            handleComplaintCategory(formdata);
            // Set form data
            if (!formdata.state) {
                setFormData({
                    ...formdata,
                    state: 'MH',
                })
            } else {
                setFormData(formdata);
            }
            setprogressBar(false);
        } catch (err) {
            setprogressBar(false);

            console.error('Error fetching data:', err);
        }
    };

    // Helper to handle state-specific logic
    const handleState = (formdata) => {
        if (formdata.state && formdata.state !== 'MH') {
            console.log("Prob got here inside the handle state !")
            setStateIsMaharastra(false);
            setisFinancial(false);
        }
    };

    // Helper to handle complaint category and sub-category logic
    const handleComplaintCategory = (formdata) => {
        if (formdata.complaintCategory === "1") {
            setisFinancial(true);
        }

        if (formdata.complaintSubCategory) {
            fncToGetSubComplaintCategory(formdata.complaintCategory);

            const value = formdata.complaintSubCategory;
            if (["6", "8", "1"].includes(value)) {
                setisFinancial(true);
                fncToGetComplaintDesc(formdata.complaintSubCategory, formdata.complaintCategory);
            } else {
                setisFinancial(false);
                fncToGetComplaintDesc(formdata.complaintSubCategory, formdata.complaintCategory);
            }
        }
    };




    const deleteFromLocalStorage = async (key) => {
        try {
            const reqData = {
                type: "cache_remove",
                action_user: ClBox.agentId,
                caller_no: key
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
            };

            // Await the fetch request
            const response = await fetch(GlobalUrl, options);

            // Check if the response was successful
            if (!response.ok) {
                throw new Error('Deletion failed: ' + response.statusText);
            }

            // Parse the response data
            const data = await response.json();

            // Optionally handle success message here
            if (data.success) {
                console.log('Item successfully deleted from cache.');
            } else {
                console.warn('Failed to delete item from cache.');
            }

        } catch (err) {
            console.error('Error during cache deletion:', err);
        }
    };


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
    //SUBMIT FORM ACTIVITY



    const validateForm = () => {
        let tempErrors = {};
        let firstErrorField = null;

        let fieldsToValidate = [];

        if (StateIsMaharastra) {
            fieldsToValidate = [
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
                { field: 'state', ref: stateRef },
                { field: 'pincode', ref: pincodeRef },
                { field: 'callerNumber', ref: callernumref },
                { field: 'nearestPoliceStation', ref: nearestPoliceStationRef },
                { field: 'IdentificationId', ref: IdentificationIdRef },
                { field: 'incidentDate', ref: incidentDateRef },
                { field: 'transactionDetails', ref: transactionDetailsRef }
            ];
        }

        else {
            fieldsToValidate = [
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
                // { field: 'state', ref: stateRef },
                { field: 'callerNumber', ref: callernumref },
                { field: 'incidentDate', ref: incidentDateRef },
            ];

        }




        if (formData.LostMoneyState) {
            if (formData.transactionDetails.length === 0) {
                tempErrors.transactionDetails = "At least one transaction must be added.";


                if (!firstErrorField && transactionDetailsRef.current) {
                    firstErrorField = transactionDetailsRef;
                }
            }
        }
        // Validate IdentificationId based on IdentificationType
        if (formData.identificationType === "Aadhar") {
            const aadharPattern = /^\d{12}$/;
            if (!aadharPattern.test(formData.IdentificationId)) {
                tempErrors['IdentificationId'] = "Aadhar number must be a 12-digit number.";
                if (!firstErrorField) firstErrorField = IdentificationIdRef;
            }
        } else if (formData.identificationType === "PanCard") {
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


        //all validation recheck----------------


        // Continue with the validation for other fields
        fieldsToValidate.forEach(({ field, ref }) => {
            if (field === 'IdentificationId' && !isIdentificationIdRequired) {
                return;
            }

            if (field === 'complaintDesc' && isFinancial) {
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
        console.log(formData);
        event.preventDefault();
        if (validateForm()) {
            //check for the validation if matches 


            if (formData.callerAge) {
                const value = formData.callerAge;
                if (value === "") {
                    setErrors((prev) => ({
                        ...prev,
                        callerAge: "",
                    }));
                } else if (isNaN(value) || Number(value) <= 0) {


                    setErrors((prev) => ({
                        ...prev,
                        callerAge: "Invalid Age!",
                    }));
                    IncidentSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;
                } else if (!/^\d{1,2}$/.test(value)) {


                    setErrors((prev) => ({
                        ...prev,
                        callerAge: "Please enter a valid age (0-99)",
                    }));
                    IncidentSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;
                } else {

                    setErrors((prev) => ({
                        ...prev,
                        callerAge: "",
                    }));
                }
            }

            if (formData.callerName) {
                const value = formData.callerName;
                if (value === "") {
                    setErrors((prev) => ({
                        ...prev,
                        callerName: "Name cannot be empty!",
                    }));
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    setErrors((prev) => ({
                        ...prev,
                        callerName: "Invalid Name! Only letters are allowed.",
                    }));
                    IncidentSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;

                } else {

                    setErrors((prev) => ({
                        ...prev,
                        callerName: "",
                    }));
                }
            }

            if (formData.victimName) {
                const value = formData.victimName.trim();

                if (value === "") {
                    setErrors((prev) => ({
                        ...prev,
                        victimName: "Name cannot be empty!",
                    }));
                    IncidentSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
                else if (!/^[A-Za-z\s]+$/.test(value)) {
                    setErrors((prev) => ({
                        ...prev,
                        victimName: "Invalid Name! Only letters are allowed.",
                    }));
                    IncidentSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        victimName: "",
                    }));
                }
            }

            if (formData.suspect_name) {
                const value = formData.suspect_name;
                if (value === "") {
                    setErrors((prev) => ({
                        ...prev,
                        suspect_name: "",
                    }));
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    setErrors((prev) => ({
                        ...prev,
                        suspect_name: "Invalid Name! Only letters are allowed.",
                    }));
                    SuspectSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;

                } else {
                    setErrors((prev) => ({
                        ...prev,
                        suspect_name: "",
                    }));
                }
            }

            // validation ---------------2 ----------------------
            if (formData.victimAge) {
                const value = formData.victimAge;
                if (value === "") {

                    setErrors((prev) => ({
                        ...prev,
                        victimAge: "",
                    }));
                }
                else if (isNaN(value) || Number(value) <= 0) {


                    setErrors((prev) => ({
                        ...prev,
                        victimAge: "Invalid Age !",
                    }));
                    IncidentSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;

                }
                else if (!/^\d{1,2}$/.test(value)) {
                    setErrors((prev) => ({
                        ...prev,
                        victimAge: "Please enter a valid age (0-99)",
                    }));
                    IncidentSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;
                } else {

                    setErrors((prev) => ({
                        ...prev,
                        victimAge: "",
                    }));
                }
            }

            // validation -3 ----------------------------------------
            if (formData.callerNumber) {
                const value = formData.callerNumber;
                if (value === "") {

                    setErrors((prev) => ({
                        ...prev,
                        callerNumber: "",
                    }));
                }

                else if (!/^\d{10}$/.test(value)) {

                    // Check if the accused_contact_info is not exactly 10 digits
                    setErrors((prev) => ({
                        ...prev,
                        callerNumber: "Please enter a valid 10-digit mobile number",
                    }));
                    IncidentSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;
                } else {
                    // If all checks pass, clear the error for accused_contact_info
                    setErrors((prev) => ({
                        ...prev,
                        callerNumber: "",
                    }));

                }
            }


            // validation -4  -------------------------------------
            if (formData.VictimNum) {

                const value = formData.VictimNum;
                if (value === "") {

                    setErrors((prev) => ({
                        ...prev,
                        VictimNum: "",
                    }));
                }
                else if (!/^\d{10}$/.test(value)) {

                    // Check if the accused_contact_info is not exactly 10 digits
                    setErrors((prev) => ({
                        ...prev,
                        VictimNum: "Please enter a valid 10-digit mobile number",
                    }));
                    IncidentSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;
                } else {
                    // If all checks pass, clear the error for accused_contact_info
                    setErrors((prev) => ({
                        ...prev,
                        VictimNum: "",
                    }));

                }
            }


            // validation -5 ---------------------------------------
            if (formData.VictimaltNum) {
                const value = formData.VictimaltNum;
                if (value === "") {

                    setErrors((prev) => ({
                        ...prev,
                        VictimaltNum: "",
                    }));
                }
                else if (!/^\d{10}$/.test(value)) {

                    // Check if the accused_contact_info is not exactly 10 digits
                    setErrors((prev) => ({
                        ...prev,
                        VictimaltNum: "Please enter a valid 10-digit mobile number",
                    }));
                    IncidentSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;
                } else {
                    // If all checks pass, clear the error for accused_contact_info
                    setErrors((prev) => ({
                        ...prev,
                        VictimaltNum: "",
                    }));

                }
            }


            // validation ------------------------------------------------------6
            if (formData.email) {

                const value = formData.email;
                if (value === "") {

                    setErrors((prev) => ({
                        ...prev,
                        email: "",
                    }));
                }
                else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {

                    setErrors((prev) => ({
                        ...prev,
                        email: "Please enter a valid email address",
                    }));
                    IncidentSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;

                }
                else {

                    setErrors((prev) => ({
                        ...prev,
                        email: "",
                    }));
                }
            }


            //suspect section -------------------------------------------------

            if (formData.suspectedMobileNum) {
                const value = formData.suspectedMobileNum;
                if (value === "") {

                    setErrors((prev) => ({
                        ...prev,
                        suspectedMobileNum: "",
                    }));
                }
                else if (!/^\d{10}$/.test(value)) {


                    // Check if the accused_contact_info is not exactly 10 digits
                    setErrors((prev) => ({
                        ...prev,
                        suspectedMobileNum: "Please enter a valid 10-digit mobile number",
                    }));
                    SuspectSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;
                } else {
                    // If all checks pass, clear the error for accused_contact_info
                    setErrors((prev) => ({
                        ...prev,
                        suspectedMobileNum: "",
                    }));

                }
            }

            if (formData.suspectedEmail) {

                const value = formData.suspectedEmail;
                if (value === "") {

                    setErrors((prev) => ({
                        ...prev,
                        suspectedEmail: "",
                    }));
                }
                else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {


                    setErrors((prev) => ({
                        ...prev,
                        suspectedEmail: "Please enter a valid email address",
                    }));

                    SuspectSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
                else {

                    setErrors((prev) => ({
                        ...prev,
                        suspectedEmail: "",
                    }));
                }
            }


            if (formData.suspectedBankAccNum) {
                const value = formData.suspectedBankAccNum;
                if (value === "") {

                    setErrors((prev) => ({
                        ...prev,
                        suspectedEmail: "",
                    }));
                }
                else if (value.length < 5) {


                    setErrors((prev) => ({
                        ...prev,
                        suspectedBankAccNum: "Account Number/Upi Id cannot be less than 5 characters",
                    }));
                    SuspectSectionErrorFree.current.scrollIntoView({ behavior: 'smooth' });
                    return;

                } else {
                    setErrors((prev) => ({
                        ...prev,
                        suspectedBankAccNum: "",
                    }));

                }
            }



            if (formData.pincode) {
                // if (!formData.pincode_flag) {
                const value = formData.pincode;
                if (value === "") {
                    setErrors((prev) => ({
                        ...prev,
                        pincode: "",
                    }));
                }
                else if (!/^\d{6}$/.test(value)) {
                    setErrors((prev) => ({
                        ...prev,
                        pincode: "Must include 6 digits",
                    }));
                    pincodeRef.current.scrollIntoView({ behavior: 'smooth' });
                    return;

                } else {
                    setErrors((prev) => ({
                        ...prev,
                        pincode: "",
                    }));
                }
                // }
            }



            const complaintObj = complaintCategoryArray.find(obj => obj.category_id === formData.complaintCategory);
            const complaintName = complaintObj.category;
            const message = `Do you want to continue?\nVictim: ${formData.victimName || ''}\nComplaint Category: ${complaintName || ''}`;
            const userConfirmed = confirm(message);
            if (userConfirmed) {
                setprogressBar(true);
            } else {
                return;
            }
            // api call 7th

            // let incidentDateTime;
            // if (formData.incidentTime) {
            //     incidentDateTime = `${formData.incidentDate}T${formData.incidentTime}`;
            // } else {
            //     incidentDateTime = `${formData.incidentDate}T00:00`;
            // }

            const reqData = {
                type: "save",
                caller_id: ClBox.call_Id,
                action_user: ClBox.agentId,
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
                pincode_flag: formData.pincode_flag,
                police_station: formData.nearestPoliceStation,
                district_cyber_labs: formData.districtCyberLab,
                email_id: formData.email,
                caller_no: ClBox.callerNumber || formData.callerNumber,
                incident_date: formData.incidentDate,
                incident_time: formData.incidentTime,
                state_code: formData.state || 'MH',
                incident_details: formData.incidentDetails,
                identity_type: formData.identificationType,
                identity_number: formData.IdentificationId,
                lost_money_state: formData.LostMoneyState,
                transaction_data: formData.LostMoneyState ? formData.transactionDetails.map(txn => ({
                    bank_name: txn.bank_name,
                    other_bank: txn.other_bank,
                    transaction_id: txn.transaction_id,
                    transaction_date: txn.transaction_date,
                    transaction_amount: txn.transaction_amount,
                    transaction_complaint_desc: txn.transaction_complaint_desc.toString(),
                    transaction_remarks: txn.transaction_remarks,
                    block_amount: txn.block_amount,
                    block_date: txn.block_date,
                    block_time: '',
                    nccprc_no: txn.nccprc_no,
                    transaction_time: txn.transaction_time,
                    //latest fields 
                    credit_first: txn.credit_first,
                    credit_last: txn.credit_last,
                    ref_no: txn.ref_no,
                    account_no: txn.account_no,
                    payment_gateway: txn.payment_gateway,
                    background_info: txn.background_info,
                    office_profile_medium: txn.office_profile_medium,
                    affected_system_details: txn.affected_system_details,
                    accused_contact_info: txn.accused_contact_info,
                    merchant_info: txn.merchant_info,
                    proof_of_owner_ship: txn.proof_of_owner_ship,
                    action_user: ClBox.agentId,
                    blocked_remark: '',
                    evidence_files: [],
                    nccrp_status: '',
                    nccrp_remark: '',
                })) : [],



                total_blocked_amount: formData.TotalBlockedAmount.toString(),
                total_transaction_amount: formData.TotalTransectionAmount.toString(),
                suspect_website_url: formData.suspectedWebsite,
                suspect_details: '',
                suspect_mobile: formData.suspectedMobileNum,
                suspect_email: formData.suspectedEmail,
                suspect_name: formData.suspect_name,
                suspect_bank_account_no: formData.suspectedBankAccNum,
                suspect_address: formData.suspectedAddress,
                complaint_source: formData.sourceOfComplaint.toString(),
                category_code: formData.complaintCategory.toString() || '0',
                sub_category_code: formData.complaintSubCategory.toString() || '0',
                // transaction_remarks: '',
                nccrp_no: '',
                acknowledge_1: '',
                acknowledge_2: '',
                acknowledge_3: '',
                acknowledge_4: '',
                status_remarks: '',
                category_desc_code: formData.complaintDesc.toString() || '0',
                suspect_remarks: formData.suspect_remarks,
                same_person: formData.samePerson,
                transaction_remarks: '',
                evidence_files: [],
               

            }

            // console.log(reqData);

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(reqData)
            };

            fetch(GlobalUrl, options).then(res => {
                if (!res.ok) {
                    setprogressBar(false);
                    throw new Error('Internal server error')
                }
                return res.json();
            }).then(data => {

                if (data.success) {


                    setprogressBar(false);
                    // setLoaderOn(true);
                    deleteFromLocalStorage(formData.callerNumber);


                    // setTimeout(() => {
                    setFormData({
                        complaintCategory: '',
                        complaintSubCategory: '',
                        complaintDesc: '',
                        sourceOfComplaint: '',
                        callerName: '',
                        callerGender: '',
                        callerNumber: '',
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
                        state: 'MH',
                        district: '',
                        incidentTime: '',
                        pincode: '',
                        pincode_flag: false,
                        nearestPoliceStation: '',
                        districtCyberLab: '',
                        //second label
                        incidentDetails: '',
                        LostMoneyState: false,
                        suspect_remarks: '',
                        incidentDate: '',
                        identificationType: '',
                        IdentificationId: '',
                        samePerson: false,
                        transactionDetails: [],
                        TotalTransectionAmount: '',
                        suspectedWebsite: '',
                        suspectedBankAccNum: '',
                        suspectedMobileNum: '',
                        suspectedEmail: '',
                        suspect_name: '',
                        suspectedAddress: '',
                        TotalBlockedAmount: '',
                    })




                    setIncidentTimeValue(null);
                    // setLoaderOn(false);
                    console.log("Form is valid, submitting...");
                    setcomplaintId(data.result);
                    setCcidBox(true);
                    window.parent.setParam(data.result);

                    // }, 5000);


                }
                else {
                    setprogressBar(false);
                    console.log(data);
                    setLoaderOn(false);
                }

            }).catch(err => {
                setprogressBar(false);
                console.log(err);
                setLoaderOn(false);
                setCcidBox(false);
            })

        } else {
            setprogressBar(false);
            console.log("Form is invalid.");
        }
    }
    const closeBoth = () => {
        setLoaderOn(false);
        setCcidBox(false);
        navigate('/pcp2/TodaysComplaint');
    }
    // TABLE ------------------------------------DATA GRID 
    const columns = [
        {
            field: 'actions',
            headerName: `${systemLanguage === "hi" ? "एक्शन" : systemLanguage === "mr" ? "एक्शन" : "Actions"}`,
            display: 'flex',
            width: 80,
            sortable: false,
            renderCell: (params) => (
                <>
                    <span onClick={() => handleEditTransaction(params.id)}><EditNote style={{ fill: 'blue', cursor: 'pointer', marginRight: '8px' }} /></span>
                    <span onClick={() => handleDeleteTransaction(params.id)}><Delete style={{ fill: 'blue', cursor: 'pointer' }} /></span>
                </>
            ),
        },


        { field: 'bank_name', headerName: `${systemLanguage === "hi" ? "बैंक का नाम" : systemLanguage === "mr" ? "बैंक का नाम" : "Bank Name"}`, width: 200, sortable: true },

        {
            field: 'transaction_amount', headerName: `${systemLanguage === "hi" ? "लेन-देन राशि" : systemLanguage === "mr" ? "लेन-देन राशि" : "Transaction Amount"}`,
            width: 200, sortable: true
        },
        { field: 'transaction_date', headerName: `${systemLanguage === "hi" ? "लेन-देन की तिथि" : systemLanguage === "mr" ? "लेन-देन की तिथि" : "Date of Transaction"}`, width: 200, sortable: true },
        { field: 'transaction_complaint_descname', headerName: `${systemLanguage === "hi" ? "शिकायत का विवरण" : systemLanguage === "mr" ? "शिकायत का विवरण" : "Complaint Description"}`, width: 200, sortable: true },
        {
            field: 'account_no', headerName: `${systemLanguage === "hi" ? "खाता संख्या/यूपीआई आईडी" : systemLanguage === "mr" ? "खाता संख्या/यूपीआई आईडी" : "Account Number/Upi ID"}`

            , width: 200, sortable: true
        },
        { field: 'transaction_id', headerName: `${systemLanguage === "hi" ? "लेन-देन आईडी" : systemLanguage === "mr" ? "लेन-देन आईडी" : "Transaction ID"}`, width: 200, sortable: true },
        { field: 'transaction_remarks', headerName: `${systemLanguage === "hi" ? "लेन-देन टिप्पणी" : systemLanguage === "mr" ? "लेन-देन टिप्पणी" : "Transaction Remarks"}`, width: 200, sortable: true },


    ];

    return (
        <div id={`${collapsed ? 'heroSection' : 'hero'}`} className="hero">
            {
                CcidBox ?
                    <div className='compSection'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="alertBox">
                                <Close style={{ fill: 'red', alignSelf: 'flex-end' }} onClick={closeBoth} className='Hicon' />
                                <p className='p'>Your complaint has been successfully registered.<br /> Here is your complaint Number:</p>
                                <span >{complaintId}</span>
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

                            {progressBar ?
                                <div className='overlay' >
                                    <div className="prdiv">

                                        <BarLoader color="#061173" />
                                        <p style={{ color: 'green' }} className='p'>Processing please wait...</p>
                                    </div>

                                </div> : <></>
                            }

                            <StyledContainer style={{ minWidth: collapsed ? '84vw' : '', marginLeft: collapsed ? '-40px' : '', transition: '.4s ease' }} className='Bigcontainer' maxWidth="sm">

                                <Grid item sx={{ marginTop: '-16px' }}>

                                    <StyledButton onClick={SubmitForm} style={{ width: "auto" }} variant="contained" color="primary" className="button">
                                        <Save className="bell" />
                                        Save
                                    </StyledButton>
                                    <StyledButton disabled={!callerNumFound} onClick={PartialSaveData} style={{ width: "auto", border: '1px solid #d7d0d0', backgroundColor: "#1976d2", fontWeight: '500', fontFamily: 'system-ui' }} variant="contained" color="primary" >
                                        <BookmarkAdd className="bell" />
                                        Partial Save
                                    </StyledButton>


                                </Grid>
                                <Box ref={IncidentSectionErrorFree} onClick={resizeCaller} className="Chead" sx={{ textAlign: 'left', marginTop: '48px' }}>
                                    <StyledTypography variant="h4" component="h2">
                                        <StyledIcon />  {systemLanguage === "hi" ? "घटना / शिकायत पंजीकरण" : systemLanguage === "mr" ? "घटना / शिकायत पंजीकरण" : "Incident / Complaint Registration"} <span className='callerNumbHeading'>{callerNumber || formData.callerNumber}<Phone style={{ marginLeft: '4px', height: '14px', width: '14px' }} /> </span>
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
                                                        {systemLanguage === "hi" ? "कॉलर विवरण :" : systemLanguage === "mr" ? "कॉलर विवरण : " : "Caller Details : "}
                                                    </Typography>

                                                </Grid>
                                                <Grid ref={callernumref} item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        error={!!errors.callerNumber}
                                                        helperText={errors.callerNumber}
                                                        InputLabelProps={{
                                                            required: true,
                                                            classes: {
                                                                asterisk: 'custom-asterisk',
                                                            },
                                                        }}
                                                        onChange={handleInputChangeForAll} name="callerNumber" disabled={callerNumFound} className='input' value={callerNumber || formData.callerNumber} fullWidth label={systemLanguage === "hi" ? "कॉलर नंबर" : systemLanguage === "mr" ? "कॉलर नंबर" : "Caller Number"} variant="outlined" />
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
                                                        fullWidth
                                                        // label="Name of the Caller"

                                                        label={systemLanguage === "hi" ? "कॉलर का नाम" : systemLanguage === "mr" ? "कॉलर का नाम" : "Name of the Caller"}
                                                        variant="outlined" />
                                                </Grid>
                                                <Grid ref={callerGenderRef} item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth variant="outlined" error={!!errors.callerGender}>
                                                        <InputLabel htmlFor="Gender">{systemLanguage === "hi" ? "लिंग" : systemLanguage === "mr" ? "लिंग" : "Gender"}<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                        <Select name="callerGender" value={formData.callerGender} className='select'

                                                            // label="Gender"
                                                            label={systemLanguage === "hi" ? "लिंग" : systemLanguage === "mr" ? "लिंग" : "Gender"}

                                                            onChange={handleInputChangeForAll} id="incident-sub-type" required>
                                                            <MenuItem value="male">{systemLanguage === "hi" ? "पुरुष" : systemLanguage === "mr" ? "पुरुष" : "male"} </MenuItem>
                                                            <MenuItem value="female">{systemLanguage === "hi" ? "महिला" : systemLanguage === "mr" ? "महिला" : "female"}</MenuItem>
                                                            <MenuItem value="other">{systemLanguage === "hi" ? "अन्य" : systemLanguage === "mr" ? "अन्य" : "other"}</MenuItem>
                                                        </Select>
                                                        {errors.callerGender && (
                                                            <FormHelperText>{errors.callerGender}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField onChange={handleInputChangeForAll} name="callerAge" className='input' value={formData.callerAge} fullWidth label={systemLanguage === "hi" ? "उम्र" : systemLanguage === "mr" ? "उम्र" : "Age"} variant="outlined"
                                                        error={!!errors.callerAge}
                                                        helperText={errors.callerAge}
                                                    // 
                                                    />

                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12}>
                                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                                        {systemLanguage === "hi" ? "शिकायत विवरण :" : systemLanguage === "mr" ? "शिकायत विवरण : " : "Complaint Details :"}
                                                    </Typography>

                                                </Grid>





                                                <Grid ref={complaintCategoryRef} item xs={12} sm={6} md={4}>

                                                    <FormControl fullWidth variant="outlined" error={!!errors.complaintCategory}>
                                                        <InputLabel htmlFor="Ccategory"> {systemLanguage === "hi" ? "शिकायत श्रेणी" : systemLanguage === "mr" ? "शिकायत श्रेणी" : "Complaint Category"}     <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                                        </InputLabel>
                                                        <Select onChange={handleInputChangeForAll} value={formData.complaintCategory} name="complaintCategory" className='select' label={systemLanguage === "hi" ? "शिकायत श्रेणी" : systemLanguage === "mr" ? "शिकायत श्रेणी" : "Complaint Category"}  >
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
                                                        <InputLabel htmlFor="Cscategory">{systemLanguage === "hi" ? "शिकायत उप-श्रेणी" : systemLanguage === "mr" ? "शिकायत उप-श्रेणी" : "Complaint sub-category"}  <span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                        <Select onChange={handleInputChangeForAll} value={formData.complaintSubCategory} name="complaintSubCategory" className='select' label="complaint sub-category" required>
                                                            {
                                                                complaintSubCategoryArray.map((elm, index) => (
                                                                    <MenuItem onClick={() => fncToGetComplaintDesc(elm.sub_category_id, '')} key={index} value={elm.sub_category_id}>{elm.sub_category}</MenuItem>
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
                                                                <InputLabel htmlFor="Cdesc">{systemLanguage === "hi" ? "शिकायत विवरण" : systemLanguage === "mr" ? "शिकायत विवरण" : "Complaint Description"}<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                                <Select onChange={handleInputChangeForAll} value={formData.complaintDesc} name="complaintDesc" className='select' label="complaint Description" required>
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
                                                        <InputLabel htmlFor="Ccategory">{systemLanguage === "hi" ? "शिकायत स्रोत" : systemLanguage === "mr" ? "शिकायत स्रोत" : "Complaint Source"}<span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                                        </InputLabel>
                                                        <Select disabled={callerSourceFound} onChange={handleInputChangeForAll} value={formData.sourceOfComplaint} name="sourceOfComplaint" className='select' label="complaint Source     DD" >
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
                                                            {systemLanguage === "hi" ? "क्या कॉलर और पीड़ित एक ही हैं?" : systemLanguage === "mr" ? "क्या कॉलर और पीड़ित एक ही हैं?" : "Caller & victim are the same ?"}  <FormControlLabel
                                                                control={<Checkbox name="yes" checked={formData.samePerson} onChange={handleSamePersonCheckboxChange} />}
                                                                label=""
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
                                                        onChange={handleInputChangeForAll} name="victimName" disabled={formData.samePerson} className='input' value={formData.victimName} fullWidth


                                                        label={systemLanguage === "hi" ? "पीड़ित का नाम" : systemLanguage === "mr" ? "पीड़ित का नाम" : "Name of the Victim"}

                                                        variant="outlined" />
                                                </Grid>

                                                <Grid ref={victimGenderRef} item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth variant="outlined" error={!!errors.victimGender}>
                                                        <InputLabel htmlFor="Gender"> {systemLanguage === "hi" ? "लिंग " : systemLanguage === "mr" ? "लिंग " : "Gender "}<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                        <Select name="victimGender" value={formData.victimGender} disabled={formData.samePerson} className='select' label="Gender" onChange={handleInputChangeForAll} required>

                                                            <MenuItem value="male">male</MenuItem>
                                                            <MenuItem value="female">female</MenuItem>
                                                            <MenuItem value="other">other</MenuItem>

                                                        </Select>
                                                        {errors.victimGender && (
                                                            <FormHelperText>{errors.victimGender}</FormHelperText>
                                                        )}
                                                    </FormControl>


                                                    {/* <TextField onChange={handleInputChangeForAll} name="victimGender" disabled={formData.samePerson} className='input' value={formData.victimGender} fullWidth label="Gender" variant="outlined"  /> */}
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        onChange={handleInputChangeForAll} inputProps={{



                                                        }}

                                                        error={!!errors.victimAge}
                                                        helperText={errors.victimAge}
                                                        name="victimAge" disabled={formData.samePerson} className='input' value={formData.victimAge} fullWidth label={systemLanguage === "hi" ? "उम्र" : systemLanguage === "mr" ? "उम्र" : "Age"} variant="outlined" />
                                                </Grid>
                                                <Grid ref={VictimNumRef} item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        error={!!errors.VictimNum}
                                                        helperText={errors.VictimNum}
                                                        disabled={formData.samePerson}




                                                        InputLabelProps={{
                                                            required: true,
                                                            classes: {
                                                                asterisk: 'custom-asterisk',
                                                            },
                                                        }} onChange={handleInputChangeForAll} name="VictimNum" value={formData.VictimNum} className='input' fullWidth


                                                        label={systemLanguage === "hi" ? "पीड़ित का संपर्क नंबर" : systemLanguage === "mr" ? "पीड़ित का संपर्क नंबर" : "Contact Number Of victim"}


                                                        variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField

                                                        error={!!errors.VictimaltNum}
                                                        helperText={errors.VictimaltNum}
                                                        onChange={handleInputChangeForAll} name="VictimaltNum" className='input' value={formData.VictimaltNum} fullWidth
                                                        label={systemLanguage === "hi" ? "वैकल्पिक नंबर (यदि कोई हो)" : systemLanguage === "mr" ? "वैकल्पिक नंबर (यदि कोई हो)" : "Alternative Number if any"}
                                                        variant="outlined" />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        error={!!errors.email}
                                                        helperText={errors.email}
                                                        // InputLabelProps={{
                                                        //     required: true,
                                                        //     classes: {
                                                        //         asterisk: 'custom-asterisk',
                                                        //     },
                                                        // }} 

                                                        onChange={handleInputChangeForAll} name="email" className='input' value={formData.email} fullWidth
                                                        label={systemLanguage === "hi" ? "ईमेल आईडी" : systemLanguage === "mr" ? "ईमेल आईडी" : "Email Id"}
                                                        variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12}>
                                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                                        {systemLanguage === "hi" ? "पता विवरण :" : systemLanguage === "mr" ? "पता विवरण :" : "Address Details :"}
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
                                                        }} onChange={handleInputChangeForAll} name="addressLine1" className='input' value={formData.addressLine1} fullWidth label={systemLanguage === "hi" ? "पता लाइन 1" : systemLanguage === "mr" ? "पता लाइन 1" : "Address Line 1"} variant="outlined" />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <TextField onChange={handleInputChangeForAll} name="addressLine2" className='input' value={formData.addressLine2} fullWidth label={systemLanguage === "hi" ? "पता लाइन 2" : systemLanguage === "mr" ? "पता लाइन 2" : "Address Line 2"}
                                                        variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField onChange={handleInputChangeForAll} name="landmark" className='input' value={formData.landmark} fullWidth label={systemLanguage === "hi" ? "लैंडमार्क" : systemLanguage === "mr" ? "लैंडमार्क" : "Landmark"}
                                                        variant="outlined" />
                                                </Grid>

                                                <Grid ref={stateRef} item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth variant="outlined" error={!!errors.state}>
                                                        <InputLabel htmlFor="state">{systemLanguage === "hi" ? "राज्य" : systemLanguage === "mr" ? "राज्य" : "State"} <span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                        <Select
                                                            onChange={handleInputChangeForAll}
                                                            value={formData.state}
                                                            name="state"
                                                            className='select'
                                                            label="State"

                                                        >
                                                            {
                                                                statesList.map((elm, index) => (
                                                                    <MenuItem
                                                                        // onClick={() => fncToGetDistricts(elm.state_code)}
                                                                        key={index}
                                                                        value={elm.state_code}
                                                                    >
                                                                        {elm.state_name}
                                                                    </MenuItem>
                                                                ))
                                                            }
                                                        </Select>

                                                        {errors.state && (
                                                            <FormHelperText>{errors.state}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>


                                                {!StateIsMaharastra ? (<></>) :

                                                    <>

                                                        <Grid ref={nearestPoliceStationRef} item xs={12} sm={6} md={4}>
                                                            <FormControl fullWidth variant="outlined" error={!!errors.nearestPoliceStation}>
                                                                {/* Autocomplete for the police station selection */}
                                                                <Autocomplete
                                                                    className='select'
                                                                    options={PolicStationList}
                                                                    getOptionLabel={(option) => option.police_station_name} // Display the police station name
                                                                    value={PolicStationList.find(option => option.police_station_code === formData.nearestPoliceStation) || null} // Set the selected value
                                                                    onChange={(event, newValue) => {
                                                                        handleInputChangeForAll({ target: { name: 'nearestPoliceStation', value: newValue ? newValue.police_station_code : '' } });
                                                                        if (newValue) {
                                                                            fncToGetDistrict(newValue.police_station_code);
                                                                        }
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            {...params}
                                                                            label={systemLanguage === "hi" ? "निकटतम पुलिस स्टेशन" : systemLanguage === "mr" ? "निकटतम पुलिस स्टेशन" : "Nearest Police station"}
                                                                            variant="outlined"
                                                                            error={!!errors.nearestPoliceStation}
                                                                            InputLabelProps={{

                                                                                required: true,
                                                                                classes: {
                                                                                    asterisk: 'custom-asterisk',
                                                                                },
                                                                            }}

                                                                        />
                                                                    )}
                                                                    renderOption={(props, option) => (
                                                                        <li {...props} key={option.police_station_code}>
                                                                            {option.police_station_name}
                                                                        </li>
                                                                    )}
                                                                />
                                                                {errors.nearestPoliceStation && (
                                                                    <FormHelperText>{errors.nearestPoliceStation}</FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>




                                                        <Grid ref={districtRef} item xs={12} sm={6} md={4}>
                                                            <FormControl fullWidth variant="outlined" error={!!errors.district}>
                                                                <InputLabel htmlFor="district">{systemLanguage === "hi" ? "जिला" : systemLanguage === "mr" ? "जिला" : "District"}<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                                <Select onChange={handleInputChangeForAll} value={formData.district} name="district" className='select' label="District" required>
                                                                    {
                                                                        DistrictList.map((elm, index) => (


                                                                            <MenuItem

                                                                                onClick={() => fncToGetPinCode(elm.district_code)}
                                                                                key={index}
                                                                                value={elm.district_code}  >{elm.district_name}</MenuItem>
                                                                        ))

                                                                    }
                                                                </Select>

                                                                {errors.district && (
                                                                    <FormHelperText>{errors.district}</FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>

                                                        <Grid style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }} item xs={12} sm={6} md={4}>
                                                            <FormControl style={{ display: 'block' }} component="fieldset">
                                                                <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                                                    {systemLanguage === "hi" ? "सूची में पिनकोड नहीं है? मैन्युअल रूप से दर्ज करें" : systemLanguage === "mr" ? "सूची में पिनकोड नहीं है? मैन्युअल रूप से दर्ज करें" : "Pincode not in the list? Enter manually"}

                                                                    <FormControlLabel
                                                                        style={{ margin: '0px 6px' }}
                                                                        control={
                                                                            <Checkbox
                                                                                name="pincode_flag"
                                                                                checked={formData.pincode_flag || false}
                                                                                onChange={handleInputChangeForAll}
                                                                            />
                                                                        }
                                                                    />

                                                                </Typography>
                                                            </FormControl>
                                                        </Grid>


                                                        {formData.pincode_flag ?

                                                            <Grid ref={pincodeRef} item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={handleInputChangeForAll}
                                                                    name="pincode"
                                                                    className='input'
                                                                    error={!!errors.pincode}
                                                                    helperText={errors.pincode}
                                                                    value={formData.pincode || null}
                                                                    fullWidth
                                                                    label={systemLanguage === "hi" ? "पिनकोड टाइप करें" : systemLanguage === "mr" ? "पिनकोड टाइप करें" : "Type Pincode"}
                                                                    variant="outlined"
                                                                    InputLabelProps={{
                                                                        required: true,
                                                                        classes: {
                                                                            asterisk: 'custom-asterisk',
                                                                        },
                                                                    }}

                                                                />
                                                            </Grid> :


                                                            <Grid ref={pincodeRef} item xs={12} sm={6} md={4}>
                                                                <FormControl fullWidth variant="outlined" error={!!errors.pincode}>

                                                                    <Autocomplete
                                                                        className='select'
                                                                        options={PinCodeList}
                                                                        getOptionLabel={(option) => option.toString()}
                                                                        value={formData.pincode || null}
                                                                        onChange={(event, newValue) => {
                                                                            // Update formData with the selected pincode
                                                                            handleInputChangeForAll({ target: { name: 'pincode', value: newValue || '' } });
                                                                        }}
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                {...params}
                                                                                label={systemLanguage === "hi" ? "पिनकोड" : systemLanguage === "mr" ? "पिनकोड" : "Pincode"}
                                                                                variant="outlined"

                                                                                error={!!errors.pincode}
                                                                                InputLabelProps={{

                                                                                    required: true,
                                                                                    classes: {
                                                                                        asterisk: 'custom-asterisk',
                                                                                    },
                                                                                }}

                                                                            />
                                                                        )}
                                                                    />
                                                                    {errors.pincode && (
                                                                        <FormHelperText>{errors.pincode}</FormHelperText>
                                                                    )}
                                                                </FormControl>
                                                            </Grid>


                                                        }
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

                                                    </>}
                                            </Grid>

                                        ) : <>

                                        </>
                                    }

                                </StyledBox>
                                <Box onClick={resizeMandatory} className="Chead" sx={{ textAlign: 'left' }}>
                                    <StyledTypography variant="h4" component="h2">
                                        <StyledIcon2 /> {systemLanguage === "hi" ? "अनिवार्य जानकारी" : systemLanguage === "mr" ? "अनिवार्य जानकारी" : "Mandatory Information"}
                                    </StyledTypography>
                                    {
                                        MandatoryTab ? (<Compress onClick={resizeMandatory} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizeMandatory} className='tabMngIcon' />)
                                    }
                                </Box>
                                <StyledBox >
                                    {

                                        MandatoryTab ? (


                                            <>

                                                <Grid className='tab' container spacing={4}>
                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <TextField
                                                            onChange={handleInputChangeForAll}
                                                            name="incidentDetails"
                                                            className="input"
                                                            value={formData.incidentDetails}
                                                            fullWidth
                                                            label={systemLanguage === "hi" ? "घटना का विवरण" : systemLanguage === "mr" ? "घटना का विवरण" : "Incident Details"}
                                                            variant="outlined"
                                                            multiline
                                                            rows={8}
                                                        />
                                                    </Grid>
                                                    {/* {lessCharError.no ? (<ErrorBox item xs={1} sm={12} md={12}>
                                                        {lessCharError.value} <Warning />
                                                    </ErrorBox>) : (<></>)


                                                    } */}
                                                    {/* <Grid ref={incidentDateRef} id="incidentDate" item xs={12} sm={6} md={4}>
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
                                                            type='date'
                                                            fullWidth
                                                            label="Incident Date and Time"
                                                            variant="outlined"
                                                            onChange={handleInputChangeForAll}
                                                            name='incidentDate'
                                                            value={formData.incidentDate}
                                                            inputProps={{
                                                                max: currentDate,
                                                            }}
                                                        />
                                                    </Grid> */}
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
                                                            type='date'
                                                            fullWidth
                                                            label={systemLanguage === "hi" ? "घटना की तिथि" : systemLanguage === "mr" ? "घटना की तिथि" : "Incident Date"}

                                                            variant="outlined"
                                                            onChange={handleInputChangeForAll}
                                                            name='incidentDate'
                                                            value={formData.incidentDate}
                                                            inputProps={{
                                                                max: currentDate,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={4}>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DesktopTimePicker
                                                                className="input"
                                                                label={systemLanguage === "hi" ? "घटना का समय" : systemLanguage === "mr" ? "घटना का समय" : "Incident Time"}
                                                                value={incidentTimeValue}
                                                                onChange={handleIncidentTimeChange}
                                                            // disableFuture
                                                            />
                                                        </LocalizationProvider>
                                                    </Grid>
                                                    {
                                                        !StateIsMaharastra ? <></> : <>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <FormControl fullWidth variant="outlined">
                                                                    <InputLabel htmlFor="identificationType">
                                                                        {systemLanguage === "hi" ? "पहचान का प्रकार" : systemLanguage === "mr" ? "पहचान का प्रकार" : "Identification Type"}</InputLabel>
                                                                    <Select className='select'
                                                                        name="identificationType"
                                                                        value={formData.identificationType}
                                                                        onChange={handleInputChangeForAll}
                                                                        label="Identification Type"
                                                                    >
                                                                        <MenuItem value=""><em>None</em></MenuItem>
                                                                        <MenuItem value="Aadhar">Aadhar Number</MenuItem>
                                                                        <MenuItem value="PanCard">PanCard Number</MenuItem>
                                                                        <MenuItem value="VoterId">Voter Id</MenuItem>
                                                                        <MenuItem value="Passport">Passport</MenuItem>
                                                                        <MenuItem value="DL">Driving License</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Grid>

                                                            <Grid ref={IdentificationIdRef} item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    className='input'
                                                                    error={!!errors.IdentificationId}
                                                                    helperText={errors.IdentificationId}
                                                                    onChange={handleInputChangeForAll}
                                                                    name="IdentificationId"
                                                                    value={formData.IdentificationId}
                                                                    fullWidth

                                                                    label={systemLanguage === "hi" ? "पहचान आईडी" : systemLanguage === "mr" ? "पहचान आईडी" : "Identification ID"} variant="outlined"
                                                                    InputLabelProps={{
                                                                        required: isIdentificationIdRequired,
                                                                        classes: {
                                                                            asterisk: 'custom-asterisk',
                                                                        },
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </>}
                                                    {/* <Grid item xs={12} sm={6} md={4}>
                                                        <TextField
                                                            // error={!!errors.IdentificationId}
                                                            // helperText={errors.IdentificationId}
                                                            // InputLabelProps={{
                                                            //     required: true,
                                                            //     classes: {
                                                            //         asterisk: 'custom-asterisk',
                                                            //     },
                                                            // }}
                                                            onChange={handleInputChangeForAll} name="IdentificationId" className='input' value={formData.IdentificationId} fullWidth label="Identification Id(e.g.,Voter Id,Aadhar Number, PanCard Number,Passport ,Driving License)" variant="outlined" />
                                                    </Grid> */}




                                                    {/* // if financial fraud */}




                                                    {
                                                        isFinancial ? (

                                                            <Grid item xs={12} sm={6} md={12}>
                                                                <FormControl style={{ display: 'block', visibility: 'hidden' }} component="fieldset">
                                                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '-18px', color: 'gray' }}>
                                                                        Have You Lost Money?  <FormControlLabel
                                                                            disabled={true} control={<Checkbox name="yes" checked={formData.LostMoneyState} onChange={handleLostMoneyChange} />}

                                                                        />
                                                                    </Typography>
                                                                </FormControl>
                                                            </Grid>

                                                        ) : <></>
                                                    }

                                                </Grid>


                                                {formData.LostMoneyState && (
                                                    < >
                                                        <Grid className='tab' container spacing={4}>

                                                            <Grid ref={transactionDetailsRef} style={{ borderBottom: '1px solid gray' }} item xs={12} sm={6} md={12}>
                                                                <Typography className='p2' component="legend" variant="body1" style={{ marginBottom: '10px', color: 'gray' }}>

                                                                    {systemLanguage === "hi" ? "लेन-देन का विवरण :" : systemLanguage === "mr" ? "लेन-देन का विवरण :" : "Transaction Details: "}
                                                                    {errors.transactionDetails && (
                                                                        <FormHelperText style={{ color: 'red', fontWeight: '600', fontFamily: 'system-ui' }} >{errors.transactionDetails}</FormHelperText>
                                                                    )}
                                                                </Typography>
                                                            </Grid>
                                                            <StyledBox style={{ width: '100%' }}>

                                                                <TableContainer
                                                                    className='tblCont'
                                                                    component={Paper}
                                                                    sx={{
                                                                        borderRadius: 1,
                                                                        height: 'auto',
                                                                        borderBottom: 0,
                                                                        marginBottom: '-40px',
                                                                        marginTop: '-15px',
                                                                    }}
                                                                >
                                                                    <DataGrid
                                                                        rows={formData.transactionDetails.map((transaction, index) => ({ id: index, ...transaction }))}
                                                                        columns={columns}
                                                                        pageSize={5}
                                                                        rowsPerPageOptions={[5, 10, 20]}
                                                                        style={{ height: '31vh', width: '98%' }}
                                                                        // checkboxSelection
                                                                        // disableSelectionOnClick
                                                                        sx={{
                                                                            '& .MuiDataGrid-root': {
                                                                                border: 'none', // Remove border
                                                                            },
                                                                            '& .MuiDataGrid-cell': {
                                                                                color: 'rgb(77, 74, 74)',
                                                                                fontWeight: '600',
                                                                                fontSize: '11.5px',
                                                                                fontFamily: 'Recursive, sans-serif',
                                                                            },
                                                                            '& .MuiDataGrid-columnHeaders': {

                                                                                color: 'white',
                                                                                fontWeight: 'bold',
                                                                                fontSize: '13px',
                                                                                fontFamily: 'Recursive, sans-serif',

                                                                            },
                                                                            '& .MuiDataGrid-footerContainer': {
                                                                                backgroundColor: '#f5f5f5', // Footer background color
                                                                            },

                                                                            '& .MuiSvgIcon-root': {
                                                                                color: '#d5b0b0', // Set icon color to white
                                                                            },
                                                                            '& .MuiDataGrid-row': {
                                                                                borderBottom: '1px solid #d0d0d0', // Custom row border-bottom color
                                                                            },
                                                                        }}
                                                                    />
                                                                </TableContainer>
                                                            </StyledBox>
                                                            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={12} sm={6} md={12} >
                                                                <TextField style={{ margin: '4px 20px' }} disabled={true} onChange={handleInputChangeForAll} name="TotalTransectionAmount" className='input' value={formData.TotalTransectionAmount}

                                                                    label=
                                                                    {systemLanguage === "hi" ? "कुल खोई हुई धन राशि ₹" : systemLanguage === "mr" ? "कुल खोई हुई धन राशि ₹" : "Total Amount Lost ₹"}
                                                                    variant="outlined" />
                                                            </Grid>
                                                            <Grid ref={EditTransactionRef} style={{ borderBottom: '1px solid gray' }} item xs={12} sm={6} md={12}>
                                                            </Grid>

                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <FormControl fullWidth variant="outlined" error={!!errors.transaction_complaint_desc}>
                                                                    <InputLabel htmlFor="Cdesc">
                                                                        {systemLanguage === "hi" ? "शिकायत विवरण" : systemLanguage === "mr" ? "शिकायत विवरण" : "Complaint Description"} <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                                                    </InputLabel>
                                                                    <Select
                                                                        onChange={(e) => handleTransactionChange(e)}
                                                                        value={TransactionObject.transaction_complaint_desc}
                                                                        name="transaction_complaint_desc"

                                                                        className={`select ${TransEditable ? 'input-animated' : ''}`}

                                                                        label={systemLanguage === "hi" ? "शिकायत विवरण" : systemLanguage === "mr" ? "शिकायत विवरण" : "Complaint Description"}

                                                                        required
                                                                    >
                                                                        {complaintComplaintDescArray.map((elm, idx) => (
                                                                            <MenuItem key={idx} value={elm.complaint_desc_id}>{elm.complaint_desc}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                    {errors.transaction_complaint_desc && (
                                                                        <FormHelperText>{errors.transaction_complaint_desc}</FormHelperText>
                                                                    )}
                                                                </FormControl>
                                                            </Grid>





                                                            {isCreditCard ? (
                                                                // If Credit Card is selected
                                                                <>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <TextField
                                                                            onChange={(e) => handleTransactionChange(e)}
                                                                            name="credit_first"
                                                                            className="input"
                                                                            value={TransactionObject.credit_first}
                                                                            fullWidth
                                                                            error={!!errors.credit_first}
                                                                            helperText={errors.credit_first}
                                                                            label=

                                                                            {systemLanguage === "hi" ? "कार्ड के पहले 6 अंक" : systemLanguage === "mr" ? "कार्ड के पहले 6 अंक" : "First 6 digit Card Number"}
                                                                            variant="outlined"
                                                                            inputProps={{

                                                                                maxLength: 6,
                                                                            }}

                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <TextField
                                                                            onChange={(e) => handleTransactionChange(e)}
                                                                            name="credit_last"
                                                                            className="input"
                                                                            value={TransactionObject.credit_last}
                                                                            fullWidth
                                                                            error={!!errors.credit_last}
                                                                            helperText={errors.credit_last}
                                                                            label=
                                                                            {systemLanguage === "hi" ? "कार्ड के अंतिम 4 अंक" : systemLanguage === "mr" ? "कार्ड के अंतिम 4 अंक" : "Last 4 digit Card Number"}
                                                                            variant="outlined"
                                                                            inputProps={{

                                                                                maxLength: 4,


                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </>
                                                            ) : (
                                                                // Default case when neither UPI nor Credit Card is selected
                                                                <>
                                                                    <Grid item xs={12} sm={6} md={4}>

                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}></Grid>


                                                                </>
                                                            )
                                                            }

                                                            {
                                                                TransactionObject.other_bank ? <Grid item xs={12} sm={6} md={4}>
                                                                    <TextField
                                                                        onChange={(e) => handleTransactionChange(e)}
                                                                        name="bank_name"
                                                                        className={`input ${TransEditable ? 'input-animated' : ''}`}
                                                                        error={!!errors.bank_name}
                                                                        helperText={errors.bank_name}
                                                                        value={TransactionObject.bank_name}
                                                                        fullWidth
                                                                        label=
                                                                        {systemLanguage === "hi" ? "बैंक का नाम" : systemLanguage === "mr" ? "बैंक का नाम" : "Bank Name"}
                                                                        variant="outlined"
                                                                        InputLabelProps={{
                                                                            required: true,
                                                                            classes: {
                                                                                asterisk: 'custom-asterisk',
                                                                            },
                                                                        }}

                                                                    />
                                                                </Grid>
                                                                    :

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormControl fullWidth variant="outlined" error={!!errors.bank_name}>
                                                                            {/* Autocomplete for the bank/wallet/merchant selection */}
                                                                            <Autocomplete
                                                                                className={`select ${TransEditable ? 'input-animated' : ''}`}
                                                                                options={BankList}
                                                                                getOptionLabel={(option) => option} // Assuming BankList contains strings
                                                                                value={TransactionObject.bank_name || null} // Set the selected value
                                                                                onChange={(event, newValue) => {
                                                                                    // Update the transaction with the selected bank_name
                                                                                    handleTransactionChange({ target: { name: 'bank_name', value: newValue || '' } });
                                                                                }}
                                                                                renderInput={(params) => (
                                                                                    <TextField
                                                                                        {...params}
                                                                                        label={systemLanguage === "hi" ? "बैंक/वॉलेट/व्यापारी का नाम" : systemLanguage === "mr" ? "बैंक/वॉलेट/व्यापारी का नाम" : "Name of the Bank/ Wallet/Merchant"}
                                                                                        variant="outlined"

                                                                                        error={!!errors.bank_name}
                                                                                        InputLabelProps={{

                                                                                            required: true,
                                                                                            classes: {
                                                                                                asterisk: 'custom-asterisk',
                                                                                            },
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            />
                                                                            {errors.bank_name && (
                                                                                <FormHelperText>{errors.bank_name}</FormHelperText>
                                                                            )}
                                                                        </FormControl>
                                                                    </Grid>
                                                            }



                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <FormControl style={{ display: 'block' }} component="fieldset">
                                                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                                                        <FormControlLabel
                                                                            style={{ margin: '0px 6px' }}
                                                                            control={
                                                                                <Checkbox
                                                                                    name="other_bank"
                                                                                    checked={TransactionObject.other_bank || false}
                                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                                />
                                                                            }
                                                                        />

                                                                        {systemLanguage === "hi" ? "कोई अन्य बैंक ?" : systemLanguage === "mr" ? "कोई अन्य बैंक ?" : "Other bank?"}
                                                                    </Typography>
                                                                </FormControl>
                                                            </Grid>


                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    InputLabelProps={{
                                                                        required: true,
                                                                        classes: {
                                                                            asterisk: 'custom-asterisk',
                                                                        },
                                                                    }}
                                                                    error={!!errors.transaction_amount}
                                                                    helperText={errors.transaction_amount}
                                                                    name="transaction_amount"
                                                                    className={`input ${TransEditable ? 'input-animated' : ''}`}

                                                                    fullWidth
                                                                    label=
                                                                    {systemLanguage === "hi" ? "लेन-देन राशि" : systemLanguage === "mr" ? "लेन-देन राशि" : "Transaction Amount"}
                                                                    variant="outlined"
                                                                    required
                                                                    value={TransactionObject.transaction_amount}
                                                                />
                                                            </Grid>


                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="account_no"
                                                                    className={`input ${TransEditable ? 'input-animated' : ''}`}
                                                                    error={!!errors.account_no}
                                                                    helperText={errors.account_no}
                                                                    value={TransactionObject.account_no}
                                                                    fullWidth
                                                                    label=
                                                                    {systemLanguage === "hi" ? "खाता नंबर/यूपीआई आईडी" : systemLanguage === "mr" ? "खाता नंबर/यूपीआई आईडी" : "Account Number/UPI ID."}
                                                                    variant="outlined"
                                                                    InputLabelProps={{
                                                                        required: isUpi,
                                                                        classes: {
                                                                            asterisk: 'custom-asterisk',
                                                                        },
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="transaction_id"
                                                                    className={`input ${TransEditable ? 'input-animated' : ''}`}
                                                                    error={!!errors.transaction_id}
                                                                    helperText={errors.transaction_id}
                                                                    value={TransactionObject.transaction_id}
                                                                    fullWidth
                                                                    label=

                                                                    {systemLanguage === "hi" ? "12-अंकीय लेन-देन आईडी/यूटीआर नंबर" : systemLanguage === "mr" ? "12-अंकीय लेन-देन आईडी/यूटीआर नंबर" : "12-digit Transaction id/UTR No."}

                                                                    variant="outlined"
                                                                    InputLabelProps={{
                                                                        required: !isCreditCard,
                                                                        classes: {
                                                                            asterisk: 'custom-asterisk',
                                                                        },
                                                                    }}
                                                                    inputProps={{

                                                                        maxLength: 12,


                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid id='transDate' item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    error={!!errors.transaction_date}
                                                                    helperText={errors.transaction_date}
                                                                    InputLabelProps={{
                                                                        required: true,
                                                                        shrink: true,
                                                                        classes: {
                                                                            asterisk: 'custom-asterisk',
                                                                        },
                                                                    }}
                                                                    name="transaction_date"
                                                                    type='date'
                                                                    fullWidth
                                                                    label={systemLanguage === "hi" ? "लेन-देन की तिथि" : systemLanguage === "mr" ? "लेन-देन की तिथि" : "Date of Transaction"}

                                                                    variant="outlined"
                                                                    className={`input ${TransEditable ? 'input-animated' : ''}`}
                                                                    required
                                                                    inputProps={{
                                                                        max: currentDate,
                                                                    }}
                                                                    value={TransactionObject.transaction_date}
                                                                />
                                                            </Grid>

                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    <DesktopTimePicker
                                                                        className="input"
                                                                        label={systemLanguage === "hi" ? "लेन-देन की समय" : systemLanguage === "mr" ? "लेन-देन की समय" : "Transaction Time"}

                                                                        value={transaction_timeValue}
                                                                        onChange={handletransaction_timeChange}
                                                                    // disableFuture
                                                                    />
                                                                </LocalizationProvider>
                                                            </Grid>

                                                            {/* //NEW FIELDS ------------------------  */}
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="ref_no"
                                                                    error={!!errors.ref_no}
                                                                    helperText={errors.ref_no}
                                                                    className="input"
                                                                    value={TransactionObject.ref_no}
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        required: isCreditCard,

                                                                        classes: {
                                                                            asterisk: 'custom-asterisk',
                                                                        },
                                                                    }}

                                                                    label={systemLanguage === "hi" ? "संदर्भ संख्या" : systemLanguage === "mr" ? "संदर्भ संख्या" : "Reference Number"}
                                                                    variant="outlined"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    error={!!errors.payment_gateway}
                                                                    helperText={errors.payment_gateway}
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="payment_gateway"
                                                                    className="input"
                                                                    value={TransactionObject.payment_gateway}
                                                                    fullWidth

                                                                    label={systemLanguage === "hi" ? "पेमेंट गेटवे विवरण" : systemLanguage === "mr" ? "पेमेंट गेटवे विवरण" : "Payment Gateway Details"}
                                                                    variant="outlined"
                                                                />
                                                            </Grid>
                                                            {/* <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="background_info"
                                                                    className="input"
                                                                    value={TransactionObject.background_info}
                                                                    fullWidth
                                                                    label="Back Ground Info."
                                                                    variant="outlined"
                                                                />
                                                            </Grid> */}
                                                            {/* <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="office_profile_medium"
                                                                    className="input"
                                                                    value={TransactionObject.office_profile_medium}
                                                                    fullWidth
                                                                    label="Offence Profile Medium"
                                                                    variant="outlined"
                                                                />
                                                            </Grid> */}

                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="affected_system_details"
                                                                    className="input"
                                                                    value={TransactionObject.affected_system_details}
                                                                    fullWidth
                                                                    label=
                                                                    {systemLanguage === "hi" ? "प्रभावित प्रणाली का विवरण" : systemLanguage === "mr" ? "प्रभावित प्रणाली का विवरण" : "Affected System Details"}
                                                                    variant="outlined"
                                                                />
                                                            </Grid>
                                                            {/* <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="accused_contact_info"
                                                                    className="input"
                                                                    value={TransactionObject.accused_contact_info}
                                                                    fullWidth
                                                                    label="Accused Contact INFO."
                                                                    variant="outlined"
                                                                />
                                                            </Grid> */}
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    error={!!errors.merchant_info}
                                                                    helperText={errors.merchant_info}
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="merchant_info"
                                                                    className="input"
                                                                    value={TransactionObject.merchant_info}
                                                                    fullWidth

                                                                    label=
                                                                    {systemLanguage === "hi" ? "व्यापारी विवरण" : systemLanguage === "mr" ? "व्यापारी विवरण" : "Merchant Info"}
                                                                    variant="outlined"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="proof_of_owner_ship"
                                                                    className="input"
                                                                    value={TransactionObject.proof_of_owner_ship}
                                                                    fullWidth

                                                                    label=
                                                                    {systemLanguage === "hi" ? "स्वामित्व का प्रमाण" : systemLanguage === "mr" ? "स्वामित्व का प्रमाण" : "Proof Of Ownership"}
                                                                    variant="outlined"

                                                                />
                                                            </Grid>

                                                            {/* <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="block_amount"
                                                                    className='input'
                                                                    value={TransactionObject.block_amount}
                                                                    fullWidth
                                                                    label="Bank Blocked Amount"
                                                                    variant="outlined"


                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}

                                                                    InputLabelProps={{

                                                                        shrink: true,

                                                                    }}
                                                                    name="block_date"
                                                                    type='date'
                                                                    fullWidth
                                                                    label="Blocked Date"
                                                                    variant="outlined"


                                                                />
                                                            </Grid>

                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="nccprc_no"
                                                                    className='input'
                                                                    value={TransactionObject.nccprc_no}
                                                                    fullWidth
                                                                    label="NCCPR Number"
                                                                    variant="outlined"
                                                                />
                                                            </Grid> */}
                                                            <Grid item xs={12} sm={6} md={6}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="transaction_remarks"
                                                                    className='input'
                                                                    value={TransactionObject.transaction_remarks}
                                                                    fullWidth


                                                                    label=
                                                                    {systemLanguage === "hi" ? "बैंक द्वारा अवरुद्ध राशि" : systemLanguage === "mr" ? "बैंक द्वारा अवरुद्ध राशि" : "Transaction Remarks"}
                                                                    variant="outlined"
                                                                // multiline
                                                                // rows={2}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={12}>
                                                                {

                                                                    isTransactionAdded ?

                                                                        <span style={{ display: 'flex', width: '100%', justifyContent: 'center', fontSize: '12px', transition: '3s ease', color: 'green', alignItems: 'center', margin: "10px" }}>Transaction Saved successfully <AddTask style={{ fill: 'blue', margin: '0px 5px', width: '20px', height: '20px' }} /></span>

                                                                        : <></>



                                                                }
                                                                <StyledButton onClick={addTransaction} style={{ width: "auto", display: 'flex', alignSelf: 'flex-end', margin: '0px' }} variant="contained" color="primary" className="button">
                                                                    <Label className="bell" />
                                                                    Add
                                                                </StyledButton>
                                                            </Grid>

                                                        </Grid>


                                                        {/* //table code ----------------------------- */}






                                                        {/* Add Transaction Button */}





                                                    </>

                                                )}





                                            </>

                                        ) : <></>

                                    }
                                </StyledBox>



                                {/* //3rd option feilds  */}
                                <Box ref={SuspectSectionErrorFree} onClick={resizeOptional} className="Chead" sx={{ textAlign: 'left' }}>
                                    <StyledTypography variant="h4" component="h2">
                                        <StyledIcon3 />{systemLanguage === "hi" ? "वैकल्पिक विवरण" : systemLanguage === "mr" ? "वैकल्पिक विवरण" : "Optional Details"}
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
                                                    <TextField onChange={handleInputChangeForAll} name="suspectedWebsite" className='input' value={formData.suspectedWebsite} fullWidth
                                                        label={systemLanguage === "hi" ? "संदिग्ध वेबसाइट यूआरएल/सोशल मीडिया हैंडल" : systemLanguage === "mr" ? "संदिग्ध वेबसाइट यूआरएल/सोशल मीडिया हैंडल" : "suspected Website Urls/Social Media handles"}


                                                        variant="outlined" />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12}>
                                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>

                                                        {systemLanguage === "hi" ? "संदिग्ध का विवरण (यदि उपलब्ध हो) :" : systemLanguage === "mr" ? "संदिग्ध का विवरण (यदि उपलब्ध हो) :" : "Suspect's Details (if available) :"}

                                                    </Typography>

                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <TextField
                                                        error={!!errors.suspect_name} helperText={errors.suspect_name}
                                                        onChange={handleInputChangeForAll} name="suspect_name" className='input' value={formData.suspect_name} fullWidth

                                                        label={systemLanguage === "hi" ? "संदिग्ध का नाम" : systemLanguage === "mr" ? "संदिग्ध का नाम" : "Suspect Name"}

                                                        variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={3}>
                                                    <TextField inputProps={{



                                                    }}
                                                        error={!!errors.suspectedMobileNum} helperText={errors.suspectedMobileNum}

                                                        onChange={handleInputChangeForAll} name="suspectedMobileNum" className='input' value={formData.suspectedMobileNum} fullWidth

                                                        label={systemLanguage === "hi" ? "मोबाइल नंबर" : systemLanguage === "mr" ? "मोबाइल नंबर" : "Mobile Number"}
                                                        variant="outlined" />
                                                </Grid>



                                                {/* //if both are same--  */}
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <TextField onChange={handleInputChangeForAll} error={!!errors.suspectedEmail} helperText={errors.suspectedEmail} name="suspectedEmail" className='input' value={formData.suspectedEmail} fullWidth

                                                        label={systemLanguage === "hi" ? "ईमेल आईडी" : systemLanguage === "mr" ? "ईमेल आईडी" : "Email Id"}
                                                        variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={3}>
                                                    <TextField onChange={handleInputChangeForAll}
                                                        error={!!errors.suspectedBankAccNum} helperText={errors.suspectedBankAccNum}
                                                        name="suspectedBankAccNum" className='input' value={formData.suspectedBankAccNum} fullWidth
                                                        label={systemLanguage === "hi" ? "बैंक खाता नंबर या यूपीआई आईडी" : systemLanguage === "mr" ? "बैंक खाता नंबर या यूपीआई आईडी" : "Bank Account Number Or UPI Id"}

                                                        variant="outlined" />
                                                </Grid>

                                                {/* //suspect_remarks  */}

                                                <Grid item xs={12} sm={12} md={6}>
                                                    <TextField
                                                        onChange={handleInputChangeForAll}

                                                        className="input"
                                                        value={formData.suspectedAddress}
                                                        fullWidth

                                                        label={systemLanguage === "hi" ? "पता" : systemLanguage === "mr" ? "पता" : "Address"}

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
                                                        value={formData.suspect_remarks}
                                                        fullWidth
                                                        label={systemLanguage === "hi" ? "संदिग्ध टिप्पणी" : systemLanguage === "mr" ? "संदिग्ध टिप्पणी" : "Suspect Remarks"}
                                                        name='suspect_remarks'
                                                        variant="outlined"
                                                        multiline
                                                        rows={2}
                                                    />
                                                </Grid>
                                            </Grid>

                                        ) : <> </>

                                    }

                                </StyledBox>

                                <Grid style={{ paddingBottom: '25px' }} item xs={12}   >

                                    <StyledButton onClick={SubmitForm} style={{ width: "auto", marginBottom: '22px' }} variant="contained" color="primary" className="button">
                                        <Save className="bell" />
                                        Save
                                    </StyledButton>
                                    <StyledButton disabled={!callerNumFound} onClick={PartialSaveData} style={{ width: "auto", border: '1px solid #d7d0d0', backgroundColor: "#1976d2", fontWeight: '500', fontFamily: 'system-ui' }} variant="contained" color="primary" >
                                        <BookmarkAdd className="bell" />
                                        Partial Save
                                    </StyledButton>


                                </Grid>

                            </StyledContainer >
                        </div >

            }
        </div >
    );
};

export default NewComplaint;
