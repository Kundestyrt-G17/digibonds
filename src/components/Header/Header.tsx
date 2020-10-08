import React from 'react';
import './Header.css';
import { UserFetch } from '../LoginForm/LoginForm';

interface Props {
  userData: UserFetch | undefined;
}

const Header = (props: Props) => {
  console.log(props.userData);
  return (
    <div className="header">
      <h1>TenBond</h1>
      <div>
        {props.userData &&
        <h3>{props.userData.username}</h3>
        }
      </div>
    </div>
  );
};


export default Header;
