import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Converter.css';
import fx from 'money';

class Converter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      result: null,
      rates: {},
    };
  }

  componentDidMount() {
    fetch('https://api.frankfurter.app/latest')
      .then(response => response.json())
      .then(data => {
        fx.rates = data.rates;
        fx.base = data.base;
        this.setState({ rates: { EUR: 1, ...data.rates } });
      });
  }

  handleConvert = () => {
    const { amount, fromCurrency, toCurrency } = this.state;
    const convertedAmount = fx(amount).from(fromCurrency).to(toCurrency);
    this.setState({ result: convertedAmount });
  };

  handleSwitch = () => {
    this.setState(prevState => ({
      fromCurrency: prevState.toCurrency,
      toCurrency: prevState.fromCurrency,
    }));
  };

  handleChangeAmount = (e) => {
    this.setState({ amount: e.target.value });
  };

  handleChangeFromCurrency = (e) => {
    this.setState({ fromCurrency: e.target.value });
  };

  handleChangeToCurrency = (e) => {
    this.setState({ toCurrency: e.target.value });
  };

  render() {
    const { amount, fromCurrency, toCurrency, result, rates } = this.state;

    return (
      <div className="converter">
        <div className="container">
          <div className="form-row">
            <input
              type="number"
              value={amount}
              onChange={this.handleChangeAmount}
              placeholder="Amount"
              className="form-control"
            />
            <select
              className="form-select"
              value={fromCurrency}
              onChange={this.handleChangeFromCurrency}
            >
              {Object.keys(rates).map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <button className="switch-button" onClick={this.handleSwitch}>
              <i className="fa-solid fa-arrow-right-arrow-left"></i>
            </button>
            <select
              className="form-select"
              value={toCurrency}
              onChange={this.handleChangeToCurrency}
            >
              {Object.keys(rates).map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <button className="convert-button" onClick={this.handleConvert}>
            Convert
          </button>
          <div className="result">
            {result && (
              <p>
                {amount} {fromCurrency} = {result.toFixed(4)} {toCurrency}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Converter;
