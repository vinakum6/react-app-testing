import React, { Component } from "react";
import Select from "react-select";
import ApiService from "service/ApiService";

export default class BusinessTypeFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      businessType: [],
      selectedOptions: []
    };
    this.getData("");
  }

  getData = searchText => {
    ApiService.filtersBusinessType(searchText)
      .then(res => {
        return res.data;
      })
      .then(data => {
        //console.log("data:" + data);
        this.setState({ businessType: data });
      });
  };

  handleOnChange = selectedValues => {
    this.setState({ selectedOptions: [] });
    this.setState({ selectedOptions: selectedValues });
  };

  render() {
    let selectOptions = [];
    ApiService.filtersBusinessType().then(function(response) {
      response.data.map(options =>
        selectOptions.push({ value: options.id, label: options.businessType })
      );
    });
    return (
      <Select
        name="businessTypeFilter"
        placeholder="Select Business Type"
        options={this.state.businessType.map(opt => ({
          label: opt.label,
          value: opt.value
        }))}
        isMulti={true}
        cacheOptions
        onChange={this.handleOnChange}
      />
    );
  }
}
