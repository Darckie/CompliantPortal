import React from 'react';
import homebackground from '../img/illustrationx.jpg';
import styled from 'styled-components';
import { useStyles } from '../css/globalcss';
import '../App.css';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const ImgCont = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content:space-between;
  width: 85%;
  height: 100vh;
  position:absolute;

`;
const Container = styled.div`
  display: flex;
  margin-top:5%;
  align-items: flex-start;
  flex-direction: row;
  justify-content:center;
  width:74%;
  height: 100%;
  img {
    height: auto;
    width: 58%;
    margin-top:-40px;
  }
`;
const Box = styled.div`
display:flex;
width:100%;
margin-top:50px;
flex-direction:column;
color:#1e201e;

p{
font-size:1rem;
font-family: "Recursive", sans-serif;
font-weight:500;
opacity:.7;
}
h1{
font-size:45px}

`

const ButtonContext = styled.div`
display:flex;
height:100%;
margin-top:50px;
align-items:flex-end;

gap:10px;
.btn {
 display: inline-block;
 padding: 0.9rem 1.8rem;
 font-size: 16px;
 font-weight: 700;
 width:180px;
 color: white;
 border: 2px solid rgb(33 195 25);
 cursor: pointer;
 border-radius:4px;
 position: relative;
 color:rgb(133 133 124);
 background-color: transparent;
 text-decoration: none;
 overflow: hidden;
 z-index: 1;
 font-family: inherit;
}

.btn::before {
 content: "";
 position: absolute;
 left: 0;
 top: 0;
 width: 100%;
 height: 100%;

 background-color: black;
 transform: translateX(-100%);
 transition: all .3s;
 z-index: -1;
}

.btn2::before{

 background-color: white ;
}

.btn:hover::before {
 transform: translateX(0);
 color:white;
}
`

const Home = () => {

    const navigate = useNavigate();

    const gotocomplaint = () => {
        navigate('/CompliantPortal/Dashboard');
    }


    const gotocomplaint2 = () => {
        navigate('/CompliantPortal/ComplaintBoard');
    }

    const styles = useStyles();
    return (
        <>


            <div style={{ backgroundColor: 'white', margin: '0px', overflow: 'hidden' }} className='hero'>
                <ImgCont>
                    {/* <h3 className='heading'>
                    Register Your Complaint
                </h3> */}
                    <Container>
                        <Box>
                            <h1>Public Compliant Web Portal</h1>
                            <p>Empowering citizens to voice concerns and track resolutions for a better communit.
                            </p>
                            <span style={{ color: 'red', fontSize: '13.5px', fontWeight: '500' }}>(Please note that some functions may not work as intended.) </span>
                            <ButtonContext>

                                <button onClick={gotocomplaint} className='btn'>Explore</button>
                                <button onClick={gotocomplaint2} style={{ borderColor: '#312f', backgroundColor: 'rgb(84 91 84)', color: 'lightblue' }} className='btn btn2'>Complaint</button>
                            </ButtonContext>
                        </Box>
                        <img src={homebackground} alt="Background" />

                    </Container>

                </ImgCont>


            </div>
            {/* <Footer /> */}
        </>
    );
};

export default Home;
