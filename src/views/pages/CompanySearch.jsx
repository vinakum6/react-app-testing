import React from "react";
import ApiService from "service/ApiService";

export default class CompanySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfCompanies: [],
      message: ""
    };
  }

  searchCompany = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    var searchText = "";
    //When multiple values are selected in filter dropdowns, add them to array
    data.forEach((value, key) => {
      //debugger;
      if (key === "companySearchText") {
        searchText = value;
        //break;
      }
    });
    //debugger;
    ApiService.getCompanies(searchText).then(res => {
      //debugger;
      if (res.status === 200) {
        this.setState({ listOfCompanies: res.data });
      } else {
        this.setState({ message: "Internal Error" });
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.searchCompany}>
        <div className="container ">
          <div className="marginT-8 ">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-10">
                        <input
                          className="form-control "
                          type="text"
                          name="companySearchText"
                          placeholder="Enter company name to search"
                        />
                      </div>
                      <div className="col-2">
                        <button type="submit" className="btn btn-danger">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <ul>
                    {this.state.listOfCompanies.map(item => {
                      return (
                        <div className="card">
                          <div className="body">
                            <h5>
                              <a
                                id={item._id}
                                href={"companyProfile?companyName=" + item.name}
                              >
                                {item.name}
                              </a>
                            </h5>
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
