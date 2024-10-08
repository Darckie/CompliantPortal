import React from 'react';
import '../css/complaint.css';
import {
    Container, Autocomplete, Paper, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Button, Box, FormControlLabel, Checkbox, FormHelperText, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';

import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { Tty, Warning, ContactEmergencyRounded, PlusOne, Remove, ContactPage, ExpandOutlined, Compress, Save, Close, AppRegistration, CallMadeSharp, Phone, PendingActions, SecurityUpdate, ChevronLeft, FirstPage, WorkHistoryOutlined, Label, EditNote, Delete, Sms, Email, Bookmark, AddTask, WorkspacePremiumSharp, Warehouse, Refresh } from '@mui/icons-material';
import { useRef, useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useSidebar } from '../components/SidebarContext';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbarContainer } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';


//css -------------------------------------

const StyledContainer = styled(Container)({
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    minWidth: '75vw',
    flexDirection: 'column',
    fontFamily: 'system-ui',
    background: 'white',
    marginTop: '30px',
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
        color: 'rgb(211, 47, 47)',
        background: 'white !important',
        margin: '0px !important',
    },
    '&  .Mui-disabled': {
        opacity: '1',
        background: 'rgb(255 249 246)!important',
        backgroundColor: 'rgb(255 249 246) !important',
        cursor: 'not-allowed !important'
    },
    '&.css-qiwgdb.Mui-disabled': {
        // background: '#f3eae6 !important',
        cursor: 'not-allowed !important'

    }
    ,
    '& .css-1bn53lx.Mui-disabled': {
        // background: '#f3eae6 !important',
        cursor: 'not-allowed !important'
    },
    '& .css-15kq27i.Mui-disabled': {
        // background: '#f3eae6 !important',
        cursor: 'not-allowed !important'
    },
    '& .css-segi59.Mui-disabled': {
        // background: '#f3eae6 !important',
        cursor: 'not-allowed !important'
    }

});

const ModalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

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
const StyledIcon7 = styled(Sms)({
    marginRight: '0.5rem',
    marginTop: '-0.25rem',
    height: '1.5rem !important',
    width: '1.5rem !important',
    color: 'rgb(36 36 37)',
});
const StyledIcon8 = styled(Email)({
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


const StyledIcon10 = styled(Warehouse)({
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


const CustomHeader = ({ allSelected, onSelectAll, onDeselectAll }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                Transactions
            </Typography>
            <IconButton onClick={onSelectAll} disabled={allSelected}>
                <SelectAll />
            </IconButton>
            <IconButton onClick={onDeselectAll} disabled={!allSelected}>
                <DeselectAll />
            </IconButton>
        </Box>
    );
};

//css -------------------------------------
const TrackDash = ({ formdata, incidentXTime }) => {
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
        setStateList
    } = useSidebar();
    const [rows, setRows] = useState([]);

    const [selectedRows, setSelectedRows] = useState([]);
    // const [TransArraySaved, setTransArraySaved] = useState([]);

    const [open, setOpen] = useState(false);
    const [nccprNo, setNccprNo] = useState('');
    const [nccrpStatus, setnccrpStatus] = useState('');
    const [nccrpRemarks, setnccrpRemarks] = useState('');
    const [newStatusX, setnewStatusX] = useState('');

    const columns = [
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            sortable: false,
            renderCell: (params) => {
                const isDisabled = params.row.nccprGiven;

                return (
                    <>
                        <span
                            onClick={() => handleEditTransaction(params.id)}
                        // style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
                        >
                            <EditNote
                                style={{
                                    fill: 'blue',
                                    cursor: 'pointer',
                                    marginRight: '8px'
                                }}
                            />
                        </span>
                        <span
                            onClick={() => !isDisabled && handleDeleteTransaction(params.id)}
                            style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
                        >
                            <Delete
                                style={{
                                    fill: isDisabled ? 'lightgray' : 'red',
                                    cursor: isDisabled ? 'not-allowed' : 'pointer'
                                }}
                            />
                        </span>
                    </>
                );
            },
        },
        {
            field: 'transaction_complaint_descname', headerName: 'Complaint Description', width: 230, sortable: true,
            renderCell: (params) => (
                <span
                    style={{ color: "black", fontWeight: 'bold' }}
                >
                    {params.value}
                </span>
            )
        },
        { field: 'transaction_amount', headerName: 'Transaction Amount', width: 140, sortable: true },
        { field: 'block_amount', headerName: 'Bank Blocked Amount', width: 170, sortable: true },
        { field: 'transaction_date', headerName: 'Date of Transaction', width: 150, sortable: true },

        { field: 'bank_name', headerName: 'Bank Name', width: 200, sortable: true },
        {
            field: 'nccprc_no', headerName: 'NCCRP No', width: 140, sortable: true,
            renderCell: (params) => (
                <span
                    style={{ color: "#19b1ed", fontWeight: 'bold' }}
                >
                    {params.value}
                </span>
            )



        },
        { field: 'nccrp_status', headerName: 'Status', width: 170, sortable: true },
        { field: 'nccrp_remark', headerName: 'NCCRP Remarks', width: 190, sortable: true },
        { field: 'transaction_id', headerName: 'Transaction ID', width: 190, sortable: true },
        { field: 'account_no', headerName: 'Account Number/Upi ID', width: 200, sortable: true },
        { field: 'transaction_remarks', headerName: 'Transaction Remarks', width: 160, sortable: true },
        { field: 'block_date', headerName: 'Block Date', width: 160, sortable: true },
        { field: 'action_user', headerName: 'Updated By', width: 160, sortable: true },
    ];

    // Current date and time in IST
    const currentDate = new Date().toISOString().slice(0, 10);
    // const [callerNumFound, setcallerNumFound] = useState(false);
    //useref---------------------------------
    const complaintCategoryRef = useRef(null);

    const [AllNccrpState, setAllNccrpState] = useState(false);
    const [AllHasNccrp, setAllHasNccrp] = useState(false);
    const sourceOfComplaintRef = useRef(null);
    const complaintSubCategoryRef = useRef(null);
    const callerNameRef = useRef(null);
    const victimNameRef = useRef(null);
    const complaintDescRef = useRef(null);
    const callerGenderRef = useRef(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isTransactionAdded, setisTransactionAdded] = useState(false);
    const [compDescListCame, setcompDescListCame] = useState(false);
    const [PoliceStationFetched, setPoliceStationFetched] = useState(false);
    const callerAgeRef = useRef(null);
    const victimGenderRef = useRef(null);
    const [statusIsNccrp, setstatusIsNccrp] = useState(false);
    const victimAgeRef = useRef(null);
    const VictimNumRef = useRef(null);
    const addressLine1Ref = useRef(null);
    const districtRef = useRef(null);
    const acknowledgementNumRef = useRef(null);
    const EditTransactionRef = useRef(null);
    const stateRef = useRef(null);
    const callernumref = useRef(null);
    const [ackNumGiven, setackNumGiven] = useState(false);
    const IdentificationIdRef = useRef(null);
    const transactionDetailsRef = useRef(null);
    const [TransEditable, setTransEditable] = useState(false);
    const [TransEditable2, setTransEditable2] = useState(false);
    const [AcknowledgeTab, setAcknowledgeTab] = useState(false);
    const [statusTab, setstatusTab] = useState(false);
    const [updateHistoryTab, setupdateHistoryTab] = useState(false);
    const [editOn, seteditOn] = useState(false);



    const [nccrpChecker, setnccrpChecker] = useState(false);
    const pincodeRef = useRef(null);
    const nearestPoliceStationRef = useRef(null);
    const incidentDateRef = useRef(null);
    //use state to set value of the check box
    const [box2, setbox2] = useState(false);
    const [lessCharError, setError] = useState({
        value: '',
        no: false
    });

    const [StateIsMaharastra, setStateIsMaharastra] = useState(true);
    const [HistoryList, setHistoryList] = useState([]);
    const [WMSList, setWMSList] = useState([]);

    const [PinCodeList, setPinCodeList] = useState([]);
    const [isCreditCard, setisCreditCard] = useState(false);
    const [isUpi, setisUpi] = useState(false);

    const [complaintId, setcomplaintId] = useState('');
    const [isIdentificationIdRequired, setIsIdentificationIdRequired] = useState(false);
    const [callerTab, setCallerTab] = useState(true);
    const [MandatoryTab, setMandatoryTab] = useState(false);
    const [WMSTab, setWMSTab] = useState(false);

    const [OptionalTab, setOptionalTab] = useState(false);
    const [callerNumber, setCallerNumber] = useState('');


    const [EmailHistoryTab, setEmailHistoryTab] = useState(false);
    const [SmsHistoryTab, setSmsHistoryTab] = useState(false);
    const [errors, setErrors] = useState({});
    const [LoaderOn, setLoaderOn] = useState(false);
    const [isFinancial, setisFinancial] = useState(false);

    const [DisabledTransactionsFields, setDisabledTransactionsFields] = useState(false);

    const [CcidBox, setCcidBox] = useState(false);
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
        nccprGiven: false,
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
        blocked_remark: '',
        action_user: ClBox.agentId,
        nccrp_status: '',
        nccrp_remark: '',
        evidence_files: [],
        isupdating: false


    })
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
        state: '',
        pincode: '',
        nearestPoliceStation: '',
        districtCyberLab: '',
        //second label
        incidentDetails: '',
        LostMoneyState: false,
        remarks: '',

        incidentDate: '',
        incidentTime: '',
        IdentificationId: '',
        identificationType: '',
        samePerson: false,
        transactionDetails: [],
        TotalTransectionAmount: '',
        suspectedWebsite: '',
        suspectedBankAccNum: '',
        suspectedMobileNum: '',
        suspectedEmail: '',
        suspect_name: '',
        suspect_remarks: '',
        suspectedAddress: '',
        acknowledgement: '',
        acknowledgement2: '',
        acknowledgement3: '',
        acknowledgement4: '',
        TotalBlockedAmount: '',

        status_remarks: '',
        status: '',
        // });



        //GET URLS DATA 
    });

    const [incidentTimeValue, setIncidentTimeValue] = useState(
        formData.incidentTime ? dayjs(Number(formData.incidentTime)) : null
    );

    const [transaction_timeValue, settransaction_timeValue] = useState(
        TransactionObject.transaction_time ? dayjs(Number(TransactionObject.transaction_time)) : null
    );

    const [blockedTimeValue, setblockedTimeValue] = useState(
        TransactionObject.block_time ? dayjs(Number(TransactionObject.block_time)) : null
    );


    useEffect(() => {

        fncToGetComplaintCategory();
        fncToGetComplaintSource();
        fncToGetPoliceStations();
        fncToGetbank_names();
        fnctofetchStates();


    }, []);


    useEffect(() => {
        if (formdata) {
            // fncToGetUpdateHistory(formdata.complaintNumber);
        




            fncToGetSubComplaintCategory(formdata.complaintCategory);
            fncToGetComplaintDesc(formdata.complaintCategory, formdata.complaintSubCategory);
            fncToGetDistrict(formdata.nearestPoliceStation);
            fncToGetPinCode(formdata.district);
            // console.log("Updated formdata:", formdata);
            if (formdata && formdata.LostMoneyState && compDescListCame) {
                setisFinancial(true);

                fncToGetTransactionDetails(formdata.complaintNumber);
            } else {
                setisFinancial(false);
                // console.log("got the nccrpt numbers ", formdata.nccrpNo)
                setnccrpStatus(formdata.status);
                setNccprNo(formdata.nccrpNo);
            }


        }
        if (incidentXTime) {
            const [hours, minutes] = incidentXTime.split(':');
            const incidentTime = dayjs().hour(hours).minute(minutes);
            setIncidentTimeValue(incidentTime);


        }


        if (formdata.state !== 'MH') {

            setStateIsMaharastra(false);
        }

        // Optionally, handle other formdata changes here

        // console.log({ formdata });
        setFormData(prevState => ({
            ...prevState,
            ...formdata,
        }));
    }, [formdata, incidentXTime, compDescListCame]);

    const [allSelected, setAllSelected] = useState(false);
    const handleSelectionModelChange = (newSelection) => {
        setSelectedRows(newSelection.selectionModel || []);
        setAllSelected(newSelection.selectionModel.length === formData.transactionDetails.length);
    };

    const handleSelectAll = () => {
        const allRowIds = formData.transactionDetails.map((_, index) => index);
        setSelectedRows(allRowIds);
        setAllSelected(true);
    };

    const handleDeselectAll = () => {
        setSelectedRows([]);
        setAllSelected(false);
    };

    const openModal = () => {
        //LOGIC TO SET NCCRP ID ---------------------
        const selectedRow = rows.find(row => selectedRows.includes(row.id));
        // console.log(selectedRow);

        if (selectedRow) {
            setnccrpChecker(selectedRow.nccprGiven);
            // alert(selectedRow.nccrp_status);
            setNccprNo(selectedRow.nccprc_no);
            setnewStatusX(selectedRow.nccrp_status);
            // if (selectedRows.length === 1) {
            setnccrpRemarks(selectedRow.nccrp_remark)
            setnccrpStatus(selectedRow.nccrp_status);
            // }

        }
        // const updatedRows = rows.map((row) =>
        //     selectedRows.includes(row.id) ? { ...row, nccprc_no: nccprNo, nccrp_status: nccrpStatus, nccrp_remark: nccrpRemarks } : row
        // );


        const selectedComplaintDescs = rows.filter(row => selectedRows.includes(row.id)).map(row => row.transaction_complaint_desc);
        const uniqueComplaintDescs = [...new Set(selectedComplaintDescs)];
        if (uniqueComplaintDescs.length > 1) {
            alert("The complaint descriptions are not the same for all selected transactions.");
            return;
        }
        const complaintDesc = uniqueComplaintDescs[0] || '';
        // console.log('Selected complaint description:', complaintDesc);

        setErrors((prev) => ({
            ...prev,
            nccrpforfinance: "",
        }));
        setOpen(true);

        // setNccprNo(row.id)
    };

    const closeModal = () => setOpen(false);

    // const handleNccprChange = (event) => setNccprNo(event.target.value);

    // const handleSaveNccpr = () => {
    //     const updatedRows = rows.map(row =>
    //         selectedRows.includes(row.id) ? { ...row, nccprc_no: nccprNo } : row
    //     );
    //     setRows(updatedRows);
    //     setFormData(prev => ({
    //         ...prev,
    //         transactionDetails: updatedRows
    //     }));
    //     closeModal();
    //     console.log(updatedRows);
    // };
    const handleNccprChange = (event) => {
        setNccprNo(event.target.value);
        setnccrpStatus('registered_in_nccrp');
    };

    const handleStatusChange = (event) => {
        setnccrpStatus(event.target.value);
        if (event.target.value === 'registered_in_nccrp') {
            setackNumGiven(true);
        } else {
            setackNumGiven(false);
        }

    };

    const handleRemarksChange = (event) => setnccrpRemarks(event.target.value);

    const handleSaveNccpr = () => {
        if (!nccprNo && nccrpStatus == "registered_in_nccrp") {
            // alert(nccrpStatus);
            setErrors((prev) => ({
                ...prev,
                nccrpforfinance: "This field is required",
            }));
            return;
        } else {
            setErrors((prev) => ({
                ...prev,
                nccrpforfinance: "",
            }));
        }

        let complaintDesc = '';
        let updateState = false;
        if (newStatusX !== nccrpStatus) {
            updateState = true;

        } else {
            updateState = false;
            console.log(nccrpStatus ,"AND THE OTHER IS " ,newStatusX)
        }
        console.log(updateState);
      

        const selectedRow = rows.find(row => selectedRows.includes(row.id));
        if (selectedRow) {
            complaintDesc = selectedRow.transaction_complaint_descname;
        }
        const updatedRows = rows.map((row) =>
            selectedRows.includes(row.id) ? { ...row, nccprc_no: nccprNo, nccrp_status: nccrpStatus, nccrp_remark: nccrpRemarks, isupdating: updateState } : row
        );
        setRows(updatedRows);
        console.log(updatedRows);
        setFormData((prev) => ({
            ...prev,
            transactionDetails: updatedRows,
        }));
        //fnc to send nccrp details-

        // get distinct data first --------------------- 
        // let sourceName = '';
        // const selectedcallsource = complaintSourceArray.find(obj => obj.source_id === formData.sourceOfComplaint);
        // if (selectedcallsource) {
        //     sourceName = selectedcallsource.source_name;
        // }
        // fncTosendNccrpUpdateDetails(nccprNo, nccrpRemarks, nccrpStatus, sourceName, formData.complaintNumber, complaintDesc);

        // fncToGetNccrpHistory(formData.complaintNumber);
        setnccrpRemarks('');
        setnccrpStatus('');
        setNccprNo('');
        setnccrpChecker(false)
        closeModal();
        setnewStatusX('');


    };

    // const handleRowSelection = (rowId) => {
    //     setSelectedRows((prevSelectedRows) =>
    //         prevSelectedRows.includes(rowId)
    //             ? prevSelectedRows.filter((id) => id !== rowId)
    //             : [...prevSelectedRows, rowId]
    //     );
    // };

    const handleRowSelection = (rowIndex, rowNccprcNo) => {

        // console.log(rowNccprcNo);

        if (rowNccprcNo) {
            setSelectedRows((prevSelectedRows) => {
                // Get the matching rows' indices based on nccprc_no
                const matchingRows = formData.transactionDetails
                    .map((row, index) => ({ row, index }))  // Create an array of {row, index}
                    .filter(({ row }) => row.transaction_complaint_desc === rowNccprcNo)
                    .map(({ index }) => index);  // Get the indices of the matching rows

                // console.log("Matching rows indices:", matchingRows); // Log the correct indices

                const isAnyRowSelected = prevSelectedRows.some((index) => matchingRows.includes(index));

                // console.log("Row Index:", rowIndex);
                // console.log("Row NCCPRC Number:", rowNccprcNo);
                // console.log("Previously selected rows:", prevSelectedRows);
                // console.log("Is any row with the same NCCPRC number selected?", isAnyRowSelected);

                if (isAnyRowSelected) {
                    // console.log("Deselecting rows:", matchingRows);
                    return prevSelectedRows.filter((index) => !matchingRows.includes(index));
                } else {
                    // console.log("Selecting rows:", matchingRows);
                    return [...prevSelectedRows, ...matchingRows];
                }
            });
        } else {
            setSelectedRows((prevSelectedRows) =>
                prevSelectedRows.includes(rowIndex)
                    ? prevSelectedRows.filter((id) => id !== rowIndex)
                    : [...prevSelectedRows, rowIndex]
            );
        }

    };

    const CustomCheckbox = ({ id, transaction_complaint_desc }) => (

        <input
            type="checkbox"
            checked={selectedRows.includes(id)}
            onChange={() => handleRowSelection(id, transaction_complaint_desc)}
        />
    );



    const customColumns = [
        {
            field: 'select',
            headerName: '',
            width: 50,
            renderCell: (params) => {
                // const isDisabled = params.row.nccprGiven;

                return (
                    <CustomCheckbox
                        transaction_complaint_desc={params.row.transaction_complaint_desc}
                        id={params.row.id}
                    // disabled={isDisabled}
                    />
                );
            },
        },
        ...columns
    ];

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
                setcompDescListCame(true);
                setcomplaintComplaintDescArray(data.result);

            }
            else {
                console.log(data);
            }

        }).catch(err => {
            console.log(err);
        })


    }

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
                setPoliceStationFetched(true);
                setPolicStationList(data.result);


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
                    const transArray = data.result;
                    // setTransArraySaved(data.result);
                    const stx = transArray.every(obj => obj.nccprc_no);
                    setAllNccrpState(stx);
                    setAllHasNccrp(stx);
                    transArray.forEach(Trnasobj => {
                        const compDesc = complaintComplaintDescArray.find(obj => obj.complaint_desc_id == Trnasobj.transaction_complaint_desc);
                        const compDescName = compDesc.complaint_desc;
                        Trnasobj["nccprGiven"] = Trnasobj.nccprc_no ? true : false;
                        Trnasobj["transaction_complaint_descname"] = compDescName;
                        Trnasobj["isupdating"] = false;

                    })
                    setFormData(prevState => ({
                        ...prevState,
                        transactionDetails: transArray
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

    const fnctofetchStates = () => {
        //API CALL 1-

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

            if (data.success) {
                // console.log(data.result);
                setStateList(data.result);

            }
            else {
                console.log(data);
            }

        }).catch(err => {
            console.log(err);
        })


    }

    //TRANSECTION DETAILS---------------------------
    const handleTransactionChange = (event) => {
        const { name, value, checked, type } = event.target;
        if (name === 'transaction_complaint_desc') {
            if (value === '3') {
                setisCreditCard(true)
                setisUpi(false)
            } else if (value === '8' || value === '7') {
                setisUpi(true)
                setisCreditCard(false)
            }
            else {
                setisUpi(false)
                setisCreditCard(false)
            }
        }
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
        if (name === "block_amount") {
            if (!value) {
                setErrors((prev) => ({
                    ...prev,
                    block_amount: "",
                }));
            } else if (isNaN(value) || Number(value) <= 0) {

                setErrors((prev) => ({
                    ...prev,
                    block_amount: "Blocked amount must be greater than 0 and should be a valid number",
                }));
            } else if (!/^\d{1,48}(\.\d{1,2})?$/.test(value)) {

                setErrors((prev) => ({
                    ...prev,
                    block_amount: "Please enter a maximum of 50 digits, with up to 2 decimal places",
                }));
            } else {

                setErrors((prev) => ({
                    ...prev,
                    block_amount: "",
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


        if (checked === true) {
            setTransactionObject((prev) => ({
                ...prev,
                bank_name: ''

            }));
        }

        setTransactionObject((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value

        }));
    };




    const handleDeleteTransaction = (index) => {

        const userConfirmed = confirm("Delete Transaction. Confirm?");
        if (!userConfirmed) return;
        setFormData((prev) => {
            const updatedTransactions = prev.transactionDetails.filter((_, i) => i !== index);

            // Recalculate total lost money
            const totalLostMoney = updatedTransactions.reduce((acc, elem) => acc + parseFloat(elem.transaction_amount || 0, 10), 0);

            const totalblockedamount = updatedTransactions.reduce((acc, elem) => acc + parseFloat(elem.block_amount || 0, 10), 0);
            return {
                ...prev,
                transactionDetails: updatedTransactions,
                TotalTransectionAmount: totalLostMoney,
                TotalBlockedAmount: totalblockedamount
            };
        });
    };
    // Function to add a new transaction detail box
    const handleEditTransaction = (index) => {
        const transaction = formData.transactionDetails[index];

        // console.log(transaction);
        // console.log("and the transaction object is here ! -" , TransactionObject)


        if (transaction.nccprGiven) {
            const isallow = confirm("Only authorized to update 'Blocked details'. Please proceed.")
            if (!isallow) {
                return;
            }
            if (AllNccrpState) {
                setAllHasNccrp(false);
            }
            setDisabledTransactionsFields(true);
            seteditOn(true)
            setTransEditable2(true);
        } else {
            setDisabledTransactionsFields(false);
            setTransEditable(true);
        }

        EditTransactionRef.current.scrollIntoView({ behavior: 'smooth' });
        // can edit blocked date now

        setTimeout(() => {
            setTransEditable(false);
            setTransEditable2(false);
        }, 7000);
        setEditingIndex(index);


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

        const blockTime = transaction.block_time
            ? dayjs(transaction.block_time, 'HH:mm')
            : null;

        setblockedTimeValue(blockTime);
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

        if (TransactionObject.block_amount) {
            const value = TransactionObject.block_amount;
            if (!value) {
                setErrors((prev) => ({
                    ...prev,
                    block_amount: "",
                }));
            } else if (isNaN(value) || Number(value) <= 0) {

                setErrors((prev) => ({
                    ...prev,
                    block_amount: "Blocked amount must be greater than 0 and should be a valid number",
                }));
                transactionDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
                return;

            } else if (!/^\d{1,48}(\.\d{1,2})?$/.test(value)) {

                setErrors((prev) => ({
                    ...prev,
                    block_amount: "Please enter a maximum of 50 digits, with up to 2 decimal places",
                }));
            } else {

                setErrors((prev) => ({
                    ...prev,
                    block_amount: "",
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
            tempErrors.transaction_id = "Transaction ID must include 12 characters";
        }

        //validations 

        if (Object.keys(tempErrors).length > 0) {
            setErrors(tempErrors);
            return;
        } else {
            if (!TransactionObject.transaction_time) {
                const userConfirmed = confirm("No time specified. Continue?");
                if (!userConfirmed) return;
            }
            setisTransactionAdded(true)
            seteditOn(false);
            // console.log(AllNccrpState);
            // console.log(AllHasNccrp);
            if (AllNccrpState) {
                setAllHasNccrp(true);
                // alert("changed")
            }

            setDisabledTransactionsFields(false);

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

            const totalblockedamount = updatedTransactions.reduce((acc, elem) => acc + parseFloat(elem.block_amount || 0, 10), 0);
            return {
                ...prev,
                transactionDetails: updatedTransactions,
                TotalTransectionAmount: totalLostMoney,
                TotalBlockedAmount: totalblockedamount
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
            nccprGiven: false,
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
            blocked_remark: '',
            action_user: ClBox.agentId,
            nccrp_status: '',
            nccrp_remark: '',
            evidence_files: [],
            isupdating: false
        });
        settransaction_timeValue(null);
        setblockedTimeValue(null);
        setErrors({});
        setEditingIndex(null); // Reset editing index


    };



    // tIME LOGIC HERE 





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

    const handleBlockedTimeChange = (newValue) => {
        setblockedTimeValue(newValue);

        if (newValue) {
            const formattedTime = newValue.format('HH:mm');

            handleTransactionChange({ target: { name: 'block_time', value: formattedTime } });
        } else {
            handleTransactionChange({ target: { name: 'block_time', value: '' } });
        }
    };

    const handleInputChangeForAll = (event) => {
        const { name, value } = event.target;
        //most changeble 
        // Update the state conditionally
        let updatedFormData = { ...formData, [name]: value };

        if (name === 'identificationType') {
            if (value === "Aadhar" || value === "PanCard") {
                setIsIdentificationIdRequired(!!value);
            }
            else {
                setIsIdentificationIdRequired(false);
            }
        }

        if (name === 'status') {
            setnccrpStatus(value);
            if (value === "registered_in_nccrp") {
                setstatusIsNccrp(true);

            }
            else {
                setstatusIsNccrp(false);
                // setNccprNo('');
            }
        }

        if (name === "complaintCategory") {
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
            if (value === "8" || value === "6" || value === "1") {
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

    const resizeEmailTab = () => {
        setEmailHistoryTab(!EmailHistoryTab);
    }

    const resizesmsTab = () => {
        setSmsHistoryTab(!SmsHistoryTab);
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

    const resizeWMSTab = () => {
        setWMSTab(!WMSTab);
    }

    //SUBMIT FORM ACTIVITY


    const fncTosendNccrpUpdateDetails = (nccrpNo, remark, status, sourceId, cid, compDesc) => {

        //API CALL 1-
        const reqData = {
            type: "nccrp_update",
            action_user: ClBox.agentId,
            complaint_id: cid,
            nccrp_no: nccrpNo || '',
            source_type: sourceId,
            status: status,
            remark: remark,
            complaint_desc: compDesc,

        }

        // console.log("NCCRP UPDATES WITH DETAILS" + reqData);
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

                // setcomplaintCategoryArray(data.result);
                //LOGIC TO AUTO SELECT THE ELEMENT 


            }
            else {
                console.log(data);
            }

        }).catch(err => {
            console.log(err);
        })

    }




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
                { field: 'transactionDetails', ref: transactionDetailsRef },

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
        event.preventDefault();
        // console.log(formData);
        let DoesAllTransHaveNccpr_no = false;
        if (validateForm()) {
            if (formData.status && !isFinancial) {
                const value = formData.status;
                if (value === "registered_in_nccrp" && !nccprNo) {
                    setErrors((prev) => ({
                        ...prev,
                        nccrpNonFinancial: "This field is required",
                    }));
                    acknowledgementNumRef.current.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
            }
            const complaintObj = complaintCategoryArray.find(obj => obj.category_id === formData.complaintCategory);
            const complaintName = complaintObj.category;
            const message = `Do you want to continue?\nVictim: ${formData.victimName || ''}\nComplaint Category: ${complaintName || ''}`;
            const userConfirmed = confirm(message);
            if (userConfirmed) {

            } else {
                return;
            }


            if (!isFinancial) {
                // get these two complaint desc & complaint source
                let sourceName = '';
                const selectedcallsource = complaintSourceArray.find(obj => obj.source_id === formData.sourceOfComplaint);
                if (selectedcallsource) {
                    sourceName = selectedcallsource.source_name;
                }
                let compliantDescX = '';
                const selectedDescription = complaintComplaintDescArray.find(obj => obj.complaint_desc_id === formData.complaintDesc);
                if (selectedDescription) {
                    compliantDescX = selectedDescription.complaint_desc;
                }

                if (nccrpStatus === formdata.status) {

                } else {

                    fncTosendNccrpUpdateDetails(nccprNo, formData.status_remarks, formData.status, sourceName, formData.complaintNumber, compliantDescX);
                }


            } else {
                //LOGIC TO UPDATE NCCRP DETAILS FOR FINANCIAL CASES -

                //filter data name using data id ----
                let sourceName = '';
                const selectedcallsource = complaintSourceArray.find(obj => obj.source_id === formData.sourceOfComplaint);
                if (selectedcallsource) {
                    sourceName = selectedcallsource.source_name;
                }
                // Step 1: Filter objects with non-empty nccprc_no and ensure only the first occurrence is kept

                const filteredTransactions = formData.transactionDetails.reduce((acc, transaction) => {
                    const { nccprc_no } = transaction;
                    if (nccprc_no && !acc.seen.has(nccprc_no)) {
                        acc.result.push(transaction);
                        acc.seen.add(nccprc_no);
                    }
                    return acc;
                }, { result: [], seen: new Set() }).result;


                DoesAllTransHaveNccpr_no = formData.transactionDetails.every((trans) => {
                    return trans.nccrp_status === 'registered_in_nccrp';
                });

                console.log(filteredTransactions);


                filteredTransactions.forEach((transaction, index) => {
                    if (transaction.isupdating) {
                        console.log("update:--", index)
                        console.log(transaction);
                        fncTosendNccrpUpdateDetails(
                            transaction.nccprc_no,
                            transaction.nccrp_remark,
                            transaction.nccrp_status,
                            sourceName,
                            formData.complaintNumber,
                            transaction.transaction_complaint_descname
                        );
                    }
                });

                // return;
            }

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
                incident_date: formData.incidentDate,
                incident_time: formData.incidentTime,
                state_code: formData.state,
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
                    block_time: txn.block_time || '',
                    nccprc_no: txn.nccprc_no,
                    transaction_time: txn.transaction_time || '',
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
                    action_user: txn.action_user,
                    blocked_remark: txn.blocked_remark,
                    evidence_files: [],
                    nccrp_status: txn.nccrp_status,
                    nccrp_remark: txn.nccrp_remark,
                    isupdating: txn.isupdating

                })) : [],
                total_blocked_amount: formData.TotalBlockedAmount.toString(),
                total_transaction_amount: formData.TotalTransectionAmount.toString(),
                suspect_website_url: formData.suspectedWebsite,
                suspect_details: '',
                suspect_name: formData.suspect_name,
                suspect_mobile: formData.suspectedMobileNum,
                suspect_email: formData.suspectedEmail,
                suspect_bank_account_no: formData.suspectedBankAccNum,
                suspect_address: formData.suspectedAddress,
                complaint_source: formData.sourceOfComplaint,
                category_code: formData.complaintCategory.toString() || '0',
                sub_category_code: formData.complaintSubCategory.toString() || '0',
                // transaction_remarks: '',
              
                acknowledge_1: formData.acknowledgement,
                acknowledge_2: formData.acknowledgement2,
                acknowledge_3: formData.acknowledgement3,
                acknowledge_4: formData.acknowledgement4,
                status_remarks: formData.status_remarks,
                nccrp_no: isFinancial ? '' : nccprNo,
                status: DoesAllTransHaveNccpr_no ? "registered_in_nccrp" : formData.status,
                category_desc_code: formData.complaintDesc.toString() || '0',
                suspect_remarks: formData.suspect_remarks,
                same_person: formData.samePerson,
                transaction_remarks: '',
                evidence_files: formData.evidence_files
            }

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(reqData)
            };

            fetch(GlobalUrl, options).then(res => {
                if (!res.ok) {
                    throw new Error('Internal server error')
                }
                return res.json();
            }).then(data => {
                if (data.success) {
                    console.log("Form is valid, submitting...");
                    setcomplaintId(formData.complaintNumber);
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



    useEffect(() => {
        setRows(formData.transactionDetails.map((transaction, index) => ({ id: index, ...transaction })));
    }, [formData.transactionDetails]);


    return (
        <>



            {
                CcidBox ?
                    <div className='compSection'>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="alertBox">
                                {/* <Close style={{ fill: 'red', alignSelf: 'flex-end' }} onClick={closeBoth} className='Hicon' /> */}
                                <p style={{ marginTop: "30px" }} className='p'>Your complaint with Complaint Number :<br /> <span> {complaintId}</span> <br /> has been successfully updated.</p>

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

                            <StyledContainer style={{ minWidth: collapsed ? '84vw' : '', marginLeft: collapsed ? '-40px' : '', transition: '.4s ease' }} className='Bigcontainer' maxWidth="sm">
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


                                                        classes: {
                                                            asterisk: 'custom-asterisk',
                                                        },

                                                    }}
                                                        disabled={true}

                                                        error={!!errors.callerName}
                                                        helperText={errors.callerName}
                                                        value={formData.callerName}
                                                        fullWidth label="Name of the Caller"
                                                        variant="outlined" />
                                                </Grid>
                                                <Grid ref={callerGenderRef} item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth variant="outlined" error={!!errors.callerGender}>
                                                        <InputLabel htmlFor="Gender">Gender<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                        <Select disabled={true} name="callerGender" value={formData.callerGender} className='select' label="Gender" onChange={handleInputChangeForAll} id="incident-sub-type" >
                                                            <MenuItem value="male">male</MenuItem>
                                                            <MenuItem value="female">female</MenuItem>
                                                            <MenuItem value="other">other</MenuItem>
                                                        </Select>
                                                        {errors.callerGender && (
                                                            <FormHelperText>{errors.callerGender}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField disabled={true} onChange={handleInputChangeForAll} name="callerAge" className='input' value={formData.callerAge} fullWidth label="Age" variant="outlined"



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
                                                                control={<Checkbox name="yes" disabled={true} checked={formData.samePerson} onChange={handleSamePersonCheckboxChange} />}
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
                                                        onChange={handleInputChangeForAll} disabled={true} name="victimName" className='input' value={formData.victimName} fullWidth label="Name of the Victim" variant="outlined" />
                                                </Grid>

                                                <Grid ref={victimGenderRef} item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth variant="outlined" error={!!errors.victimGender}>
                                                        <InputLabel htmlFor="Gender">Gender<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                        <Select name="victimGender" value={formData.victimGender} disabled={true} className='select' label="Gender" onChange={handleInputChangeForAll} >

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
                                                        onChange={handleInputChangeForAll} name="victimAge" disabled={true} className='input' value={formData.victimAge} fullWidth label="Age" variant="outlined" />
                                                </Grid>
                                                <Grid ref={VictimNumRef} item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        error={!!errors.VictimNum}
                                                        // disabled={formData.samePerson}
                                                        disabled={true}
                                                        helperText={errors.VictimNum}
                                                        InputLabelProps={{
                                                            required: true,
                                                            classes: {
                                                                asterisk: 'custom-asterisk',
                                                            },
                                                        }} onChange={handleInputChangeForAll} name="VictimNum" value={formData.VictimNum} className='input' fullWidth label="Contact Number Of victim" variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField disabled={true} onChange={handleInputChangeForAll} name="VictimaltNum" className='input' value={formData.VictimaltNum} fullWidth label="Alternative Number if any" variant="outlined" />
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
                                                        disabled={true}
                                                        onChange={handleInputChangeForAll} name="email" className='input' value={formData.email} fullWidth label="Email Id" variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12}>
                                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                                        Address Details :
                                                    </Typography>

                                                </Grid>
                                                <Grid ref={addressLine1Ref} item xs={12} sm={6} md={6}>
                                                    <TextField
                                                        disabled={true}
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
                                                    <TextField disabled={true} onChange={handleInputChangeForAll} name="addressLine2" className='input' value={formData.addressLine2} fullWidth label="Address Line 2" variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField disabled={true} onChange={handleInputChangeForAll} name="landmark" className='input' value={formData.landmark} fullWidth label="Landmark" variant="outlined" />
                                                </Grid>

                                                <Grid ref={stateRef} item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth variant="outlined" error={!!errors.state}>
                                                        <InputLabel htmlFor="state">State<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                        <Select
                                                            disabled={true}
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
                                                                    disabled={true}
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
                                                                            InputLabelProps={{
                                                                                required: true,
                                                                                classes: {
                                                                                    asterisk: 'custom-asterisk',
                                                                                },
                                                                            }}
                                                                            label="Nearest Police station"
                                                                            variant="outlined"
                                                                            error={!!errors.nearestPoliceStation}
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
                                                                <InputLabel htmlFor="district">District<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                                                                <Select disabled={true} onChange={handleInputChangeForAll} value={formData.district} name="district" className='select' label="District" required>
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

                                                                    {/* Pincode not in the list? Enter manually */}
                                                                    Manual Pincode
                                                                    <FormControlLabel
                                                                        disabled={true}
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

                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={handleInputChangeForAll}
                                                                    name="pincode"
                                                                    className='input'
                                                                    error={!!errors.pincode}
                                                                    helperText={errors.pincode}
                                                                    value={formData.pincode || null}
                                                                    fullWidth
                                                                    disabled={true}
                                                                    label="Type Pincode"
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

                                                            <Grid ref={pincodeRef} item xs={12} sm={6} md={4}>
                                                                <FormControl fullWidth variant="outlined" error={!!errors.pincode}>

                                                                    <Autocomplete className='select'
                                                                        disabled={true}
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
                                                                                label="Pincode"
                                                                                variant="outlined"
                                                                                required
                                                                                error={!!errors.pincode}
                                                                                InputLabelProps={{
                                                                                    shrink: true,
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




                                                    </>}


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


                                            <>

                                                <Grid className='tab' container spacing={4}>

                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <TextField
                                                            disabled={true}
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
                                                            disabled={true}
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
                                                            label="Incident Date"
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
                                                                disabled={true}
                                                                className="input"
                                                                label="Incident Time"
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
                                                                    <InputLabel htmlFor="identificationType">Identification Type</InputLabel>
                                                                    <Select className='select'
                                                                        disabled={true}
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
                                                                    disabled={true}
                                                                    className='input'
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
                                                                    Transaction Details:  {errors.transactionDetails && (
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

                                                                    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>

                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={allSelected}
                                                                                    onChange={(event) => {
                                                                                        if (event.target.checked) {
                                                                                            handleSelectAll();
                                                                                        } else {
                                                                                            handleDeselectAll();
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label="Select All"
                                                                            sx={{
                                                                                color: 'text.primary',
                                                                                '& .MuiFormControlLabel-label': {
                                                                                    fontSize: '14px',
                                                                                    fontWeight: '500',
                                                                                },
                                                                            }}
                                                                        />

                                                                        <button style={{ fontSize: "11px", border: '1px solid lightgray', background: '#444547', color: 'white' }} onClick={openModal} disabled={selectedRows.length === 0}>
                                                                            Edit NCCRP Number & Status
                                                                        </button>



                                                                    </Box>
                                                                    <DataGrid
                                                                        rows={rows}
                                                                        columns={customColumns}
                                                                        pageSize={5}
                                                                        // checkboxSelection
                                                                        style={{ height: '31vh', width: '98%' }}
                                                                        disableSelectionOnClick
                                                                        getRowId={(row) => row.id}
                                                                        onSelectionModelChange={handleSelectionModelChange}
                                                                        selectionModel={selectedRows}
                                                                        components={{
                                                                            Toolbar: CustomHeader,
                                                                        }}
                                                                        componentsProps={{
                                                                            toolbar: {
                                                                                allSelected,
                                                                                onSelectAll: handleSelectAll,
                                                                                onDeselectAll: handleDeselectAll,
                                                                            },
                                                                        }}
                                                                        rowsPerPageOptions={[5, 10, 20]}
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
                                                                                whiteSpace: 'normal', // Allow text wrapping
                                                                                overflow: 'visible',  // Ensure content is visible when wrapping
                                                                                lineHeight: '1.2em',  // Adjust line height for readability
                                                                            },
                                                                            '& .MuiDataGrid-footerContainer': {
                                                                                backgroundColor: '#f5f5f5', // Footer background color
                                                                            },
                                                                            '& .MuiSvgIcon-root': {
                                                                                color: '#d5b0b0', // Set icon color to a custom color
                                                                            },
                                                                            '& .MuiDataGrid-row': {
                                                                                borderBottom: '1px solid #d0d0d0', // Custom row border-bottom color
                                                                            },
                                                                        }}
                                                                    />
                                                                </TableContainer>
                                                                <Modal open={open} onClose={closeModal}>
                                                                    <Box
                                                                        sx={{
                                                                            position: 'absolute',
                                                                            top: '50%',
                                                                            left: '50%',
                                                                            transform: 'translate(-50%, -50%)',
                                                                            width: 400,
                                                                            bgcolor: 'background.paper',
                                                                            borderRadius: 1,
                                                                            boxShadow: 24,
                                                                            p: 4,
                                                                        }}
                                                                    >

                                                                        {/* <TextField
                                                                            label="Status"
                                                                            value={nccrpStatus}
                                                                            onChange={handleStatusChange}
                                                                            fullWidth
                                                                            sx={{ mb: 2 }}
                                                                        /> */}

                                                                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                                                            <InputLabel htmlFor="Status">Status</InputLabel>
                                                                            <Select onChange={handleStatusChange} value={nccrpStatus} className='select' label="NCCRP Status"  >
                                                                                <MenuItem value="registered_in_nccrp">Registerd in NCCRP</MenuItem>
                                                                                <MenuItem value="PENDING">Pending</MenuItem>
                                                                                <MenuItem value="fir_registered">FIR Registered</MenuItem>
                                                                                <MenuItem value="CLOSED">Closed</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                        <TextField
                                                                            label="NCCRP Number"
                                                                            value={nccprNo}
                                                                            disabled={nccrpChecker}
                                                                            error={!!errors.nccrpforfinance}
                                                                            helperText={errors.nccrpforfinance}
                                                                            name='nccrpforfinance'
                                                                            onChange={handleNccprChange}
                                                                            fullWidth
                                                                            sx={{ mb: 2 }}
                                                                        />


                                                                        <TextField
                                                                            label="NCCRP Remarks"
                                                                            value={nccrpRemarks}
                                                                            onChange={handleRemarksChange}
                                                                            fullWidth
                                                                            sx={{ mb: 2 }}
                                                                            multiline
                                                                            rows={4}
                                                                        />
                                                                        <Button
                                                                            onClick={handleSaveNccpr}
                                                                            variant="contained"
                                                                            color="primary"
                                                                            fullWidth
                                                                        >
                                                                            Save
                                                                        </Button>
                                                                    </Box>
                                                                </Modal>
                                                            </StyledBox>


                                                            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={12} sm={6} md={12} >

                                                                <TextField style={{ margin: '4px 20px' }} disabled={true} onChange={handleInputChangeForAll} name="TotalTransectionAmount" className='input' value={formData.TotalTransectionAmount} label="Total Amount Lost ₹" variant="outlined" />
                                                                <TextField style={{ margin: '4px 0px' }} disabled={true} onChange={handleInputChangeForAll} name="TotalBlockedAmount" className='input' value={formData.TotalBlockedAmount} label="Total Blocked Amount ₹" variant="outlined" />
                                                            </Grid>


                                                            {/* {!AllHasNccrp ? */}
                                                            {/* <> */}


                                                            <Grid ref={EditTransactionRef} style={{ borderBottom: '1px solid gray' }} item xs={12} sm={6} md={12}>
                                                            </Grid>


                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <FormControl fullWidth variant="outlined" error={!!errors.transaction_complaint_desc}>
                                                                    <InputLabel htmlFor="Cdesc">
                                                                        Complaint Description <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                                                    </InputLabel>
                                                                    <Select
                                                                        onChange={(e) => handleTransactionChange(e)}
                                                                        value={TransactionObject.transaction_complaint_desc}
                                                                        disabled={DisabledTransactionsFields}
                                                                        name="transaction_complaint_desc"
                                                                        className={`select ${TransEditable ? 'input-animated' : ''}`}
                                                                        label="Complaint Description"

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
                                                                    <Grid item xs={12} sm={6} md={2}>
                                                                        <TextField
                                                                            onChange={(e) => handleTransactionChange(e)}
                                                                            name="credit_first"
                                                                            className="input"
                                                                            error={!!errors.credit_first}
                                                                            helperText={errors.credit_first}
                                                                            value={TransactionObject.credit_first}
                                                                            fullWidth
                                                                            disabled={DisabledTransactionsFields}
                                                                            label="First 6 digit Card Number"
                                                                            variant="outlined"
                                                                            inputProps={{
                                                                                maxLength: 6,
                                                                            }}

                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={2}>
                                                                        <TextField
                                                                            onChange={(e) => handleTransactionChange(e)}
                                                                            name="credit_last"
                                                                            className="input"
                                                                            value={TransactionObject.credit_last}
                                                                            fullWidth
                                                                            disabled={DisabledTransactionsFields}
                                                                            error={!!errors.credit_last}
                                                                            helperText={errors.credit_last}
                                                                            label="Last 4 digit Card Number"
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
                                                                    <Grid item xs={12} sm={6} md={2}>

                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={2}></Grid>


                                                                </>
                                                            )
                                                            }

                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    disabled={DisabledTransactionsFields}
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
                                                                    // type='number'
                                                                    fullWidth
                                                                    label="Transaction Amount"
                                                                    variant="outlined"
                                                                    required
                                                                    value={TransactionObject.transaction_amount}
                                                                />
                                                            </Grid>

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
                                                                        disabled={DisabledTransactionsFields}
                                                                        label="Bank Name"
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

                                                                                disabled={DisabledTransactionsFields}
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
                                                                                        label="Name of the Bank/ Wallet/Merchant"
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
                                                                            disabled={DisabledTransactionsFields}
                                                                            style={{ margin: '0px 6px' }}
                                                                            control={
                                                                                <Checkbox
                                                                                    name="other_bank"
                                                                                    checked={TransactionObject.other_bank || false}
                                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                                />
                                                                            }
                                                                        />
                                                                        Other bank?
                                                                    </Typography>
                                                                </FormControl>
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
                                                                    disabled={DisabledTransactionsFields}
                                                                    label="Account Number/UPI ID."
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
                                                                    disabled={DisabledTransactionsFields}
                                                                    className={`input ${TransEditable ? 'input-animated' : ''}`}
                                                                    error={!!errors.transaction_id}
                                                                    helperText={errors.transaction_id}
                                                                    value={TransactionObject.transaction_id}
                                                                    fullWidth
                                                                    label="12-digit Transaction id/UTR No."
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
                                                                    disabled={DisabledTransactionsFields}
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
                                                                    label="Date of Transaction"
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
                                                                        disabled={DisabledTransactionsFields}
                                                                        className={`select ${TransEditable ? 'input-animated' : ''}`}
                                                                        label="Transaction Time"
                                                                        value={transaction_timeValue}
                                                                        onChange={handletransaction_timeChange}
                                                                    // disableFuture
                                                                    />
                                                                </LocalizationProvider>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="ref_no"
                                                                    disabled={DisabledTransactionsFields}
                                                                    error={!!errors.ref_no}
                                                                    helperText={errors.ref_no}
                                                                    className={`select ${TransEditable ? 'input-animated' : ''}`}
                                                                    value={TransactionObject.ref_no}
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        required: isCreditCard,

                                                                        classes: {
                                                                            asterisk: 'custom-asterisk',
                                                                        },
                                                                    }}
                                                                    label="Reference Number"
                                                                    variant="outlined"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={8}>
                                                                <TextField
                                                                    disabled={DisabledTransactionsFields}
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="transaction_remarks"
                                                                    className={`select ${TransEditable ? 'input-animated' : ''}`}
                                                                    value={TransactionObject.transaction_remarks}
                                                                    fullWidth
                                                                    label="Transaction Remarks"
                                                                    variant="outlined"
                                                                // multiline
                                                                // rows={2}
                                                                />
                                                            </Grid>

                                                            {/* //NEW FIELDS ------------------------  */}

                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    disabled={DisabledTransactionsFields}
                                                                    error={!!errors.payment_gateway}
                                                                    helperText={errors.payment_gateway}
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="payment_gateway"
                                                                    className={`select ${TransEditable ? 'input-animated' : ''}`}
                                                                    value={TransactionObject.payment_gateway}
                                                                    fullWidth
                                                                    label="Payment Gateway Details"
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
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
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
                                                                    disabled={DisabledTransactionsFields}
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="affected_system_details"
                                                                    className={`select ${TransEditable ? 'input-animated' : ''}`}
                                                                    value={TransactionObject.affected_system_details}
                                                                    fullWidth
                                                                    label="Affected System Details"
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
                                                                    label="Accused Contact Info."
                                                                    variant="outlined"
                                                                />
                                                                  </Grid> */}
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    disabled={DisabledTransactionsFields}
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="merchant_info"
                                                                    error={!!errors.merchant_info}
                                                                    helperText={errors.merchant_info}
                                                                    className={`select ${TransEditable ? 'input-animated' : ''}`}
                                                                    value={TransactionObject.merchant_info}
                                                                    fullWidth
                                                                    label="Merchant Info"
                                                                    variant="outlined"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={12}>
                                                                <Grid item xs={12} sm={6} md={4}>
                                                                    <TextField
                                                                        disabled={DisabledTransactionsFields}
                                                                        onChange={(e) => handleTransactionChange(e)}
                                                                        name="proof_of_owner_ship"
                                                                        className={`select ${TransEditable ? 'input-animated' : ''}`}
                                                                        value={TransactionObject.proof_of_owner_ship}
                                                                        fullWidth
                                                                        label="Proof Of Ownership"
                                                                        variant="outlined"

                                                                    />
                                                                </Grid>
                                                            </Grid>



                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <TextField

                                                                    error={!!errors.block_amount}
                                                                    helperText={errors.block_amount}
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="block_amount"
                                                                    className={`input ${TransEditable2 ? 'input-animated' : ''}`}
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
                                                                    value={TransactionObject.block_date}
                                                                    fullWidth
                                                                    label="Blocked Date"
                                                                    className={`input ${TransEditable2 ? 'input-animated' : ''}`}
                                                                    variant="outlined"
                                                                    inputProps={{
                                                                        max: currentDate,
                                                                    }}

                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    <DesktopTimePicker


                                                                        label="Blocked Time"
                                                                        value={blockedTimeValue}
                                                                        onChange={handleBlockedTimeChange}
                                                                        className={`input ${TransEditable2 ? 'input-animated' : ''}`}
                                                                    />
                                                                </LocalizationProvider>
                                                            </Grid>

                                                            {/* <Grid item xs={12} sm={6} md={4}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="nccprc_no"
                                                                    className={`input ${TransEditable ? 'input-animated' : ''}`}
                                                                    value={TransactionObject.nccprc_no}
                                                                    fullWidth
                                                                    disabled={DisabledTransactionsFields}
                                                                    label="NCCRP Number"
                                                                    variant="outlined"
                                                                />
                                                            </Grid> */}
                                                            <Grid item xs={12} sm={6} md={8}>
                                                                <TextField
                                                                    onChange={(e) => handleTransactionChange(e)}
                                                                    name="blocked_remark"
                                                                    className={`input ${TransEditable2 ? 'input-animated' : ''}`}
                                                                    value={TransactionObject.blocked_remark}
                                                                    fullWidth

                                                                    label="Bank Blocked Remarks"
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


                                                                {
                                                                    !AllHasNccrp ?

                                                                        <StyledButton onClick={addTransaction} style={{ width: "auto", display: 'flex', alignSelf: 'flex-end', margin: '0px' }} variant="contained" color="primary" className="button">
                                                                            <Label className="bell" />
                                                                            Add
                                                                        </StyledButton>


                                                                        : <></>
                                                                }

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
                                                    <TextField disabled={true} onChange={handleInputChangeForAll} name="suspectedWebsite" className='input' value={formData.suspectedWebsite} fullWidth label="Suspected Website Urls/Social Media handles" variant="outlined" />
                                                </Grid>


                                                <Grid item xs={12} sm={12} md={12}>
                                                    <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                                        Suspect's Details (if available) :
                                                    </Typography>

                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <TextField disabled={true} onChange={handleInputChangeForAll} name="suspect_name" className='input' value={formData.suspect_name} fullWidth label="Suspect Name" variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={3}>
                                                    <TextField disabled={true} onChange={handleInputChangeForAll} name="suspectedMobileNum" className='input' value={formData.suspectedMobileNum} fullWidth label="Mobile Number" variant="outlined" />
                                                </Grid>



                                                {/* //if both are same--  */}
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <TextField disabled={true} onChange={handleInputChangeForAll} name="suspectedEmail" className='input' value={formData.suspectedEmail} fullWidth label="Email Id" variant="outlined" />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={3}>
                                                    <TextField disabled={true} onChange={handleInputChangeForAll} name="suspectedBankAccNum" className='input' value={formData.suspectedBankAccNum} fullWidth label="Bank Account Number Or UPI Id" variant="outlined" />
                                                </Grid>

                                                {/* //remarks  */}

                                                <Grid item xs={12} sm={12} md={6}>
                                                    <TextField
                                                        onChange={handleInputChangeForAll}
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
                                                        onChange={handleInputChangeForAll}
                                                        disabled={true}
                                                        className="input"
                                                        value={formData.suspect_remarks}
                                                        fullWidth
                                                        label="Suspect Remarks"
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




                                {/* {

                                    !isFinancial ? <>

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
                                                 
                                                        <Grid item xs={12} sm={6} md={3}>
                                                            <FormControl fullWidth variant="outlined">
                                                                <InputLabel htmlFor="Status">Status</InputLabel>
                                                                <Select disabled={ackNumGiven} onChange={handleInputChangeForAll} name="status" value={formData.status} className='select' label="Status"  >
                                                                    <MenuItem disabled="true" value="NEW">New</MenuItem>
                                                                    <MenuItem value="PENDING">Pending</MenuItem>
                                                                    <MenuItem value="registered_in_nccrp">Registerd in NCCRP</MenuItem>
                                                                    <MenuItem value="fir_registered">FIR Registered</MenuItem>
                                                                    <MenuItem value="CLOSED">Closed</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>

                                                        <Grid ref={acknowledgementNumRef} item xs={12} sm={6} md={3}>
                                                            <TextField
                                                                label="NCCRP Number"
                                                                className="input"
                                                                name="nccrpNonFinancial"
                                                                error={!!errors.nccrpNonFinancial}
                                                                helperText={errors.nccrpNonFinancial}
                                                                InputLabelProps={{
                                                                    required: statusIsNccrp,
                                                                    classes: {
                                                                        asterisk: 'custom-asterisk',
                                                                    },
                                                                }}
                                                                disabled={!statusIsNccrp}
                                                                value={nccprNo}
                                                                onChange={handleNccprChange}
                                                                fullWidth
                                                                sx={{ mb: 2 }}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} sm={6} md={6}>
                                                            <TextField

                                                                onChange={handleInputChangeForAll}
                                                                className="input"
                                                                value={formData.status_remarks}
                                                                fullWidth
                                                                // disabled={true}
                                                                label="Status Remarks"
                                                                name='status_remarks'
                                                                variant="outlined"
                                                                multiline

                                                        
                                                            />
                                                        </Grid>



                                                    </Grid>


                                                ) : <> </>

                                            }

                                        </StyledBox>

                                    </> : <></>
                                } */}






                    
                         








                                {/* <Box onClick={resizeAknowledgeTab} className="Chead" sx={{ textAlign: 'left' }}>
                                    <StyledTypography variant="h4" component="h2">
                                        <StyledIcon4 /> Update Details
                                    </StyledTypography>
                                    {
                                        AcknowledgeTab ? (<Compress onClick={resizeAknowledgeTab} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizeAknowledgeTab} className='tabMngIcon' />)
                                    }
                                </Box>
                                <StyledBox>

                                    {
                                        AcknowledgeTab && !isFinancial ? (
                                            <Grid className='tab' container spacing={4}>

                                     

                                                <Grid item xs={12} sm={12} md={6}>
                                                    <TextField
                                                        // disabled={true}
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


                                        
                                            </Grid>

                                        ) : <> </>

                                    }

                                </StyledBox>  */}

                                <Box onClick={resizesmsTab} className="Chead" sx={{ textAlign: 'left' }}>
                                    <StyledTypography variant="h4" component="h2">
                                        <StyledIcon7 /> Sms Sent History
                                    </StyledTypography>
                                    {
                                        SmsHistoryTab ? (<Compress onClick={resizesmsTab} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizesmsTab} className='tabMngIcon' />)
                                    }
                                </Box>


















                                {SmsHistoryTab ? (
                                    <StyledBox>



                                        <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                            Sms Sent History
                                        </Typography>

                                        <TableContainer className='tblCont' component={Paper} sx={{ borderRadius: 1, borderBottom: 0 }}>

                                            <Table id='complaintGrid3'>
                                                <TableHead sx={{ backgroundColor: '#ecf0f3' }}>
                                                    <TableRow>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {HistoryList.map((row, index) => (
                                                        <TableRow key={index}>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>


                                    </StyledBox>
                                ) : <> </>

                                }

                                {/* //email HISTORY TAB   */}

                                <Box onClick={resizeEmailTab} className="Chead" sx={{ textAlign: 'left' }}>
                                    <StyledTypography variant="h4" component="h2">
                                        <StyledIcon8 />  Email Sent History
                                    </StyledTypography>
                                    {
                                        SmsHistoryTab ? (<Compress onClick={resizeEmailTab} className='tabMngIcon' />) : (<ExpandOutlined onClick={resizeEmailTab} className='tabMngIcon' />)
                                    }
                                </Box>

                                {EmailHistoryTab ? (
                                    <StyledBox>



                                        <Typography className='p' component="legend" variant="body1" style={{ marginBottom: '8px', color: 'gray' }}>
                                            Email Sent History
                                        </Typography>

                                        <TableContainer className='tblCont' component={Paper} sx={{ borderRadius: 1, borderBottom: 0 }}>

                                            <Table id='complaintGrid4'>
                                                <TableHead sx={{ backgroundColor: '#ecf0f3' }}>
                                                    <TableRow>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {HistoryList.map((row, index) => (
                                                        <TableRow key={index}>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>


                                    </StyledBox>
                                ) : <> </>

                                }
                                {/* //sms HISTORY TAB   */}







                                <Grid style={{ paddingBottom: '25px' }} item xs={12}   >
                                    <StyledButton onClick={SubmitForm} style={{ width: "auto", marginBottom: '22px' }} variant="contained" color="primary" className="button">
                                        <Save className="bell" />
                                        Update
                                    </StyledButton>
                                </Grid>
                            </StyledContainer >
                        </div >

            }
        </ >
    );
};

export default TrackDash;
