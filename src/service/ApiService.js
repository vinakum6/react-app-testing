import axios from "axios";
import cookies from "js-cookie";
import React from "react";
const baseApiUrl = require("../config/keys").baseApiUrl;

const NEW_USER_REGISTRATION_API_URL = baseApiUrl + "users/registration";
const LOGIN_API_BASE_URL = baseApiUrl + "users/login";
const LOGOUT_API_BASE_URL = baseApiUrl + "users/logout";
const FORGOT_PASSWORD = baseApiUrl + "users/forgot-password";
const GET_USER_DETAILS = baseApiUrl + "users/details";
const UPDATE_USER_DETAILS = baseApiUrl + "users/details/update";

const FILTERS_AGE_OF_BUSINESS = baseApiUrl + "filters/ageOfBusiness";
const FILTERS_BUSINESS_ACTIVITY = baseApiUrl + "filters/ba";
const FILTERS_REVENUE_RANGE = baseApiUrl + "filters/revenuerange";
const FILTERS_COUNTY = baseApiUrl + "filters/county";
const FILTERS_EMPLOYEE_SIZE = baseApiUrl + "filters/employeesize";
const FILTERS_BUSINESS_TYPE = baseApiUrl + "filters/businessType";
const FILTERS_EMPLOYEE_AT_SITE_RANGE =
  baseApiUrl + "filters/employeesAtSiteRange";
const FILTERS_SIC = baseApiUrl + "filters/sic2007";
const FILTERS_CITY = baseApiUrl + "filters/city";
const FILTERS_SEARCH = baseApiUrl + "calculator/priceresults";
const PROFILE_ORGANIZATION_DETAILS =
  baseApiUrl + "profile/organization/details";
const PROFILE_COMPANY_LIST = baseApiUrl + "profile/organization/companyList";
const PLACE_ORDER = baseApiUrl + "orders/csdata";

class ApiService extends React.Component {
  newUserRegistration(data) {
    return axios.post("" + NEW_USER_REGISTRATION_API_URL, data);
  }

  forgotPassword(data) {
    return axios.post("" + FORGOT_PASSWORD, data);
  }

  loginRequest(data) {
    return axios.post("" + LOGIN_API_BASE_URL, data);
  }

  logoutRequest(data) {
    return axios.post("" + LOGOUT_API_BASE_URL, data, {
      headers: { authorization: cookies.get("token") }
    });
  }

  filtersAgeOfBusiness(searchText) {
    return axios.get("" + FILTERS_AGE_OF_BUSINESS, {
      headers: { authorization: cookies.get("token") },
      params: {
        searchText: searchText
      }
    });
  }

  filtersBusinessActivity(searchText) {
    if (searchText === undefined) {
      searchText = "";
    }
    return axios.get("" + FILTERS_BUSINESS_ACTIVITY, {
      headers: { authorization: cookies.get("token") },
      params: {
        searchText: searchText
      }
    });
  }

  filtersRevenueRange() {
    return axios.get("" + FILTERS_REVENUE_RANGE, {
      headers: { authorization: cookies.get("token") }
    });
  }

  filtersCounty() {
    return axios.get("" + FILTERS_COUNTY, {
      headers: { authorization: cookies.get("token") }
    });
  }

  filtersEmployeeSize() {
    return axios.get("" + FILTERS_EMPLOYEE_SIZE, {
      headers: { authorization: cookies.get("token") }
    });
  }

  filtersBusinessType() {
    return axios.get("" + FILTERS_BUSINESS_TYPE, {
      headers: { authorization: cookies.get("token") }
    });
  }

  filtersEmployeeAtSiteRange() {
    return axios.get("" + FILTERS_EMPLOYEE_AT_SITE_RANGE, {
      headers: { authorization: cookies.get("token") }
    });
  }

  filtersSIC2007(searchText) {
    return axios.get("" + FILTERS_SIC, {
      headers: { authorization: cookies.get("token") },
      params: {
        searchText: searchText
      }
    });
  }

  filtersCity() {
    return axios.get("" + FILTERS_CITY, {
      headers: { authorization: cookies.get("token") }
    });
  }

  filtersSearch(data) {
    //debugger;
    return axios.post("" + FILTERS_SEARCH, data, {
      headers: { authorization: cookies.get("token") }
    });
  }

  organizationDetails(data) {
    return axios.post("" + PROFILE_ORGANIZATION_DETAILS, data, {
      headers: { authorization: cookies.get("token") }
    });
  }

  getCompanies(data) {
    //debugger;
    return axios.get("" + PROFILE_COMPANY_LIST, {
      headers: {
        authorization: cookies.get("token")
      },
      params: { searchText: data }
    });
  }

  placeOrders(data) {
    return axios.post("" + PLACE_ORDER, data, {
      headers: { authorization: cookies.get("token") }
    });
  }

  getUserDetails() {
    return axios.get("" + GET_USER_DETAILS+"/"+cookies.get("etoken"), {
      headers: { authorization: cookies.get("token") }
    });
  }

  updateUserDetails(data) {
    return axios.post("" + UPDATE_USER_DETAILS, data,  {
      headers: { authorization: cookies.get("token") }
    });
  }
  
}

export default new ApiService();
