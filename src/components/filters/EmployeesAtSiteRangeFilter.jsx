import React, { Component } from "react";
import Select from "react-select";
import ApiService from "service/ApiService";

export default class EmployeesAtSiteRangeFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      employeesAtSiteRange: [],
      selectedOptions: []
    };
    this.getData("");
  }

  getData = searchText => {
    ApiService.filtersEmployeeAtSiteRange(searchText)
      .then(res => {
        return res.data;
      })
      .then(data => {
        //console.log("data:" + data);
        this.setState({ employeesAtSiteRange: data });
      });
  };

  handleOnChange = selectedValues => {
    this.setState({ selectedOptions: [] });
    this.setState({ selectedOptions: selectedValues });
  };

  render() {
    return (
      <Select
        name="employeesAtSiteRangeFilter"
        placeholder="Select Employees At Site Range"
        options={this.state.employeesAtSiteRange.map(opt => ({
          label: opt.label,
          value: opt.label
        }))}
        isMulti={true}
        cacheOptions
        onChange={this.handleOnChange}
      />
    );
  }
}
