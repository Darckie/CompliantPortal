import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import samparkLogo from '../img/attach.png'
import '../css/footer.css';

const Footer = () => {
  return (
    <Box className="footer">
      <Container className='footer' maxWidth="lg">
        <Grid id="fcont" container spacing={19}>
         
          <Grid item xs={12} sm={6}  className="social-media">
   
            <img height={76} src={samparkLogo} alt="" />
         
            <div className="icon-container">
              <IconButton aria-label="Facebook" className="icon">
                <Facebook fontSize="mediam" />
              </IconButton>
              <IconButton aria-label="Twitter" className="icon">
                <Twitter fontSize="mediam" />
              </IconButton>
              <IconButton aria-label="Instagram" className="icon">
                <Instagram fontSize="mediam" />
              </IconButton>
              <IconButton aria-label="LinkedIn" className="icon">
                <LinkedIn fontSize="mediam" />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Box className="footer-bottom">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Test Pvt. Ltd. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
