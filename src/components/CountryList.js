import React, { Component } from "react";
import axios from "axios";
import Search from "./Search";
import CountryCard from "./CountryCard";

class CountryList extends Component {
  state = {
    countries: [],
    value: "",
    isLoading: false,
    sortBy: "countryname",
  };

  url =
    "https://restcountries.com/v2/all?fields=name,capital,population,languages,flags";

  searchHandler = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  setSortParam = (event) => {
    this.setState({
      sortBy: event.target.value,
    });
  };

  useSortParams = (a, b) => {
    if (this.state.sortBy === "countryname") {
      return a.name.localeCompare(b.name);
    }
    if (this.state.sortBy === "population") {
      return a.population - b.population;
    }
    if (this.state.sortBy === "language") {
      console.log(a.languages[0].name + " " + b.languages[0].name);
      return a.languages[0].name.localeCompare(b.languages[0].name);
    }
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    axios.get(this.url).then((res) => {
      this.setState({
        countries: res.data,
        isLoading: false,
        value: "",
      });
    });
  }

  render() {
    const countryList = this.state.countries
      .filter((c) =>
        c.name
          .toLocaleLowerCase()
          .includes(this.state.value.toLocaleLowerCase())
      )
      .sort(this.useSortParams)
      .map((country, index) => {
        return <CountryCard key={index} {...country} />;
      });
    return (
      <div className="App">
        {this.state.isLoading && <p>loading ...</p>}
        {!this.state.isLoading && (
          <div>
            <div className="info-box">
              <h1>COUNTRIES</h1>
              <Search
                searchHandler={this.searchHandler}
                setSortParam={this.setSortParam}
                value={this.state.value}
              />
            </div>
            <div className="country-list info-box">{countryList}</div>
          </div>
        )}
      </div>
    );
  }
}

export default CountryList;
