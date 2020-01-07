
import React from "react";
// react plugin used to create charts
//Bar, Doughnut 
import { Line} from "react-chartjs-2";
// react plugin for creating vector maps
//import { VectorMap } from "react-jvectormap";

// reactstrap components
//Button, CardFooter, Label,FormGroup,Input,Table, UncontrolledTooltip
import { Badge,Card,CardHeader,CardBody,CardTitle,Row,Col } from "reactstrap";

import {
  chartExample1,
  chartExample2,
  chartExample3,
  // chartExample4,
  // chartExample5,
  // chartExample6,
  // chartExample7,
  // chartExample8
} from "variables/charts.jsx";
// import CountSystem from "views/countsystem/CountSystem";

// var mapData = {
//   AU: 760,
//   BR: 550,
//   CA: 120,
//   DE: 1300,
//   FR: 540,
//   GB: 690,btn-magnify nav-link
//   GE: 200,
//   IN: 200,
//   RO: 600,
//   RU: 300,
//   US: 2920
// };

class Dashboard extends React.Component {
  render() {

    let employeeSize = 0;
    chartExample1.data.datasets[0].data = [0,0,0,0,0,0,0,0];
    Object.entries(this.props.employeeList).map(([key,value], i) => {
       employeeSize += parseInt(value.count);
       if(value._id === "A : 1 to 5"){
          chartExample1.data.datasets[0].data[0] = parseInt(value.count);
       } else if(value._id === "B : 6 to 10"){
          chartExample1.data.datasets[0].data[1] = parseInt(value.count);
       } else if(value._id === "C : 11 to 19"){
          chartExample1.data.datasets[0].data[2] = parseInt(value.count);
       } else if(value._id === "D : 20 to 49"){
          chartExample1.data.datasets[0].data[3] = parseInt(value.count);
       } else if(value._id === "E : 50 to 99"){
          chartExample1.data.datasets[0].data[4] = parseInt(value.count);
       } else if(value._id === "F : 100 to 199"){
          chartExample1.data.datasets[0].data[5] = parseInt(value.count);
       } else if(value._id === "G : 200+"){
          chartExample1.data.datasets[0].data[6] = parseInt(value.count);
       } else if(value._id === "Unclassified"){
          chartExample1.data.datasets[0].data[7] = parseInt(value.count);
       }
      return null;
    });

   
    let businessTypeSize = 0;
    chartExample2.data.datasets[0].data = [0,0];
    Object.entries(this.props.businessTypesList).map(([key,value], i) => {
      businessTypeSize += parseInt(value.count);
      if(value._id === "Ltd"){
          chartExample2.data.datasets[0].data[0] = parseInt(value.count);
       } else if(value._id === "Sons"){
          chartExample2.data.datasets[0].data[1] = parseInt(value.count);
       }
      return null;
    });

    let revenueSize = 0;
    chartExample3.data.datasets[0].data = [0,0,0,0,0,0,0,0,0,0];
    Object.entries(this.props.revenueList).map(([key,value], i) => {
       revenueSize += parseInt(value.count);
       if(value._id === "1 : Unclassified"){
          chartExample3.data.datasets[0].data[0] = parseInt(value.count);
       } else if(value._id === "2 : 1 to <90k"){
          chartExample3.data.datasets[0].data[1] = parseInt(value.count);
       } else if(value._id === "3 : 90k to <400k"){
          chartExample3.data.datasets[0].data[2] = parseInt(value.count);
       } else if(value._id === "4 : 400k to <1m"){
          chartExample3.data.datasets[0].data[3] = parseInt(value.count);
       } else if(value._id === "5 : 1m to <2.5m"){
          chartExample3.data.datasets[0].data[4] = parseInt(value.count);
       } else if(value._id === "6 : 2.5m to <5m"){
          chartExample3.data.datasets[0].data[5] = parseInt(value.count);
       } else if(value._id === "7 : 5m to <10m"){
          chartExample3.data.datasets[0].data[6] = parseInt(value.count);
       } else if(value._id === "8 : 10m to <40m"){
          chartExample3.data.datasets[0].data[7] = parseInt(value.count);
       } else if(value._id === "9 : 40m+"){
          chartExample3.data.datasets[0].data[8] = parseInt(value.count);
       }
      return null;
    });

   
    return (
      <>
        <div className="content">
          {/* <CountSystem/> */}
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-globe text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Businesses</p>
                          <CardTitle tag="p">{this.props.recordCount}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                {/* <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-refresh" />
                    Update Now
                  </div>
                </CardFooter> */}
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                     <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-vector text-danger" />
                        </div>
                      </Col>
                      <Col md="8" xs="7">
                        <div className="numbers">
                          <p className="card-category">Telephones</p>
                              <CardTitle tag="p">{this.props.phoneNumbers}</CardTitle>
                          <p />
                        </div>
                     </Col>
                   </Row>
                </CardBody>
                {/* <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar-o" />
                    Last day
                  </div>
                </CardFooter> */}
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>                    
                    <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-email-85 text-primary" />
                        </div>
                      </Col>
                      <Col md="8" xs="7">
                        <div className="numbers">
                          <p className="card-category">Emails</p>
                              <CardTitle tag="p">{this.props.emailCount}</CardTitle>
                          <p />
                        </div>
                      </Col>     
                  </Row>
                </CardBody>
                {/* <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-clock-o" />
                    In the last hour
                  </div>
                </CardFooter> */}
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                 <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Cost</p>
                            <CardTitle tag="p">£{this.props.cost.toFixed(2)}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                 </CardBody>
                {/* <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-refresh" />
                    Update now
                  </div>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="4" sm="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col sm="7">
                      {/* <div className="numbers pull-left"></div> */}
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Badge color="success" pill>
                          {employeeSize}
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6 className="big-title">
                    Employee Size
                  </h6>
                  <Line
                    data={chartExample1.data}
                    options={chartExample1.options}
                    height={500}
                    width={826}
                  />
                </CardBody>
                {/* <CardFooter>
                  <hr />
                  <Row>
                    <Col sm="7">
                      <div className="footer-title">Financial Statistics</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          size="sm"
                        >
                          <i className="nc-icon nc-simple-add" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
            <Col lg="4" sm="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col sm="7">
                      {/* <div className="numbers pull-left">$250</div> */}
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Badge color="danger" pill>
                          {businessTypeSize}
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6 className="big-title">
                    Business Types
                  </h6>
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                    height={500}
                    width={828}
                  />
                </CardBody>
                {/* <CardFooter>
                  <hr />
                  <Row>
                    <Col sm="7">
                      <div className="footer-title">View all members</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Button
                          className="btn-round btn-icon"
                          color="danger"
                          size="sm"
                        >
                          <i className="nc-icon nc-button-play" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
            <Col lg="4" sm="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col sm="7">
                      {/* <div className="numbers pull-left"> $345</div> */}
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Badge color="warning" pill>
                          {revenueSize}
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6 className="big-title">Revenue</h6>
                  <Line
                    data={chartExample3.data}
                    options={chartExample3.options}
                    height={500}
                    width={826}
                  />
                </CardBody>
                {/* <CardFooter>
                  <hr />
                  <Row>
                    <Col sm="7">
                      <div className="footer-title">View more details</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Button
                          className="btn-round btn-icon"
                          color="warning"
                          size="sm"
                        >
                          <i className="nc-icon nc-alert-circle-i" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Global Sales by Top Locations</CardTitle>
                  <p className="card-category">
                    All products that were shipped
                  </p>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <Table responsive>
                        <tbody>
                          <tr>
                            <td>
                              <div className="flag">
                                <img
                                  alt="..."
                                  src={require("assets/img/flags/US.png")}
                                />
                              </div>
                            </td>
                            <td>USA</td>
                            <td className="text-right">2.920</td>
                            <td className="text-right">53.23%</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="flag">
                                <img
                                  alt="..."
                                  src={require("assets/img/flags/DE.png")}
                                />
                              </div>
                            </td>
                            <td>Germany</td>
                            <td className="text-right">1.300</td>
                            <td className="text-right">20.43%</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="flag">
                                <img
                                  alt="..."
                                  src={require("assets/img/flags/AU.png")}
                                />
                              </div>
                            </td>
                            <td>Australia</td>
                            <td className="text-right">760</td>
                            <td className="text-right">10.35%</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="flag">
                                <img
                                  alt="..."
                                  src={require("assets/img/flags/GB.png")}
                                />
                              </div>
                            </td>
                            <td>United Kingdom</td>
                            <td className="text-right">690</td>
                            <td className="text-right">7.87%</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="flag">
                                <img
                                  alt="..."
                                  src={require("assets/img/flags/RO.png")}
                                />
                              </div>
                            </td>
                            <td>Romania</td>
                            <td className="text-right">600</td>
                            <td className="text-right">5.94%</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="flag">
                                <img
                                  alt="..."
                                  src={require("assets/img/flags/BR.png")}
                                />
                              </div>
                            </td>
                            <td>Brasil</td>
                            <td className="text-right">550</td>
                            <td className="text-right">4.34%</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                    <Col className="ml-auto mr-auto" md="6">
                      <VectorMap
                        map={"world_mill"}
                        backgroundColor="transparent"
                        zoomOnScroll={false}
                        containerStyle={{
                          height: "300px"
                        }}
                        containerClassName="map"
                        regionStyle={{
                          initial: {
                            fill: "#e4e4e4",
                            "fill-opacity": 0.9,
                            stroke: "none",
                            "stroke-width": 0,
                            "stroke-opacity": 0
                          }
                        }}
                        series={{
                          regions: [
                            {
                              values: mapData,
                              scale: ["#AAAAAA", "#444444"],
                              normalizeFunction: "polynomial"
                            }
                          ]
                        }}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Card className="card-tasks">
                <CardHeader>
                  <CardTitle tag="h4">Tasks</CardTitle>
                  <h5 className="card-category">Backend development</h5>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultChecked type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="img-row">
                            <div className="img-wrapper">
                              <img
                                alt="..."
                                className="img-raised"
                                src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                              />
                            </div>
                          </td>
                          <td className="text-left">
                            Sign contract for "What are conference organizers
                            afraid of?"
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip42906017"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-ruler-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip42906017"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip570363224"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip570363224"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="img-row">
                            <div className="img-wrapper">
                              <img
                                alt="..."
                                className="img-raised"
                                src={require("assets/img/faces/erik-lucatero-2.jpg")}
                              />
                            </div>
                          </td>
                          <td className="text-left">
                            Lines From Great Russian Literature? Or E-mails From
                            My Boss?
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip584875601"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-ruler-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip584875601"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip517629613"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip517629613"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultChecked type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="img-row">
                            <div className="img-wrapper">
                              <img
                                alt="..."
                                className="img-raised"
                                src={require("assets/img/faces/kaci-baum-2.jpg")}
                              />
                            </div>
                          </td>
                          <td className="text-left">
                            Using dummy content or fake information in the Web
                            design process can result in products with
                            unrealistic
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip792337830"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-ruler-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip792337830"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip731952378"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip731952378"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="img-row">
                            <div className="img-wrapper">
                              <img
                                alt="..."
                                className="img-raised"
                                src={require("assets/img/faces/joe-gardner-2.jpg")}
                              />
                            </div>
                          </td>
                          <td className="text-left">
                            But I must explain to you how all this mistaken idea
                            of denouncing pleasure
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip825783733"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-ruler-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip825783733"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip285089652"
                              title=""
                              type="button"
                            >
                              <i className="nc-icon nc-simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip285089652"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-refresh spin" />
                    Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">2018 Sales</CardTitle>
                  <p className="card-category">All products including Taxes</p>
                </CardHeader>
                <CardBody>
                  <Bar
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-info" />
                    Tesla Model S <i className="fa fa-circle text-danger" />
                    BMW 5 Series
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-check" />
                    Data information certified
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <Card>
                <CardHeader>
                  <CardTitle>Email Statistics</CardTitle>
                  <p className="card-category">Last Campaign Performance</p>
                </CardHeader>
                <CardBody>
                  <Doughnut
                    data={chartExample5.data}
                    options={chartExample5.options}
                    className="ct-chart ct-perfect-fourth"
                    height={300}
                    width={456}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-info" />
                    Open
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" />
                    Number of emails sent
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="3">
              <Card>
                <CardHeader>
                  <CardTitle>New Visitators</CardTitle>
                  <p className="card-category">Out Of Total Number</p>
                </CardHeader>
                <CardBody>
                  <Doughnut
                    data={chartExample6.data}
                    options={chartExample6.options}
                    className="ct-chart ct-perfect-fourth"
                    height={300}
                    width={456}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-warning" />
                    Visited
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-check" />
                    Campaign sent 2 days ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="3">
              <Card>
                <CardHeader>
                  <CardTitle>Orders</CardTitle>
                  <p className="card-category">Total number</p>
                </CardHeader>
                <CardBody>
                  <Doughnut
                    data={chartExample7.data}
                    options={chartExample7.options}
                    className="ct-chart ct-perfect-fourth"
                    height={300}
                    width={456}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-danger" />
                    Completed
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-clock-o" />
                    Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="3">
              <Card>
                <CardHeader>
                  <CardTitle>Subscriptions</CardTitle>
                  <p className="card-category">Our Users</p>
                </CardHeader>
                <CardBody>
                  <Doughnut
                    data={chartExample8.data}
                    options={chartExample8.options}
                    className="ct-chart ct-perfect-fourth"
                    height={300}
                    width={456}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-secondary" />
                    Ended
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" />
                    Total users
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row> */}
        </div>
      </>
    );
  }
}

export default Dashboard;
