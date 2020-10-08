import React from 'react';
import './index.css';

import LoginForm, { UserFetch } from '../../components/LoginForm/LoginForm';

interface Props{
  setUserData: (userFetch: UserFetch) => void;
}

const Login = (props: Props) => (
  <div className="login">
    <LoginForm setUserData={props.setUserData} />
  </div>
);

export default Login;
