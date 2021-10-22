import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { Paper } from '@mui/material';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('First, a Toast!');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <Paper className="pageContainer" elevation={10} sx={{backgroundColor: '#F09F41'}}>
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>”Life is a waste of time. Time is a waste of life. So why not get wasted all the time, and have the time of our life.”</p>
          <p>”Here’s to lying, cheating, stealing, and drinking…If you’re going to lie, lie for a friend. If you’re going to cheat, cheat death. If you’re going to steal, steal a heart. If you’re going to drink, drink with me.”</p>
          <p>“There are good ships, and there are wood ships, ships that sail the sea, but the best ships are friendships, and may they always be.”</p>
          <p>"Keep your head cool and your feet warm, and a glass of good whiskey will do you no harm."</p>
          <p>"Here's to Miguel de Cervantes who said, "I drink when I have occasion and sometimes when I have no occasion.”</p>
          <p>"One glass is wholesome, two glasses toothsome, three glasses blithesome, four glasses fulsome, five glasses noisome, six glasses quarrelsome, seven glasses darksome."</p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
    </Paper>
  );
}

export default LandingPage;
