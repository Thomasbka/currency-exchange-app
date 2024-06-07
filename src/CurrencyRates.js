import React, { Component } from 'react';
import './CurrencyRates.css';

class CurrencyRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rates: {},
      baseCurrency: 'USD',
    };
  }

  componentDidMount() {
    this.fetchRates();
  }

  fetchRates = () => {
    fetch(`https://api.frankfurter.app/latest?from=${this.state.baseCurrency}`)
      .then(response => response.json())
      .then(data => this.setState({ rates: data.rates }));
  };

  handleChangeBaseCurrency = (e) => {
    this.setState({ baseCurrency: e.target.value }, this.fetchRates);
  };

  render() {
    const { rates, baseCurrency } = this.state;

    return (
      <div className="currency-rates-container mt-5">
        <h1 className="currency-rates-title">Currency Rates</h1>
        <div className="form-group">
          <label htmlFor="baseCurrency">Base Currency:</label>
          <select
            id="baseCurrency"
            className="form-control"
            value={baseCurrency}
            onChange={this.handleChangeBaseCurrency}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <table className="currency-rates-table mt-3">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rates).map(([currency, rate]) => (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{rate.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CurrencyRates;
