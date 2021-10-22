import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('First, a Toast!');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <Paper className="pageContainer" elevation={10} sx={{ backgroundColor: '#F09F41' }}>
      <div className="container">
        <h2>{heading}</h2>
        <Grid container>
          <Grid item lg={9} md={6} sm={12} xs={12}>
            <div>
              <p>"We come into the world naked and bare, We go through the world with trouble and care, We depart from the world to we know not where, But if you're a thoroughbred here, you're a thoroughbred there." - Dan Jenkins</p>
              <p>”Here’s to lying, cheating, stealing, and drinking…If you’re going to lie, lie for a friend. If you’re going to cheat, cheat death. If you’re going to steal, steal a heart. If you’re going to drink, drink with me.”</p>
              <p>“There are good ships, and there are wood ships, ships that sail the sea, but the best ships are friendships, and may they always be.”</p>
              <p>"Keep your head cool and your feet warm, and a glass of good whiskey will do you no harm."</p>
              <p>"May you live as long as you want and never want as long as you live!”</p>
              <p>”May the best you've ever seen Be the worst you'll ever see; May a moose ne'er leave yer girnal Wi' a teardrop in his e'e. May ye aye keep hale and hearty Till ye're auld enough tae dee, May ye aye be just as happy As I wish ye aye tae be.” - Allan Ramsay of Ayr</p>
            </div>
          </Grid>
          <Grid item lg={3} md={6} sm={12} xs={12}>
            <div>
              <RegisterForm />

              <center>
                <h4>Already a Member?</h4>
                <button className="btn btn_sizeSm" onClick={onLogin}>
                  Login
                </button>
              </center>
            </div>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

export default LandingPage;
