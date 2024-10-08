import React from 'react';
import styled from 'styled-components';
import { useSidebar } from '../components/SidebarContext';
import {
    Container,
    Typography,
    Box,
} from '@mui/material';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from 'recharts';

const Heading = styled(Typography)({
    fontSize: '25px !important', 
    fontWeight: '700 !important',  
    marginBottom: '1rem !important',
    marginTop:'-2.6rem !important',
    textAlign: 'center',
    color: '#494949', // Darker color for contrast
});
// Styled components
const StyledContainer = styled(Container)({
    borderRadius: '12px',
    minWidth: '77vw',
    padding: '2rem',
});

const ChartBox = styled(Box)({
    marginBottom: '2rem', // Consistent spacing
    padding: '1rem',
    borderRadius: '6px',
    backgroundColor: '#ffffff', // Light background for contrast
});

const Title = styled.h2`
    text-align: center;
    color: #333;
    font-size: 1.5rem; // Slightly larger title font size
    margin-bottom: 0.5rem;
`;

const Subtitle = styled.h3`
    text-align: center;
    color: #777;
    font-size: 1rem; // Smaller subtitle font size
    margin-bottom: 1rem;
`;

// Define colors for pie chart in black & white
const COLORS = ['#000000', '#7D7D7D', '#BFBFBF', '#E6E6E6', '#F5F5F5']; // Black and various shades of gray

// Define gradient colors for areas in black & white
const gradientColors = [
    { id: 'complaints', color: '#000000' },        // Black
    { id: 'consumerComplaints', color: '#7D7D7D' }, // Dark gray
    { id: 'cyberCrime', color: '#BFBFBF' },         // Medium gray
];

// Define dummy data for area chart
const areaChartData = [
    { date: '2024-01', complaints: 30, consumerComplaints: 20, cyberCrime: 120 },
    { date: '2024-02', complaints: 20, consumerComplaints: 30, cyberCrime: 20 },
    { date: '2024-03', complaints: 50, consumerComplaints: 60, cyberCrime: 30 },
    { date: '2024-04', complaints: 80, consumerComplaints: 50, cyberCrime: 30 },
    { date: '2024-05', complaints: 120, consumerComplaints: 90, cyberCrime: 10 },
];

const Dashboard = () => {
    const {
        collapsed,
    } = useSidebar();

    // Dummy data for pie chart
    const pieChartData = [
        { name: 'Public Safety', value: 400 },
        { name: 'Consumer Complaints', value: 300 },
        { name: 'Cyber Crime', value: 300 },
        { name: 'Critical Infrastructure', value: 200 },
        { name: 'Environmental Issues', value: 100 },
    ];

    return (
        <div id={`${collapsed ? 'heroSection' : 'hero'}`} className="hero">
            <div id="tableContY" className='compSection'>
                <StyledContainer style={{ minWidth: collapsed ? '84vw' : '', marginLeft: collapsed ? '-40px' : '', transition: '.4s ease' }} className='Bigcontainer' maxWidth="sm">
                    <Heading component="h2">Minimal Complaints Dashboard </Heading>
                  
                    <ChartBox>
                        {/* <Title>Complaint Categories</Title> */}
                        <Subtitle>Breakdown of Complaints by Type</Subtitle>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                    animationBegin={0}
                                    animationDuration={800}
                                    animationEasing="ease-in-out"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value} complaints`, name]} />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconSize={10}
                                    layout="horizontal"
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartBox>
                    <ChartBox>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Complaints Over Time
                        </Typography>
                        <ResponsiveContainer width="100%" height={400}>
                            <AreaChart
                                data={areaChartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {gradientColors.map(({ id, color }) => (
                                    <defs key={id}>
                                        <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                                        </linearGradient>
                                        <Area type="monotone" dataKey={id} stroke={color} fill={`url(#${id})`} />
                                    </defs>
                                ))}
                                <Area type="monotone" dataKey="complaints" stroke="#0088FE" fill="url(#complaints)" />
                                <Area type="monotone" dataKey="consumerComplaints" stroke="#00C49F" fill="url(#consumerComplaints)" />
                                <Area type="monotone" dataKey="cyberCrime" stroke="#FFBB28" fill="url(#cyberCrime)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartBox>
                </StyledContainer>
            </div>
        </div>
    );
};

export default Dashboard;
