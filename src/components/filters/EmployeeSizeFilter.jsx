import React, { Component } from "react";
import Select from "react-select";
import ApiService from "service/ApiService";

export default class EmployeeSizeFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      employeeSizeBands: [],
      selectedOptions: []
    };
    this.getData("");
  }

  getData = searchText => {
    ApiService.filtersEmployeeSize(searchText)
      .then(res => {
        return res.data;
      })
      .then(data => {
        //console.log("data:" + data);
        this.setState({ employeeSizeBands: data });
      });
  };

  handleOnChange = selectedValues => {
    this.setState({ selectedOptions: [] });
    this.setState({ selectedOptions: selectedValues });
  };

  render() {
    return (
      <Select
        name="employeeSizeFilter"
        placeholder="Select Employee Size"
        options={this.state.employeeSizeBands.map(opt => ({
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
