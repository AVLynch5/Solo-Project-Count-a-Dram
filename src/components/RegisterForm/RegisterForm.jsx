import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {TextField} from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <TextField
            type="text"
            name="username"
            label="Username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            inputProps={{style: { fontSize: 18 }}}
            InputLabelProps={{ style: { fontSize: 18 } }}
            size="small"
            sx={{marginBottom: 0.75}}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <TextField
            type="password"
            name="password"
            label="Password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            inputProps={{style: { fontSize: 18 }}}
            InputLabelProps={{ style: { fontSize: 18 } }}
            size="small"
            sx={{marginBottom: 0.75}}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
