import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Converter.css';
import fx from 'money';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

class Converter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      result: null,
      rates: {},
      showGraphButton: false,
      showGraph: false,
      chartData: null,
    };
    this.chartRef = React.createRef();
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
    this.setState({ result: convertedAmount, showGraphButton: true });
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

  getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[quote]);
        const chartLabel = `${base}/${quote}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
  }

  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext("2d");
  
    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }
  
    this.chart = new Chart(chartRef, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            tension: 0.1,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: 'white'
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: 'white'
            }
          }
        }
      }
    });
  }
  

  handleGetGraph = () => {
    const { fromCurrency, toCurrency } = this.state;
    this.getHistoricalRates(fromCurrency, toCurrency);
    this.setState({ showGraph: true });
  }

  render() {
    const { amount, fromCurrency, toCurrency, result, rates, showGraphButton, showGraph } = this.state;

    return (
      <div className="converter">
        <div className="headline">
          <h2>Currency Converter</h2>
        </div>
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
          {result && (
            <div className="result">
              <p>
                {amount} {fromCurrency} = {result.toFixed(4)} {toCurrency}
              </p>
              {showGraphButton && (
                <button className="get-graph-button" onClick={this.handleGetGraph}>
                  Get Graph
                </button>
              )}
            </div>
          )}
          {showGraph && (
            <div className="chart-container">
              <canvas ref={this.chartRef} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Converter;
