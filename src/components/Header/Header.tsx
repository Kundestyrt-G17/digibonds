import React from 'react';
import './Header.css';
import { UserFetch } from '../LoginForm/LoginForm';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Props {
  userData: UserFetch | undefined;
  setUserData: (userFetch: UserFetch | undefined) => void;
}

const Header = (props: Props) => {
  return (
    <div className="header">
      <h1>Meglo</h1>
      <div>
        {props.userData && (
          <span>
            <h3>{props.userData?.user.username}</h3>
            <h5>{props.userData?.user.isBroker ? 'megler' : ''}</h5>
            <Button onClick={() => props.setUserData(undefined)}>
              <Link to="/">LogOut</Link>
            </Button>
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
