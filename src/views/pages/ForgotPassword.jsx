import React from "react";
import {withRouter} from 'react-router-dom';

// reactstrap components
import {Card,CardHeader,CardBody,CardFooter,CardTitle,Form,Input,InputGroupAddon,InputGroupText,InputGroup,Container,Row,Col} from "reactstrap";
import ApiService from "service/ApiService";
import {validateForm,validateEmail} from "js/validations";

class ForgotPassword extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            inputs:{
                email: '',
            },
            errors: {
                email: '',
            },
            message: null,
            status: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
      onChange = (event) => {
          event.preventDefault();
          const { name, value } = event.target;
          let errors = this.state.errors;
          let inputs = this.state.inputs;
    
          errors.email = value.length === 0 ? 'Email is required' : (validateEmail(value) ? '' : 'invalid Email');
          inputs.email = value.length >= 0 ? value : '';  
        
          this.setState({errors, [name]: value, inputs, [name]: value})
        }
    
        handleSubmit(event) {
            event.preventDefault();
        
            if(validateForm(this.state.errors, this.state.inputs)) {
                    var email = {'email':this.state.inputs.email};
                    ApiService.forgotPassword(email)
                    .then(res => {       
                            this.setState({ message: res.data.message, status :"200" });
                    }).catch(error => {
                        if (error.response) {
                              this.setState({ message : error.response.data.message, status : error.response.status });
                        } 
                    });
            } else{
                this.setState({ message : 'Fields should not empty' });
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
                    <div className="icon icon-primary">
                      <i className="nc-icon nc-tv-2" />
                    </div>
                    <div className="description">
                      <h5 className="info-title">Business Data</h5>
                      <p className="description">
                      Our Market Intelligence team work with national brands to provide direct access to freshly targeted business data mailing lists and B2B Databases that are not available anywhere else on the market to purchase
                      </p>
                    </div>
                  </div>
                </Col>
                <Col className="mr-auto" lg="4" md="6">
                  <Card className="card-signup text-center">
                    <CardHeader>
                      <CardTitle tag="h4">Forgot Password</CardTitle>
                     <h5 className={this.state.status === "200" ? "text-center text-success font-weight-bold" : "text-center alert-danger font-weight-bold"}> {this.state.message}</h5>
                    </CardHeader>
                    <CardBody>
                      <Form className="form" onSubmit={this.handleSubmit}>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="nc-icon nc-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="email" name="email" id="email" placeholder="email@example.com" onChange={this.onChange} value={this.state.inputs.email} />
                        </InputGroup>
                        {errors.email.length === 0 ? "" : <div className='ml-2 alert-danger'>{errors.email}</div>}

                        <CardFooter>
                            <input type="submit" className="btn btn-danger" value="Send Email"/>
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

export default withRouter(ForgotPassword);