import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import About from './routes/About';
import Overview from './routes/Overview';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Overview />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
