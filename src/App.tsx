import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import About from './routes/About';
import WelcomePage from './routes/WelcomePage';
import Login from './routes/Login';
import { UserFetch } from './components/LoginForm/LoginForm';

const App = () => {
  const [userData, setUserData] = useState<UserFetch>();

  return (
    <BrowserRouter>
      <Header userData={userData}/>
      <Switch>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/login">
          <Login setUserData={setUserData}/>
        </Route>
        <Route path="/">
          {userData && <WelcomePage/>}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
