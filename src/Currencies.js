import React, { Component } from 'react';

class Currencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: {},
    };
  }

  componentDidMount() {
    fetch('https://api.frankfurter.app/currencies')
      .then(response => response.json())
      .then(data => this.setState({ currencies: data }));
  }

  render() {
    const { currencies } = this.state;
    return (
      <div>
        <h1>Available Currencies</h1>
        <ul>
          {Object.entries(currencies).map(([code, name]) => (
            <li key={code}>{code}: {name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Currencies;
