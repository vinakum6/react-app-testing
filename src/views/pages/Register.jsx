import React from "react";

// reactstrap components
import {Button,Card,CardHeader,CardBody,CardFooter,CardTitle,Form,Input,InputGroupAddon,InputGroupText,InputGroup,Container,Row,Col} from "reactstrap";

import ApiService from "service/ApiService";
import {encryptPassword} from "utils/LoginUtil";
import {validateForm,validateEmail,validatePassword} from "js/validations";
import 'react-phone-number-input/style.css';
import PhoneInput ,{ isValidPhoneNumber } from 'react-phone-number-input';

class Register extends React.Component {

  constructor(props){
    super(props);
    this.state ={
        inputs:{
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            email: '',
            businessName: '',
            phoneNumber: '',
            terms : 'Y',
        },
        errors: {
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            email: '',
            businessName: '',
            phoneNumber: '',
        },
        message: null,
        userCheck : '',
        status : ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
}

  onChangePhoneNumber = (value) => { 
      let name = "phoneNumber"; 
      let errors = this.state.errors;
      let inputs = this.state.inputs;
      errors.phoneNumber = (value === undefined || value === " ") ? 'Phone Number is required' : (!isValidPhoneNumber(value) ? 'Please enter a valid phone' : '');
      inputs.phoneNumber = (value !== undefined || value !== " ") ? value : ''; 
      this.setState({errors, [name]: value, inputs, [name]: value})
  }

  onChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
      let inputs = this.state.inputs;
      switch (name) {
        case 'firstName': 
          errors.firstName = value.length === 0 ? 'First name is required' : '';
          inputs.firstName = value.length >= 0 ? value : '';
          break;
        case 'lastName': 
          errors.lastName = value.length === 0 ? 'Last name is required' : '';
          inputs.lastName = value.length >= 0 ? value : '';
          break; 
        case 'password': 
          errors.password = value.length === 0 ? 'Password is required' :  (validatePassword(value) ? '' : ' password should be alphanumeric, contains atleast 8 characters with at least 1 upper case, 1 lower case, 1 special character');
          inputs.password = value.length >= 0 ? value : '';
          break;
        case 'confirmPassword': 
          errors.confirmPassword = value.length === 0 ? 'Confirm Password is required' : '';
          inputs.confirmPassword = value.length >= 0 ? value : '';
          break;  
        case 'email': 
          errors.email = value.length === 0 ? 'Email is required' : (validateEmail(value) ? '' : 'invalid Email');
          inputs.email = value.length >= 0 ? value : '';
          break;
        case 'businessName': 
          errors.businessName = value.length === 0 ? 'Business Name is required' : '';
          inputs.businessName = value.length >= 0 ? value : '';
          break;
        default:
          break;
      }
    
      this.setState({errors, [name]: value, inputs, [name]: value})
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        let password = encryptPassword(data.get('password'));
        let confirmPassword = encryptPassword(data.get('confirmPassword'));

        if(validateForm(this.state.errors, this.state.inputs)) {
            if(password !== confirmPassword){
                this.setState({message:'Password & ConfirmedPassword are not matching'});
            } else {
                this.setState({message:''});
                data.set('password', password);
                data.set('confirmPassword', confirmPassword);

                this.setState(state => {
                    state.inputs.password = password
                    state.inputs.confirmPassword = confirmPassword
                    return state
                });

                var userDetails = {};
                data.forEach((value, key) => {userDetails[key] = value});
                userDetails.password = password;
                ApiService.newUserRegistration(userDetails)
                .then(res => {       
                        this.setState({ message: res.data.message, status :"200" });
                })
                .catch(error => {
                    // Error
                    if (error.response) {
                        /*
                        * The request was made and the server responded with a
                        * status code that falls out of the range of 2xx
                        */
                    this.setState({ message : error.response.data.message, status : error.response.status });
                    } 
                });
            }
        } else{
            this.setState({ message : 'Please fill the required fields.' });
        }
    }



