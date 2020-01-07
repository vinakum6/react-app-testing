  import React from "react";
import AuthNavbar from "components/Navbars/AuthNavbar.jsx";
import ApiService from "service/ApiService";
import {validateForm,validateEmail} from "js/validations";
import {salt,encryptPasswordWithSalt} from "utils/LoginUtil";
import {withRouter} from 'react-router-dom';
import cookies from 'js-cookie';
import { NavLink } from "react-router-dom";

// reactstrap components
import {Card,CardHeader,CardBody,CardFooter,Form,Input,InputGroupAddon,InputGroupText,InputGroup,Container,Col,Row} from "reactstrap";

class Login extends React.Component {


  constructor(props){
    super(props);
    this.state ={
        inputs:{
            email: '',
            password: '',
        },
        errors: {
            email: '',
            password: '',
        },
        message: null
    }
    this.saveUser = this.saveUser.bind(this);
  }

  onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    let inputs = this.state.inputs;

    switch (name) {
      case 'email': 
        errors.email = 
          value.length === 0
            ? 'Email is required'
            : (validateEmail(value) ? '' : 'invalid Email');
        inputs.email = 
        value.length >= 0
            ? value
            : '';
        break;
      case 'password': 
        errors.password = 
          value.length === 0
            ? 'Password is required'
            : '';
          inputs.password = 
          value.length >= 0
                ? value
                : '';
        break;
      default:
        break;
    }
  
    this.setState({errors, [name]: value, inputs, [name]: value})
  }

    encryptPassword = (password) => {
        let sl = salt();
                if(password!==''){
                        password = encryptPasswordWithSalt(password,sl);
                        this.setState({password:password});
                        document.getElementById("salt").value = sl;
                    }
                return password;    
    } 

    saveUser = (e) => {
            e.preventDefault();
            if(validateForm(this.state.errors, this.state.inputs)) {
                let user = { email: this.state.inputs.email, password: this.encryptPassword(this.state.inputs.password), salt: document.getElementById("salt").value };
                ApiService.loginRequest(user)
                    .then(res => {
                        if (res.status === 200) {  
                            cookies.set('token', res.data.token);
                            cookies.set('etoken', res.data.etoken) 
                            cookies.set('utoken', res.data.utoken)   
                            this.props.history.push('/admin/dashboard');
                        }
                    }).catch(error => {
                        // Error
                        if (error.response) {
                            /*
                            * The request was made and the server responded with a
                            * status code that falls out of the range of 2xx
                            */
                        this.setState({ message : error.response.data.message, status : error.response.status });
                        } 
                    });
            } else{
                this.setState({ message : 'Please fill the required fields.' });
            }
    }


  componentDidMount() {
    document.body.classList.toggle("login-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }
  render() {
    const {errors} = this.state;
    return (
      <>
        <AuthNavbar />
        <div className="wrapper wrapper-full-page" ref="fullPages">
          <div className="full-page section-image">
            <div className="login-page">
              <Container>
                <Row>
                  <Col className="ml-auto mr-auto" lg="4" md="6">
                    <Form className="form" onSubmit={this.saveUser}>
                      <Card className="card-login">
                        <CardHeader>
                          <CardHeader>
                            <h3 className="header text-center">Login</h3>
                            <h5 className="font-weight-bold alert-danger text-center">{this.state.message}</h5>
                          </CardHeader>
                        </CardHeader>
                        <CardBody>
                        
                          <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="nc-icon nc-single-02" />
                                </InputGroupText>
                              </InputGroupAddon>
                                <Input type="text" placeholder="Enter email" name="email" value={this.state.inputs.email} onChange={this.onChange}/>
                          </InputGroup>
                          {errors.email.length === 0 ? "" : <div className='alert-danger  mb-2'>{errors.email}</div>}
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="nc-icon nc-key-25" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Enter password" name="password"  value={this.state.inputs.password} onChange={this.onChange} />
                          </InputGroup>
                          {errors.password.length === 0 ? "" : <div className='alert-danger mb-2'>{errors.password}</div>}
                          <input type="hidden" id="salt"/> 
                          <br />
                          {/* <FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultChecked
                                  defaultValue=""
                                  type="checkbox"
                                />
                                <span className="form-check-sign" />
                                Subscribe to newsletter
                              </Label>
                            </FormGroup>
                          </FormGroup> */}
                        </CardBody>
                        <CardFooter>
                        <button type="submit" className="btn rounded btn-danger btn-block">Submit</button>
                        </CardFooter>
                        <CardFooter>
                          <NavLink to="/auth/forgot-password" className="nav-link text-center">
                            Forgot Password?
                          </NavLink>
                        </CardFooter>
                      </Card>
                    </Form>
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
          </div>
        </div>
       </> 
    );
  }
}

export default withRouter(Login);
