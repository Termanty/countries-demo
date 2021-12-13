import { Component } from "react";
import axios from "axios";
import React from "react";
import pretierAmount from "../pretierAmout";

class CountryPage extends Component {
  state = {
    country: {},
    weather: {},
    isLoading: true,
    hasCapital: true,
  };

  url = "https://restcountries.com/v2/name/" + this.props.params.id;
  weatherURL = "http://api.weatherstack.com/current";
  api_key = process.env.REACT_APP_API_KEY;

  getWeather = (capital) => {
    const url = `${this.weatherURL}?access_key=${this.api_key}&query=${capital}`;
    return axios.get(url);
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    axios
      .get(this.url)
      .then((res) => {
        const country = res.data[0];
        this.setState({
          country: country,
          hasCapital: country.capital ? true : false,
        });
        return this.getWeather(country.capital);
      })
      .then((res) => {
        this.setState({
          weather: res.data.current,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) return <p>loading ...</p>;

    const {
      name,
      capital,
      languages,
      population,
      flags,
      region,
      currencies,
      topLevelDomain,
    } = this.state.country;

    const w = this.state.hasCapital ? this.state.weather : {};

    return (
      <div className="country-page">
        <div className="info-box">
          <h1 className="country-name">
            {name}
            <img className="flag" src={flags.png} alt="flag" />
          </h1>
        </div>
        {this.state.hasCapital && (
          <div className="info-box">
            <p>
              Weather now {w.observation_time} in <b>{capital}</b> :{" "}
            </p>
            <div className="weather">
              <img
                className="weather-icon"
                src={w.weather_icons[0]}
                alt="weather icon"
              />
              <div className="weather-stats">
                <p>
                  {w.weather_descriptions[0]} {w.temperature} °C
                </p>
                <p>
                  Wind speed {w.wind_speed} m/s from {w.wind_dir}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="info-box">
          <h2>Information</h2>
          <p>
            capital: <b>{capital}</b>
          </p>
          <p>
            languages:{" "}
            {languages.map((l) => (
              <b key={l.name}>{l.name} </b>
            ))}
          </p>
          <p>
            currencies:{" "}
            {currencies.map((l) => (
              <b key={l.name}>{l.name} </b>
            ))}
          </p>
          <p>
            population: <b>{pretierAmount(population)}</b>
          </p>
          <p>
            region: <b>{region}</b>
          </p>
          <p>
            top level domain: <b>{topLevelDomain}</b>
          </p>
        </div>
      </div>
    );
  }
}

export default CountryPage;
