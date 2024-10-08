import { useEffect, useState } from 'react';
import { Routes, Route, Router, useLocation } from 'react-router-dom';
import './App.css';
import SidebarMenu from './components/SidebarMenu';
import Footer from './components/Footer';
import Header from './components/Header';
// import Complaint1 from './components/Complaint';
import styled from 'styled-components';
import Home from './pages/Home';
import TrackComplaint from './pages/TrackComplaint';
import TodaysComplaint from './pages/TodaysComplaints';
import NewComplaintLvel1 from './pages/NewComplaint';
import Dashboard from './pages/Dashboard';
import FrontPage from './pages/FrontPage';
import { useSidebar } from './components/SidebarContext';
import { useNavigate } from 'react-router-dom';
import NewRegComplaint from './pages/NewRegComplaint';
import RegisteredInNccrp from './pages/RegisteredInNccrp';
import ComplaintBoard from './pages/ComplaintBoard';
import PendingComplaints from './pages/PendingComplaints';
import Apr from './pages/Apr';
import CallDetails from './pages/CallDetails';
//lvl 2 pages 

const ViewPort = styled.div`
  height: 100vh;
  width: 100vw;
  background: snow;
  background-color: rgb(242, 246, 250);
  display: grid;
  grid-template-areas:
    'sidebar header header'
    'sidebar hero hero'
    'sidebar footer footer';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  font-family: system-ui;
  overflow-x: hidden;
`;

function App() {
  const location = useLocation(); // Get the current location
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
    level2
  } = useSidebar();
  const navigate = useNavigate();
  const [hasNavigated, setHasNavigated] = useState(false);

  // Check if the current path is the home page
  const isHomePage = location.pathname === '/pcp2/';

  return (
    <ViewPort>
      {/* Only show Sidebar and Header if not on the Home page */}
      {!isHomePage && <SidebarMenu />}
      {!isHomePage && <Header />}

      {/* Define Routes */}
      <Routes>
        <Route path="/pcp2/" element={<Home />} />
        <Route path="/pcp2/TrackComplaint" element={<TrackComplaint />} />
        <Route path="/pcp2/TodaysComplaint" element={<TodaysComplaint />} />
        <Route path="/pcp2/NewComplaint" element={<NewComplaintLvel1 />} />
        <Route path="/pcp2/NewRegComplaint" element={<NewRegComplaint />} />
        <Route path="/pcp2/RegisteredInNccrp" element={<RegisteredInNccrp />} />
        <Route path="/pcp2/PendingComplaints" element={<PendingComplaints />} />
        <Route path="/pcp2/ComplaintBoard" element={<ComplaintBoard />} />
        <Route path="/pcp2/CallDetails" element={<CallDetails />} />
        <Route path="/pcp2/Apr" element={<Apr />} />
        <Route path="/pcp2/Dashboard" element={<Dashboard />} />
      </Routes>
    </ViewPort>
  );
}

export default App;