  componentDidMount() {
    document.body.classList.toggle("register-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }
  render() {
    const {errors} = this.state;
    return (
      <div className="register-page">
        <Container>
          <Row>
            <Col className="ml-auto" lg="5" md="5">
              <div className="info-area info-horizontal mt-5">
                {/* <div className="icon icon-primary">
                  <i className="nc-icon nc-tv-2" />
                </div> */}
                <div className="description">
                  <h5 className="info-title">MARKETING DATABASE</h5>
                  <p className="description">
                  Our enriched B2B marketing database can help you determine the right prospects straightaway.
                  </p>
                </div>
              </div>
              <div className="info-area info-horizontal">
                {/* <div className="icon icon-primary">
                  <i className="nc-icon nc-headphones" />
                </div> */}
                <div className="description">
                  <h5 className="info-title">DATA</h5>
                  <p className="description">
                  Our data is aggregated from multiple data points and opportunities with over 2 million prospects in the UK.
                  </p>
                </div>
              </div>
              <div className="info-area info-horizontal">
                {/* <div className="icon icon-info">
                  <i className="nc-icon nc-atom" />
                </div> */}
                <div className="description">
                  <h5 className="info-title">CLOUD ACCESS</h5>
                  <p className="description">
                  Our secure cloud database can be accessed through the cloud from anywhere in the world.
                  </p>
                </div>
              </div>
            </Col>
            <Col className="mr-auto" lg="4" md="6">
              <Card className="card-signup text-center">
                <CardHeader>
                  <CardTitle tag="h4">Register</CardTitle>
                  <div className="social">
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="linkedin">
                      <i className="fa fa-linkedin" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fa fa-google" />
                    </Button>
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fa fa-facebook-f" />
                    </Button>
                  </div>
                 <h5 className={this.state.status === "200" ? "text-center text-success font-weight-bold" : "text-center alert-danger font-weight-bold"}> {this.state.message}</h5>
                </CardHeader>
                <CardBody>
                  <Form className="form" onSubmit={this.handleSubmit}>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.onChange} value={this.state.inputs.firstName} />
                    </InputGroup>
                    {errors.firstName.length === 0 ? "" : <div className='ml-2 alert-danger'>{errors.firstName}</div>}

                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" className="form-control" name="lastName" id="lastName" placeholder="Last Name" onChange={this.onChange} value={this.state.inputs.lastName} />
                    </InputGroup>
                    {errors.lastName.length === 0 ? "" : <div className='ml-2 alert-danger'>{errors.lastName}</div>}

                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} value={this.state.inputs.password} />
                    </InputGroup>
                    {errors.password.length === 0 ? "" : <div className='ml-2 alert-danger'>{errors.password}</div>}

                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" onChange={this.onChange} value={this.state.inputs.confirmPassword} />
                    </InputGroup>
                    {errors.confirmPassword.length === 0 ? "" : <div className='ml-2 alert-danger'>{errors.confirmPassword}</div>}

                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" className="form-control" name="businessName" id="businessName" placeholder="Business Name" onChange={this.onChange} value={this.state.inputs.businessName} />
                    </InputGroup>
                    {errors.businessName.length === 0 ? "" : <div className='ml-2 alert-danger'>{errors.businessName}</div>}

                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-mobile" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <PhoneInput type="tel" className="form-control" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" value={this.state.inputs.phoneNumber} onChange={ phoneNumber => this.onChangePhoneNumber(phoneNumber)}/>
                    </InputGroup>
                    {errors.phoneNumber.length === 0 ? "" : <div className='ml-2 alert-danger'>{errors.phoneNumber}</div>}

                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" name="email" id="email" placeholder="email@example.com" onChange={this.onChange} value={this.state.inputs.email} />
                    </InputGroup>
                    {errors.email.length === 0 ? "" : <div className='ml-2 alert-danger'>{errors.email}</div>}

                    <div className="form-group form-check-sign">
                      <Input type="checkbox" name="terms" id="terms" value={this.state.inputs.terms} required/>I agree, terms and conditions
                    </div>

                    {/* <FormGroup check className="text-left">
                      <Label check>
                        <Input defaultChecked type="checkbox" />
                        <span className="form-check-sign" />I agree to the{" "}
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          terms and conditions
                        </a>
                        .
                      </Label>
                    </FormGroup> */}
                    <CardFooter>
                        <input type="submit" className="btn btn-danger" value="Register"/>
                    </CardFooter>
                  </Form>
                </CardBody>
               </Card>
            </Col>
          </Row>
        </Container>
        <div
          className="full-page-background"
          style={{
            backgroundImage: `url(${require("assets/img/bg/pc-bg.jpg")})`
          }}
        />
      </div>
    );
  }
}

export default Register;
