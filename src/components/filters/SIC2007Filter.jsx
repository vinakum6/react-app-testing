import React, { Component } from "react";
import Select from "react-select";
import ApiService from "service/ApiService";

export default class SIC2007Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      sic: [],
      selectedOptions: [],
      isLoading:false
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.getData("");
  }

  handleOnChange = selectedValues => {
    this.setState({ selectedOptions: [] });
    this.setState({ selectedOptions: selectedValues });
  };

  getData = searchText => {
    ApiService.filtersSIC2007(searchText)
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({ sic: data, isLoading : false });
      });
    //}
  };

  render() {
    return (
      <Select
        name="sic2007Filter"
        placeholder="Select SIC 2007"
        options={this.state.sic.map(opt => ({
          label: opt.label,
          value: opt.label
        }))}
        isMulti={true}
        cacheOptions
        onChange={this.handleOnChange}
        //defaultOptions={false}
        //isLoading={this.state.isLoading}
        //onKeyDown={this.handleOnChange}
      />
    );
  }
}
