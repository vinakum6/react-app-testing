import React, { Component } from "react";
import Select from "react-select";
import ApiService from "service/ApiService";

export default class RevenueRangeFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      revenueRange: [],
      selectedOptions: []
    };
    this.getData("");
  }

  getData = searchText => {
    ApiService.filtersRevenueRange(searchText)
      .then(res => {
        return res.data;
      })
      .then(data => {
        //console.log("data:" + data);
        this.setState({ revenueRange: data });
      });
  };

  handleOnChange = selectedValues => {
    this.setState({ selectedOptions: [] });
    this.setState({ selectedOptions: selectedValues });
  };
  render() {
    return (
      <Select
        name="revenueRangeFilter"
        placeholder="Select Revenue Range"
        options={this.state.revenueRange.map(opt => ({
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
