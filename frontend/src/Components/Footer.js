// import React from 'react'

// export default function Footer() {
//   return (
//     <div>

//     </div>
//   )
// }
// Footer.js

import React from 'react';
import { Typography, Container, Grid } from '@mui/material';

const Footer = () => {
  return (
    <footer className="footer-root"> {/* Use className to apply styles */}
      <Container maxWidth="lg" className="footer-container">
        <Grid container spacing={4} className='footerMainGrid'>
          <Grid item xs={12} sm={6} className="footer-grid-item">
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              78945612300
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className="footer-grid-item">
            <Typography variant="h6" gutterBottom>
              Bhojon at your food Service
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" className='textWeb' align="center">
          {'© '}
          {new Date().getFullYear()}
          {' BHOJON. All rights reserved.'}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
