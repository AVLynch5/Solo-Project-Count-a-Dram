import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import {TextField} from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <TextField
            type="text"
            name="username"
            label="Username"
            required
            value={username}
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
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            inputProps={{style: { fontSize: 18 }}}
            InputLabelProps={{ style: { fontSize: 18 } }}
            size="small"
            sx={{marginBottom: 0.75}}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  );
}

export default LoginForm;
