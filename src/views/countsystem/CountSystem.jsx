import React, { Component } from "react";
import CsFilters from "components/filters/CsFilters";
import Dashboard from "views/Dashboard";

export default class CountSystem extends Component {
  constructor(props) {
    super(props);
    this.state = { recordCount: 0, cost: 0 , phoneNumbers: 0, emailCount: 0, employeeList : [], businessTypesList : [], revenueList : []};
  }

  recordCountCallback = (graphData) => {
    let cost = 0;
    let recordCount = 0;
    let phoneNumbers = 0;
    let emailCount = 0;
    let employeeList = [];
    let businessTypesList = [];
    let revenueList = [];
    Object.entries(graphData).map(([key,value],i) => {
        if(key === "employeeList"){
          employeeList = value;
        }
        if(key === "businessTypesList"){
          businessTypesList = value;
        }
        if(key === "revenueList"){
          revenueList = value
        }
        Object.entries(value).map(([ekey,evalue],i) => {
          if(key === "recordCount"){
             recordCount = evalue.recordCount;
             cost = recordCount * 0.15;
          }
          if(key === "phoneNumbers"){
            phoneNumbers = evalue.phoneNumbers;
          }
          if(key === "emailCount"){
            emailCount = evalue.emailCount;
          }
          return null;
        })
        return null;
    });
    this.setState({ recordCount: recordCount, cost: cost, phoneNumbers: phoneNumbers, emailCount: emailCount, employeeList : employeeList, businessTypesList :businessTypesList, revenueList: revenueList});
  };

  render() {
    return (
      <div className="container">
        <CsFilters countCallback={this.recordCountCallback}></CsFilters>
        <Dashboard 
          recordCount={this.state.recordCount}
          phoneNumbers={this.state.phoneNumbers}
          emailCount={this.state.emailCount}
          cost={this.state.cost}
          employeeList = {this.state.employeeList}
          businessTypesList = {this.state.businessTypesList}
          revenueList = {this.state.revenueList}
        ></Dashboard>
      </div>
    );
  }
}
