import React, { Component } from "react";

import BusinessActivityFilter from "components/filters/BusinessActivityFilter";
import SIC2007Filter from "components/filters/SIC2007Filter";
import CountyFilter from "components/filters/CountyFilter";
import CityFilter from "components/filters/CityFilter";
import RevenueRangeFilter from "components/filters/RevenueRangeFilter";
import EmployeeSizeFilter from "components/filters/EmployeeSizeFilter";
import EmployeesAtSiteRangeFilter from "components/filters/EmployeesAtSiteRangeFilter";
import AgeOfBusinessFilter from "components/filters/AgeOfBusinessFilter";
import BusinessTypeFilter from "components/filters/BusinssTypeFilter";
import ApiService from "service/ApiService";
import {withRouter} from 'react-router-dom';

class CountSystemFilter extends Component {
  constructor(props) {
    super(props);
    this.filterCriteria = this.filterCriteria.bind(this);
    this.state = { 
      graphData: [] ,
      orderStatus : true,
      loading : false,
      filterDetails : [],
      filterQuery : [],
    };
  }

  filterCriteria = e => {
    //enable loading icon
    this.setState({loading : true, orderStatus : true})
    e.preventDefault();
    const data = new FormData(e.target);
    var filterDetails = {};
    //When multiple values are selected in filter dropdowns, add them to array
    data.forEach((value, key) => {
      //debugger;
      if (!(key in filterDetails)) {
        if (value.trim().length > 0) {
          //Add only non empty values into array
          filterDetails[key] = [value];
        }
      } else {
        if (value.trim().length > 0) {
          //Add only non empty values into array
          filterDetails[key].push(value);
        }
      }
    });
    ApiService.filtersSearch(filterDetails).then(res => {
      if (res.status === 200) {
        this.setState({ graphData: res.data.graphData, orderStatus : false, filterDetails : filterDetails, loading : false, filterQuery : res.data.filterQuery});
        this.updateCount();
      } else {
        this.setState({ message: "Internal Error", loading : false });
      }
    });
  };

  placeOrder = () => {
    this.props.history.push({
      pathname: '/admin/OrderForm',
      data: {filterDetails : this.state.filterDetails, graphData : this.state.graphData, filterQuery : this.state.filterQuery}
    });
  }

  updateCount = () => {
    this.props.countCallback(this.state.graphData);
  };

  render() {
    return (
      <div className="marginT-8">
        <form onSubmit={this.filterCriteria}>
          <div className="row">
            <div className="col mb-2">
              <BusinessActivityFilter />
            </div>
            <div className="col mb-2">
              <CountyFilter />
            </div>
            <div className="col">
              <SIC2007Filter />
            </div>
          </div>
          <div className="row">
            <div className="col mb-2">
              <RevenueRangeFilter />
            </div>
            <div className="col mb-2">
              <CityFilter />
            </div>
            <div className="col">
              <EmployeesAtSiteRangeFilter />
            </div>
          </div>
          <div className="row">
            <div className="col mb-2">
              <AgeOfBusinessFilter />
            </div>
            <div className="col mb-2">
              <BusinessTypeFilter />
            </div>
            <div className="col">
              <EmployeeSizeFilter />
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-2  text-center">
              { this.state.loading ?
                <button className="btn btn-danger" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  &nbsp; Loading...
                </button>
              :
                <input type="submit" className="btn btn-danger" value="Search" />
              }
              <button className="btn btn-danger" disabled={this.state.orderStatus} onClick={this.placeOrder}> Place Order </button>
            </div>
            <div className="col"></div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CountSystemFilter);