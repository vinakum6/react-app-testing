
import React from "react";

// reactstrap components
import {Card,CardHeader,CardBody,FormGroup,Form,Input,Row,Col} from "reactstrap";
import crypto from "../../utils/crypto";
import cookies from 'js-cookie';
import ApiService from "service/ApiService";
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber, getCountryCallingCode, parsePhoneNumber }  from 'react-phone-number-input';
import countryList from 'react-select-country-list';
import SimpleReactValidator from 'simple-react-validator';


class UserProfile extends React.Component {

  constructor(props){
    super(props);
    this.options = countryList().getData()
    this.state = {
        options : this.options,
        userDetails : [],
        message : "",
        email : "",
        firstName : "",
        lastName : "",
        phoneNumber : "",
        businessName : "",
        houseNumber : "",
        streetAndCounty : "",
        country : "",
        countryCode : "",
        city : "",
        zipCode : "",
        status : ""
    };
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

  componentWillMount = () => {
    ApiService.getUserDetails()
    .then(res => { 
      if(res.status === 200) { 
        let userData = JSON.parse(crypto.decrypt(res.data.userData))
        this.setState({ userDetails: userData});
          Object.entries(userData).map(([key,value],i) => {
             let cCode = value["countryCode"];
             let countryCallingCode = cCode !== null ? getCountryCallingCode(cCode) : "";
            Object.entries(value).map(([k,v],i) => {
              v  = k === "phoneNumber" ? (!parsePhoneNumber(v) && countryCallingCode !== "" ? ("+"+countryCallingCode+" "+v) : v) : v;
              this.setState({[k] : v !== null ? v : ""});
              return null;
            });
            return null;
          });
      } else {
        this.setState({ message : "Internal Error" });
      }
    })
    .catch(error => {
      this.setState({ message : "Internal Error" });
    });
  }

  onChange = (evt) => { 
     this.setState({[evt.target.name] : evt.target.value});
  }

  onChangePhoneNumber = (value) => {     
    let code = isValidPhoneNumber(value) ? (parsePhoneNumber(value).country!=="ZZ" ? parsePhoneNumber(value).country : "") : "";
    value = (!isValidPhoneNumber(value) ? '' : value);
    this.setState({"phoneNumber": value, "countryCode" : code})
  }

  handleSubmit = (evt) => {

    evt.preventDefault();

    if (this.validator.allValid()) {
      const data = new FormData(evt.target);
      var userDetails = {};
      data.forEach((value, key) => {userDetails[key] = value});
      const encryptedData = {"data" : crypto.encrypt(userDetails)}
      ApiService.updateUserDetails(encryptedData)
      .then(res => { 
        if(res.status === 200) { 
          this.setState({ message : "Updated Successfully", status : 200 });
        } else {
          this.setState({ message : "Internal Error", status : 500 });
        }
      })
      .catch(error => {
        console.log(" error "+error);
        this.setState({ message : "Internal Error", status : 500 });
      });
      
    } else {
      this.setState({ message: 'Please fill the required fields.' });
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() { 
    
    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src={require("assets/img/bg/damir-bosnjak.jpg")}
                  />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/react-logo.png")}
                      />
                      <h5 className="title">
                        {/* Decrypted the Username */}
                        {crypto.decrypt(cookies.get("utoken")).split('"').join('')}
                      </h5>
                    </a>
                      <p className="description font-weight-bold text-warning">{crypto.decrypt(cookies.get("etoken")).split('"').join('')}</p>
                  </div>
                  {/* <p className="description text-center">
                    "I like the way you work it <br />
                    No diggity <br />I wanna bag it up"
                  </p> */}
                </CardBody>
                {/* <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          12 <br />
                          <small>Files</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          2GB <br />
                          <small>Used</small>
                        </h5>
                      </Col>
                      <Col className="mr-auto" lg="3">
                        <h5>
                          24,6$ <br />
                          <small>Spent</small>
                        </h5>
                      </Col>
                    </Row>
                  </div>
                </CardFooter> */}
              </Card>
              {/* <Card>
                <CardHeader>
                  <CardTitle tag="h4">Team Members</CardTitle>
                </CardHeader>
                <CardBody>
                  <ul className="list-unstyled team-members">
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                            />
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                          DJ Khaled <br />
                          <span className="text-muted">
                            <small>Offline</small>
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/joe-gardner-2.jpg")}
                            />
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                          Prominent Contact <br />
                          <span className="text-success">
                            <small>Available</small>
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/clem-onojeghuo-2.jpg")}
                            />
                          </div>
                        </Col>
                        <Col className="col-ms-7" xs="7">
                          Flume <br />
                          <span className="text-danger">
                            <small>Busy</small>
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                  </ul>
                </CardBody>
              </Card> */}
            </Col>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                    <h5 className={this.state.status === 200 ? "text-center alert-success font-weight-bold" : "text-center alert-danger font-weight-bold"}> {this.state.message}</h5>
                    <Form className="form" onSubmit={this.handleSubmit}>
                        <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Company</label>
                            <Input
                              defaultValue="Prominent Connect Inc."
                              disabled
                              placeholder="Company"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="6">
                          <FormGroup>
                            <label>Username</label>
                            <Input
                              value={this.state.email}
                              disabled
                              placeholder="Username"
                              onChange = {this.onChange}
                              type="text"
                            />
                            <input type="hidden" name="email" value={this.state.email}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>First Name</label>
                            <Input name="firstName" value={this.state.firstName} placeholder="First Name" onChange = {this.onChange} type="text"/> 
                             {this.validator.message('First_Name', this.state.firstName, 'required|alpha')}
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="4">
                          <FormGroup>
                            <label>Last Name</label>
                            <Input name="lastName" value={this.state.lastName} placeholder="Last Name" onChange = {this.onChange} type="text" /> 
                            {this.validator.message('Last_Name', this.state.lastName, 'required|alpha')}
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="4">
                          <FormGroup>
                            <label>Phone</label>
                            <PhoneInput name="phoneNumber" className="form-control" country={this.state.countryCode} value={this.state.phoneNumber} placeholder="Phone Number" onChange={ phoneNumber => this.onChangePhoneNumber(phoneNumber)} type="tel"/>
                            {this.validator.message('Phone_Number', this.state.phoneNumber, 'required')} &nbsp;&nbsp;
                            {this.validator.message('Country Code', this.state.countryCode, 'required')} 
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>Business Name</label>
                            <Input name="businessName" value={this.state.businessName} onChange={this.onChange} placeholder="Business Name" type="text" /> 
                            {this.validator.message('Business_Name', this.state.businessName, 'required|alpha_num_space')} 
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="4">
                          <FormGroup>
                            <label>Address Line 1</label>
                            <Input name="houseNumber" value={this.state.houseNumber} placeholder="Please Enter House Number" onChange={this.onChange} type="text" /> 
                            {this.validator.message('House Number', this.state.houseNumber, 'required|alpha_num_space')} 
                          </FormGroup>
                        </Col>
                        <Col  className="px-1" md="4">
                          <FormGroup>
                            <label>Address Line 2</label>
                            <Input name="streetAndCounty" value={this.state.streetAndCounty} placeholder="Please Enter Street/County Name" onChange={this.onChange} type="text"/> 
                            {this.validator.message('Street_And_County', this.state.houseNumber, 'required|alpha_num_space')} 
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                      <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>Country</label>
                            <select className="form-control" name="country" value={this.state.country} placeholder="Please Enter Country" onChange={this.onChange}> 
                                <option value="">Please Select Country</option>
                                {Object.entries(this.state.options).map(([skey,sval],s) =>{
                                return (
                                    <option key={s} value={sval.value}>{sval.label}</option>
                                )})}
                            </select> 
                            {this.validator.message('Country', this.state.country, 'required')} 
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="4">
                          <FormGroup>
                            <label>City</label>
                            <Input name="city" value={this.state.city} placeholder="Please Enter City" onChange={this.onChange} type="text"/> 
                            {this.validator.message('City', this.state.city, 'required|alpha')} 
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                          <FormGroup>
                            <label>Postal Code</label>
                            <Input name="zipCode" value={this.state.zipCode} placeholder="Please enter ZIP Code" onChange={this.onChange} type="text" />
                            {this.validator.message('ZipCode', this.state.zipCode, 'required|alpha_num')} 
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pl-1" md="4">
                        </Col>
                        <Col className="pl-1 text-center" md="4">
                            <FormGroup>
                                <input type="submit" className="btn btn-danger" value="Update" />
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="4">
                        </Col>
                      </Row>
                      <Row>
                      </Row>
                    </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
