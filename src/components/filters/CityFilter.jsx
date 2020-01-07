import React, { Component } from "react";
import Select from "react-select";
import ApiService from "service/ApiService";

export default class CityFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      cities: [],
      selectedOptions: []
    };
    this.getData("");
  }

  getData = searchText => {
    ApiService.filtersCity(searchText)
      .then(res => {
        return res.data;
      })
      .then(data => {
        //console.log("data:" + data);
        this.setState({ cities: data });
      });
  };

  handleOnChange = selectedValues => {
    this.setState({ selectedOptions: [] });
    this.setState({ selectedOptions: selectedValues });
  };

  render() {
    return (
      <Select
        name="cityFilter"
        placeholder="Select City"
        options={this.state.cities.map(opt => ({
          label: opt.label,
          value: opt.label
        }))}
        isMulti={true}
        onChange={this.handleOnChange}
        cacheOptions
      />
    );
  }
}
