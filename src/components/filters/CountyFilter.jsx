import React, { Component } from "react";
import Select from "react-select";
import ApiService from "service/ApiService";

let isLoadingExternal = false;

export default class CountyFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      county: [],
      selectedOptions: []
    };
    isLoadingExternal = true;
    this.getData("");
  }

  getData = searchText => {
    ApiService.filtersCounty(searchText)
      .then(res => {
        return res.data;
      })
      .then(data => {
        //console.log("data:" + data);
        this.setState({ county: data });
        isLoadingExternal = false;
      });
  };

  handleOnChange = selectedValues => {
    this.setState({ selectedOptions: [] });
    this.setState({ selectedOptions: selectedValues });
  };

  render() {
    return (
      <Select
        name="countyFilter"
        placeholder="Select County"
        options={this.state.county.map(opt => ({
          label: opt.label,
          value: opt.label
        }))}
        isMulti
        cacheOptions
        onChange={this.handleOnChange}
        //isLoading={isLoadingExternal}
      />
    );
  }
}
