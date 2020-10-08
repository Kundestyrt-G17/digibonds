import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import About from './routes/About';
import WelcomePage from './routes/WelcomePage';
import VoteNowPage from './routes/VoteNowPage';
import Login from './routes/Login';
import { UserFetch } from './components/LoginForm/LoginForm';

const App = () => {
  const [userData, setUserData] = useState<UserFetch | undefined>();

  const pageToShow = () => {
    if (!userData?.user) {
      return <Login setUserData={setUserData} />
    }
    return <WelcomePage/>
  }

  return (
    <BrowserRouter>
      <Header userData={userData} setUserData={setUserData} />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <Login setUserData={setUserData} />
        </Route>
        <Route path="/vote">
          <VoteNowPage />
        </Route>
        <Route path="/">
          {pageToShow}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
