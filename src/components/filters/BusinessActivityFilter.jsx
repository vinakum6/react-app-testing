import React, { Component } from "react";
import Select from "react-select";
import ApiService from "service/ApiService";

export default class BusinessActivityFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      businessActivities: [],
      selectedOptions: []
    };
    this.handleOnChange = this.handleOnChange.bind(this);

    this.getData("");
  }

  getData = searchText => {
    ApiService.filtersBusinessActivity(searchText)
      .then(res => {
        return res.data;
      })
      .then(data => {
        //console.log("data:" + data);
        this.setState({ businessActivities: data });
      });
  };

  handleOnChange = selectedValues => {
    //debugger;
    //this.setState({ selectedOptions: [] });
    this.setState({ selectedOptions: selectedValues });
  };

  render() {
    //console.log("Executing ba");

    return (
      <Select
        isMulti
        options={this.state.businessActivities.map(opt => ({
          label: opt.label,
          value: opt.label
        }))}
        defaultOptions={false}
        onChange={this.handleOnChange}
        placeholder="Select Business Activity"
        cacheOptions
        name="businessActivityFilter"
      />
    );
  }
}
