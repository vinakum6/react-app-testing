import React from "react";
import Select from "react-select";
import ApiService from "service/ApiService";

const options = [
    { value: 'Wetpaint', label: 'Wetpaint' },
    { value: 'Zoho', label: 'Zoho' },
    { value: 'Digg', label: 'Digg' },
  ];
   
export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orgnization : []
          };
      }

    handleChange = selectedOption => {
        let data = {"companyName" : selectedOption.value};
        ApiService.organizationDetails(data)
          .then((response) =>  {
            this.setState({orgnization : response.data});
         }); 
    };

  render() {  

     return (
        <div className="marginT-5">
        <div className="row">
            <div className="col mb-2"></div>
            <div className="col mb-2  text-center">
                    <Select
                        name="ageOfBusinessFilter"
                        placeholder="Select Orgnization"
                        onChange = {this.handleChange}
                        options={options}
                    />
                 </div>
            <div className="col"></div>
        </div>
        {
          Object.keys(this.state.orgnization).length > 0 ?
            <div className="card m-1">
                  <div  className="row">
                          <div className="col-md-2 mt-4 ml-5">
                                <img alt={this.state.orgnization["name"]}  src={this.state.orgnization["logo_url"]}/>
                          </div>
                          <div className="col-md-9">
                                <h2 className="text-primary mt-4">{this.state.orgnization["name"]}</h2>
                                <p className="text-dark font-weight-bold">{this.state.orgnization["short_description"]}</p>
                                <hr/>
                                <p className="text-warning font-weight-bold mb-4">{this.state.orgnization["city"]} | {this.state.orgnization["state_code"]} | {this.state.orgnization["country_code"]} </p>
                          </div>
                  </div>
                  <div>
                        <hr/>
                        <div className="text-info font-weight-bold"><label className="col-form-label col-md-2 ml-5">Categories</label> : <label className="col-form-label text-primary col-md-8">{this.state.orgnization["category_list"]}</label></div>
                        <div className="text-info font-weight-bold"><label className="col-form-label col-md-2 ml-5">Founded Date</label> : <label className="col-form-label text-primary col-md-8">{this.state.orgnization["founded_on"]}</label></div>
                        <div className="text-info font-weight-bold"><label className="col-form-label col-md-2 ml-5">Number of Employees</label> : <label className="col-form-label text-primary col-md-8">{this.state.orgnization["employee_count"]}</label></div>
                        <div className="text-info font-weight-bold"><label className="col-form-label col-md-2 ml-5">Legal Name</label> : <label className="col-form-label text-primary col-md-8" >{this.state.orgnization["legal_name"]}</label></div>
                        <hr/>
                        <div className="text-info font-weight-bold"><label className="col-form-label col-md-2 ml-5">Website</label> : <a href={this.state.orgnization["homepage_url"]} className="col-form-label text-primary col-md-8">{this.state.orgnization["homepage_url"]}</a></div>
                        <div className="text-info font-weight-bold"><label className="col-form-label col-md-2 ml-5">Facebook</label> : <a href={this.state.orgnization["facebook_url"]} className="col-form-label text-primary col-md-8">View on Facebook</a></div>
                        <div className="text-info font-weight-bold"><label className="col-form-label col-md-2 ml-5">Linked In</label> : <a href={this.state.orgnization["linkedin_url"]} className="col-form-label text-primary col-md-8">View on LinkedIn</a></div>
                        <div className="text-info font-weight-bold"><label className="col-form-label col-md-2 ml-5">Twitter</label> : <a href={this.state.orgnization["twitter_url"]} className="col-form-label text-primary col-md-8">View on Twitter</a></div>
                        <div className="text-info font-weight-bold"><label className="col-form-label col-md-2 ml-5">Contact Email</label> : <label className="col-form-label text-primary col-md-8">{this.state.orgnization["email"]}</label></div>
                        <div className="text-info font-weight-bold"><label className="col-form-label col-md-2 ml-5">Phone Number</label> : <label className="col-form-label text-primary col-md-8">{this.state.orgnization["phone"]}</label></div>
                        <hr/>
                        <div className="text-info font-weight-bold"><p className="text-dark font-weight-bold ml-5">{this.state.orgnization["short_description"]}</p></div>
                  </div>
            </div>
          : ""
        }
      </div>
     
    );
  }
}
