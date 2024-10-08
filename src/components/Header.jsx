import { GTranslateOutlined, LogoutOutlined, Menu, PersonPinCircleRounded } from '@mui/icons-material'
import '../css/complaint.css';
import { Container, Paper, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Button, Grid, Box, FormControlLabel, Checkbox, FormHelperText } from '@mui/material';
import styled from 'styled-components';

import '../App.css'
import { useSidebar } from './SidebarContext';
import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';


export default function Header() {
  // const { collapsed, toggleSidebar, setLevel2, level2, ClBox, setClBox, } = useSidebar();

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
    systemLanguage, setsystemLanguage
  } = useSidebar();


  const [sourceX, setssourceX] = useState('NA');
  const [categoryX, setcategoryX] = useState('NA');


  const [progressBar, setprogressBar] = useState(false);


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
        // alert("failed")
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

    fncToGetComplaintSource()
    fncToGetComplaintCategory()

  }, []);

  useEffect(() => {



  }, [ClBox.language]);
  useEffect(() => {
    const Csource = ClBox.Csource;
    const idx = ClBox.category;
    const selectedCategory = complaintCategoryArray.find(obj => obj.category_id === idx);
    const selectedcallsource = complaintSourceArray.find(obj => obj.source_id === Csource);



    if (selectedCategory) {
      setcategoryX(selectedCategory.category);

    }
    if (selectedcallsource) {
      setssourceX(selectedcallsource.source_name);
    }
  }, [complaintCategoryArray, complaintSourceArray]);





  const [langContext, setlangContext] = useState({
    language: '',
  });



  const LanguageChange = (event) => {



    const { value } = event.target;
    if (value == "hi") {
      setsystemLanguage("hi");
    } else if (value == "mr") {
      setsystemLanguage("mr");
    } else {
      setsystemLanguage("en");
    }
    console.log("LANGUAGE IS CHANGE TO : " + value);
  }

  return (
    <div className='header'>



      <Menu titleAccess='toggleSidebar' onClick={toggleSidebar} className={`Hicon ${collapsed ? 'tgnHam' : 'hamburger'}`} />
      

      <div className="headOptions">

        <div className='headElm'>
          <PersonPinCircleRounded className='Hicon' /> {systemLanguage === 'hi' ? "मेरी प्रोफ़ाइल" : "My Profile"}
        </div>
        <div className='headElm'>
          <LogoutOutlined className='Hicon' /> {systemLanguage === 'hi' ? "लॉग आउट" : "Logout"}
        </div>
        <div className='headElm'>


          <GTranslateOutlined className='Hicon' />
          <FormControl id='frmctrl' variant="outlined">
            <InputLabel htmlFor="incident-type"> {systemLanguage === 'hi' ? "भाषा" : "Language"}  </InputLabel>
            <Select onChange={(e) => LanguageChange(e)} name="language" value={systemLanguage} className='select' label="Language" >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="hi"> हिन्दी </MenuItem>

            </Select>
          </FormControl>

        </div>


      </div>

    </div>
  )
}
