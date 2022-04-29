import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import Drawer from '../Drawer/Drawer';

function Nav() {
  const user = useSelector((store) => store.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Count A Dram</h2>
      </Link>
      {isMobile ? (
        <Drawer />
      ) : (
        <div>
          {/* If no user is logged in, show these links */}
          {!user.id && (
            <>
              {/* If there's no user, show login/registration links */}
              <Link className="navLink" to="/login">
                Login/Register
              </Link>
            </>
          )}

          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <Link className="navLink" to="/user">
                Home
              </Link>
            </>
          )}

          <Link className="navLink" to="/about">
            About
          </Link>

          <Link className="navLink" to="/adddram">
            Add a Dram
          </Link>

          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <Link className="navLink" to="/viewdrams">
                View Drams
              </Link>

              <Link className="navLink" to="/analyzedrams">
                Analyze Drams
              </Link>

              <Link className="navLink" to="/whiskeylist">
                Whiskey List
              </Link>

              {/*<Link className="navLink" to="/info">
                Info Page
              </Link>*/}

              <LogOutButton className="navLink" />
            </>
          )}

          
        </div>
      )}
    </div>
  );
}

export default Nav;
