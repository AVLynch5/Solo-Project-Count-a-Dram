import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import {Paper} from '@mui/material';
import {Grid} from '@mui/material';
import Image from '../AboutPage/whiskey_dram_thumbnail.png';
import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="wholePage">
        <Paper className="pageContainer" elevation={10} sx={{backgroundColor: '#F09F41'}}>
          <Grid container justifyContent="space-between">
            <Grid item lg={3} xs={12}>
              <img className="image-thumbnail" src={Image} alt="thumbnail" />
            </Grid>
            <Grid item lg={6} xs={12}>
              <div className="userContainer">
                <h2>Welcome, {user.username}!</h2>
                <p>Your ID is: {user.id}</p>
                <LogOutButton className="btn" />
              </div>
            </Grid>
            <Grid item lg={3} xs={12} className="Right">
              <img className="image-thumbnail" src={Image} alt="thumbnail" />
            </Grid>
          </Grid>
        </Paper>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;


