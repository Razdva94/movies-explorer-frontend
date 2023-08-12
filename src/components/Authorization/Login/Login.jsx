import React from 'react';
import Register from '../Register/Register';

const Login = ({ inputs, margin, sayHi, button, onLoggedIn, updateContextValue }) => {
  return (
    <Register
      updateContextValue={updateContextValue}
      inputs={inputs}
      margin={margin}
      sayHi={sayHi}
      button={button}
      onLoggedIn={onLoggedIn}
    />
  );
};

export default Login;
