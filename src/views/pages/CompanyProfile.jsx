import React from "react";
// import Select from "react-select";
// import AsyncSelect from "react-select/async";
import ApiService from "service/ApiService";

import queryString from "query-string";

export default class Profile extends React.Component {
  // console.log("Constructor company name" + queryParams.companyName);
  //   let companyName = queryParams.companyName;

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      organization: []
    };
    const queryParams = queryString.parse(this.props.location.search);
    const companyName = queryParams.companyName;
    this.getOrgDetails(companyName);
  }

  getOrgDetails = companyName => {
    if (companyName === undefined || companyName.trim() === "") {
      return;
    }
    let data = {};
    data.companyName = companyName;
    console.log("company name" + companyName);
    ApiService.organizationDetails(data).then(res => {
      if (res.status === 200) {
        console.log(res);
        this.setState({ organization: res.data });
      }
    });
  };

  render() {
    return (
      <div className="marginT-5">
        <div className="row">
          <div className="col">
            <a href="companySearch">Back to search</a>
          </div>
        </div>
        <div className="row">
          <div className="col mb-2"></div>
          <div className="col mb-2  text-center">
            {/* <Select
              name="ageOfBusinessFilter"
              placeholder="Select Organization"
              onChange={this.handleChange}
              options={options}
            /> */}
            {/* <AsyncSelect
              name="ageOfBusinessFilterAsync"
              loadOptions={getCompanies}
              cacheOptions
              defaultOptions
              onInputChange={this.handleChange}
            /> */}
          </div>

          <div className="col"></div>
        </div>
        {Object.keys(this.state.organization).length > 0 ? (
          <div className="card m-1">
            <div className="row">
              <div className="col-md-2 mt-4 ml-5">
                <img
                  alt={this.state.organization["name"]}
                  src={this.state.organization["logo_url"]}
                />
              </div>
              <div className="col-md-9">
                <h2 className="text-primary mt-4">
                  {this.state.organization["name"]}
                </h2>
                <p className="text-dark font-weight-bold">
                  {this.state.organization["short_description"]}
                </p>
                <hr />
                <p className="text-warning font-weight-bold mb-4">
                  {this.state.organization["city"]} |{" "}
                  {this.state.organization["state_code"]} |{" "}
                  {this.state.organization["country_code"]}{" "}
                </p>
              </div>
            </div>
            <div>
              <hr />
              <div className="text-info font-weight-bold">
                <label className="col-form-label col-md-2 ml-5">
                  Categories
                </label>{" "}
                :{" "}
                <label className="col-form-label text-primary col-md-8">
                  {this.state.organization["category_list"]}
                </label>
              </div>
              <div className="text-info font-weight-bold">
                <label className="col-form-label col-md-2 ml-5">
                  Founded Date
                </label>{" "}
                :{" "}
                <label className="col-form-label text-primary col-md-8">
                  {this.state.organization["founded_on"]}
                </label>
              </div>
              <div className="text-info font-weight-bold">
                <label className="col-form-label col-md-2 ml-5">
                  Number of Employees
                </label>{" "}
                :{" "}
                <label className="col-form-label text-primary col-md-8">
                  {this.state.organization["employee_count"]}
                </label>
              </div>
              <div className="text-info font-weight-bold">
                <label className="col-form-label col-md-2 ml-5">
                  Legal Name
                </label>{" "}
                :{" "}
                <label className="col-form-label text-primary col-md-8">
                  {this.state.organization["legal_name"]}
                </label>
              </div>
              <hr />
              <div className="text-info font-weight-bold">
                <label className="col-form-label col-md-2 ml-5">Website</label>{" "}
                :{" "}
                <a
                  href={this.state.organization["homepage_url"]}
                  className="col-form-label text-primary col-md-8"
                >
                  {this.state.organization["homepage_url"]}
                </a>
              </div>
              <div className="text-info font-weight-bold">
                <label className="col-form-label col-md-2 ml-5">Facebook</label>{" "}
                :{" "}
                <a
                  href={this.state.organization["facebook_url"]}
                  className="col-form-label text-primary col-md-8"
                >
                  View on Facebook
                </a>
              </div>
              <div className="text-info font-weight-bold">
                <label className="col-form-label col-md-2 ml-5">
                  Linked In
                </label>{" "}
                :{" "}
                <a
                  href={this.state.organization["linkedin_url"]}
                  className="col-form-label text-primary col-md-8"
                >
                  View on LinkedIn
                </a>
              </div>
              <div className="text-info font-weight-bold">
                <label className="col-form-label col-md-2 ml-5">Twitter</label>{" "}
                :{" "}
                <a
                  href={this.state.organization["twitter_url"]}
                  className="col-form-label text-primary col-md-8"
                >
                  View on Twitter
                </a>
              </div>
              <div className="text-info font-weight-bold">
                <label className="col-form-label col-md-2 ml-5">
                  Contact Email
                </label>{" "}
                :{" "}
                <label className="col-form-label text-primary col-md-8">
                  {this.state.organization["email"]}
                </label>
              </div>
              <div className="text-info font-weight-bold">
                <label className="col-form-label col-md-2 ml-5">
                  Phone Number
                </label>{" "}
                :{" "}
                <label className="col-form-label text-primary col-md-8">
                  {this.state.organization["phone"]}
                </label>
              </div>
              <hr />
              <div className="text-info font-weight-bold">
                <p className="text-dark font-weight-bold ml-5">
                  {this.state.organization["short_description"]}
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
