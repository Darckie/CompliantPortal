import React, { createContext, useState, useContext, useEffect } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [level2, setLevel2] = useState(false);

  const [systemLanguage, setsystemLanguage] = useState("en");
  const [showback, setshowback] = useState(false);
  // Form data
  const [complaintCategoryArray, setcomplaintCategoryArray] = useState([{
    "category_id": "1",
    "category": "Public Safety"
  },
  {
    "category_id": "2",
    "category": "Consumer Complaints"
  },
  {
    "category_id": "3",
    "category": "Cyber Crime"
  },
  {
    "category_id": "4",
    "category": "Critical Infrastructure"
  },
  {
    "category_id": "5",
    "category": "Environmental Issues"
  },
  {
    "category_id": "6",
    "category": "Traffic Violations"
  },
  {
    "category_id": "7",
    "category": "Health and Safety"
  },
  {
    "category_id": "8",
    "category": "Property Disputes"
  }]);
  const [complaintSubCategoryArray, setcomplaintSubCategoryArray] = useState([0]);
  const [complaintSourceArray, setcomplaintSourceArray] = useState([0]);
  const [complaintComplaintDescArray, setcomplaintComplaintDescArray] = useState([0]);
  const [DistrictList, setDistrictList] = useState([0]);
  const [PolicStationList, setPolicStationList] = useState([0]);
  const [BankList, setBankList] = useState([0]);
  const [statesList, setStateList] = useState([]);



  const [ClBox, setClBox] = useState({
    callerNumber: '',
    call_Id: '',
    language: '',
    otherInfo: '',
    cType: '',
    category: '',
    agentId: '',
    Csource: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const callerNumberFromUrl = params.get('callerid');
    const call_id = params.get('callnumber');
    let agent_id = params.get('agentid');

    if (agent_id) {
      localStorage.setItem('agentId', agent_id);
    } else {
      agent_id = localStorage.getItem('agentId') || '';
    }

    const ivrinfo = params.get('ivrinfo');
    let decode = 'NA';
    if (ivrinfo) {
      try {
        decode = decodeURIComponent(ivrinfo);
      } catch (error) {
        console.error("Error decoding ivrinfo:", error);
      }
    }

    const [languageX = 'NA', complaint_type = 'NA', category = 'NA', other = 'NA', Call_source = 'NA'] = decode.split('^');

    const formattedCallerNumber = callerNumberFromUrl && callerNumberFromUrl.length > 10
      ? callerNumberFromUrl.slice(-10)
      : callerNumberFromUrl || '';

    setClBox({
      callerNumber: formattedCallerNumber || '0000399393',
      call_Id: call_id || '',
      agentId: agent_id || '',
      language: languageX,
      cType: complaint_type,
      category: category,
      otherInfo: other,
      Csource: Call_source,
    });
  }, []); // Empty dependency array to run only once on component mount

  // marathi-orabnge, hindi-voilet, english -navy blue
  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  const toggleLvl = () => {
    setLevel2(prev => !prev);
  };

  let httpAddr = "";

  if (window.location.port !== "") {
    httpAddr = window.location.hostname + ":" + window.location.port;
  } else {
    httpAddr = window.location.hostname;
  }

  httpAddr = window.location.protocol + "//" + httpAddr;

  const GlobalUrl = `${httpAddr}/pcpapi/api`;


  return (
    <SidebarContext.Provider value={{
      collapsed,
      toggleSidebar,
      ClBox,
      setClBox,
      setCollapsed,
      level2,
      toggleLvl,
      setLevel2,
      complaintComplaintDescArray,
      DistrictList,
      systemLanguage, setsystemLanguage,
      PolicStationList,
      complaintCategoryArray,
      complaintSubCategoryArray,
      complaintSourceArray,
      GlobalUrl,
      showback, setshowback,
      setcomplaintCategoryArray,
      setcomplaintSourceArray,
      setPolicStationList,
      setcomplaintSubCategoryArray,
      setDistrictList,
      setBankList,
      BankList,
      setcomplaintComplaintDescArray,
      statesList, setStateList
    }}>
      {children}
    </SidebarContext.Provider>
  );
};
