import React, { Component } from "react";
import Select from "react-select";
import ApiService from "service/ApiService";

export default class AgeOfBusinessFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      ageOfBusiness: [],
      selectedOptions: []
    };
    this.getData("");
  }

  handleOnChange = selectedValues => {
    this.setState({ selectedOptions: [] });
    this.setState({ selectedOptions: selectedValues });
  };

  getData = searchText => {
    //debugger;
    ApiService.filtersAgeOfBusiness(searchText)
      .then(res => {
        return res.data;
      })
      .then(data => {
        //console.log("data:" + data);
        this.setState({ ageOfBusiness: data });
      });
    //}
  };

  render() {
    return (
      <Select
        name="ageOfBusinessFilter"
        placeholder="Select Age Of Business"
        options={this.state.ageOfBusiness.map(opt => ({
          label: opt.label,
          value: opt.label
        }))}
        isMulti={true}
        cacheOptions
        defaultOptions={false}
        onChange={this.handleOnChange}
      />
    );
  }
}
