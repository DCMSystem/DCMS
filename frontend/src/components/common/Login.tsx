import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import useInput from 'lib/useInput';
import { Button } from '@material-ui/core';
import { getLogin } from 'app/user/userThunk';
// import { encrypt } from 'lib/crypto';
import { useDispatch } from 'react-redux';

function Login() {
  const [id, setId] = useInput('');
  const [password, setPassword] = useInput('');
  const dispatch = useDispatch();

  const onButtonClick = () => {
    dispatch(getLogin({ id, password }));
  };

  useEffect(() => {
    window.localStorage.removeItem('info');
  }, []);

  return (
    <div className="login-wrapper">
      <div className="title">DCMS</div>
      <div className="login-box">
        <TextField label="ID" fullWidth value={id} onChange={setId} />
        <TextField
          label="PASSWORD"
          type="password"
          fullWidth
          value={password}
          onChange={setPassword}
        />
        <Button variant="outlined" color="primary" onClick={onButtonClick}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
