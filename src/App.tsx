import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import About from './routes/About';
import WelcomePage from './routes/WelcomePage';
import Footer from './components/Footer/Footer';
import VoteNowPage from './routes/VoteNowPage';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
        <div className="app">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/vote">
                <VoteNowPage />
            </Route>
            <Route path="/">
              <WelcomePage />
            </Route>
          </Switch>
        </div>
    </BrowserRouter>
  );
};

export default App;
