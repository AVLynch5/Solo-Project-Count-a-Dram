import React from 'react';
import './AboutPage.css';
import {Paper} from '@mui/material';
import {Grid} from '@mui/material';
import Image from './whiskey_dram_thumbnail.png';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <>
    <div className="wholePage">
        <Paper className="pageContainer" elevation={10} sx={{backgroundColor: '#F09F41'}}>
          <Grid container /* justifyContent="space-between" */>
            <Grid item lg={3} md={2} sm={2} xs={1}>
              <img className="image-thumbnail" src={Image} alt="thumbnail" />
            </Grid>
            <Grid item lg={6} md={8} sm={8} xs={10}>
              <div className="text-Space">
                <h3>Welcome to Count A Dram!</h3>
                <ul>
                  <li>To get started, click 'Count A Dram' in the upper left-hand corner to register. You can still use the calorie calculator in 'Add A Dram' without logging in!</li>
                  <li>Click 'Add A Dram' to calculate the calories in a dram of whiskey. If you're logged in, you can 'register' your dram to be viewed and analyzed later.</li>
                  <li>Click 'View Drams' to view your 'registered' drams. Click on a date to view any drams registered on that date. Drams can be edited and/or deleted!</li>
                  <li>Click 'Analyze Drams' to view your 'registered' dram data in a bar chart format. Click two dates on the calendar then click 'plot data' to display the sum calorie and dram data for each date between the selected dates in the bar chart.</li>
                  <li>Sláinte!</li>
                </ul>
              </div>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={1} className="Right">
              <img className="image-thumbnail" src={Image} alt="thumbnail" />
            </Grid>
          </Grid>
        </Paper>
    </div>
    </>
  );
}

export default AboutPage;
