import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Converter from './Converter';
import Currencies from './Currencies';
import Footer from './Footer';
import CurrencyRates from './CurrencyRates';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Converter} />
            <Route path="/currencies" component={Currencies} />
            <Route path="/rates" component={CurrencyRates} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
