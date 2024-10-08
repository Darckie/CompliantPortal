import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { AssignmentLateSharp, TimelineOutlined, Assignment } from '@mui/icons-material';
import logo from '../img/Logo.svg';
import { useSidebar } from './SidebarContext';
import '../css/sidebar.css';

function SidebarMenu() {
  const { collapsed, setCollapsed, systemLanguage } = useSidebar();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 940px)');
    const handleMediaQueryChange = (e) => {
      setCollapsed(e.matches);
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [setCollapsed]);

  // Function to get language-specific labels (only English and Hindi)
  const getLabel = (enLabel, hiLabel) => {
    return systemLanguage === 'hi' ? hiLabel : enLabel;
  };

  return (
    <Sidebar className='sidebar' id={`${collapsed ? 'collapsed' : ''}`}>
      <div className="headS">
        <img src={logo} alt="Logo" className="logo" />
        {!collapsed && <span id="logoName">PCP</span>}
      </div>
      {!collapsed && <span className='about'></span>}
      <Menu className='menu' iconShape="square">
        <SubMenu
          className="menuItem"
          label={
            <span
              title={getLabel('Complaint', 'शिकायत')}
              className={
                isActive('/pcp2/') ||
                isActive('/pcp2/ComplaintBoard') ||
                isActive('/pcp2/RegisteredInNccrp') ||
                isActive('/pcp2/PendingComplaints') ||
                isActive('/pcp2/NewRegComplaint') ||
                isActive('/pcp2/TodaysComplaint') ||
                isActive('/pcp2/NewComplaint') 
                  ? 'complaint-label activePageItem' 
                  : 'complaint-label'
              }
            >
              <AssignmentLateSharp titleAccess={getLabel('Complaint', 'शिकायत')} className="iconS" /> 
              {!collapsed && getLabel('Complaint', 'शिकायत')}
            </span>
          }
        >
          <MenuItem
            title={getLabel('Home', 'होम')}
            className={isActive('/pcp2/') ? 'menuItem subItem activePage' : 'menuItem subItem'}
            component={<Link to="/pcp2/" />}
          >
            {getLabel('Home', 'होम')}
          </MenuItem>
          <MenuItem
            title={getLabel('Dashboard', 'डैशबोर्ड')}
            className={isActive('/pcp2/Dashboard') ? 'menuItem subItem activePage' : 'menuItem subItem'}
            component={<Link to="/pcp2/Dashboard" />}
          >
            {getLabel('Dashboard', 'डैशबोर्ड')}
          </MenuItem>
          <MenuItem
            title={getLabel("Today's Complaints", 'आज की शिकायतें')}
            className={isActive('/pcp2/TodaysComplaint') ? 'menuItem subItem activePage' : 'menuItem subItem'}
            component={<Link to="/pcp2/TodaysComplaint" />}
          >
            {getLabel("Today's Complaints", 'आज की शिकायतें')}
          </MenuItem>
          
          <MenuItem
            title={getLabel('Complaint Board', 'शिकायत बोर्ड')}
            className={isActive('/pcp2/ComplaintBoard') ? 'menuItem subItem activePage' : 'menuItem subItem'}
            component={<Link to="/pcp2/ComplaintBoard" />}
          >
            {getLabel('Complaint Board', 'शिकायत बोर्ड')}
          </MenuItem>

          <MenuItem
            title={getLabel('New Complaint', 'नई शिकायत')}
            className={isActive('/pcp2/NewComplaint') ? 'menuItem subItem activePage' : 'menuItem subItem'}
            component={<Link to="/pcp2/NewComplaint" />}
          >
            {getLabel('New Complaint', 'नई शिकायत')}
          </MenuItem>

          <MenuItem
            title={getLabel("Today's Complaints", 'आज की शिकायतें')}
            className={isActive('/pcp2/TodaysComplaint') ? 'menuItem subItem activePage' : 'menuItem subItem'}
            component={<Link to="/pcp2/TodaysComplaint" />}
          >
            {getLabel("Today's Complaints", 'आज की शिकायतें')}
          </MenuItem>

          <MenuItem
            title={getLabel('New Registered Complaints', 'नई पंजीकृत शिकायतें')}
            className={isActive('/pcp2/NewRegComplaint') ? 'menuItem subItem activePage' : 'menuItem subItem'}
            component={<Link to="/pcp2/NewRegComplaint" />}
          >
            {getLabel('New Registered Complaints', 'नई पंजीकृत शिकायतें')}
          </MenuItem>

          <MenuItem
            title={getLabel('Pending Registered Complaints', 'लंबित पंजीकृत शिकायतें')}
            className={isActive('/pcp2/PendingComplaints') ? 'menuItem subItem activePage' : 'menuItem subItem'}
            component={<Link to="/pcp2/PendingComplaints" />}
          >
            {getLabel('Pending Registered Complaints', 'लंबित पंजीकृत शिकायतें')}
          </MenuItem>

    
        </SubMenu>

        <SubMenu
          className="menuItem"
          label={
            <span className={isActive('/pcp2/TrackComplaint') ? 'complaint-label activePageItem' : 'complaint-label'}>
              <TimelineOutlined titleAccess={getLabel('Track Complaint', 'शिकायत ट्रैक करें')} className='iconS' /> 
              {!collapsed && getLabel('Track Complaint', 'शिकायत ट्रैक करें')}
            </span>
          }
        >
          <MenuItem
            title={getLabel('Track My Complaint', 'मेरी शिकायत ट्रैक करें')}
            className={isActive('/pcp2/TrackComplaint') ? 'menuItem subItem activePage' : 'menuItem subItem'}
            component={<Link to="/pcp2/TrackComplaint" />}
          >
            {getLabel('Track My Complaint', 'मेरी शिकायत ट्रैक करें')}
          </MenuItem>
        </SubMenu>

        <SubMenu
          className="menuItem"
          label={
            <span className={isActive('/pcp2/CallDetails') || isActive('/pcp2/Apr') ? 'complaint-label activePageItem' : 'complaint-label'}>
              <Assignment titleAccess={getLabel('Productivity', 'उत्पादकता')} className='iconS' /> 
              {!collapsed && getLabel('Productivity', 'उत्पादकता')}
            </span>
          }
        >
        
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}

export default SidebarMenu;
