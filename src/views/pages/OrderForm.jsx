import React, { Component } from "react";
import {withRouter, Link} from 'react-router-dom';
import ApiService from "service/ApiService";
import cookies from "js-cookie";

class OrderForm extends Component {

    constructor(props) {
        super(props);
        this.placeOrder = this.placeOrder.bind(this);
        this.state = { 
          data : [],
          cost : 0,
          recordCount : 0,
          filterQuery : "",
          message : null,
          status : 0
        };
      }

   componentWillMount = () => {
    const { data } = this.props.location;    
    let cost = 0;
    let recordCount = 0;

    if(data !== undefined){
        this.setState({data : data})

        data !== undefined && Object.entries(data.graphData).map(([key,value],i) => {
            Object.entries(value).map(([ekey,evalue],i) => {
                if(key === "recordCount"){
                    recordCount = evalue.recordCount;
                    cost = recordCount * 0.15;
                }
                return null;
            })
            return null;
        });
    }
    this.setState({cost : cost, recordCount : recordCount});
   }

   placeOrder = () => {
        let data = {recordCount : this.state.recordCount, cost : this.state.cost.toFixed(2), encrypedUsersEmail : cookies.get("etoken"), query : this.state.data.filterQuery};
        ApiService.placeOrders(data)
        .then(res => {       
            if (res.status === 200) {
                this.setState({message : "Order has been placed succesfully", status : 200});
            } else {
                this.setState({ message: "Internal Error"});
            }
        })

   }

   
  render() {
    const { data } = this.props.location;
    
    return (
      <div className="marginT-5">
          
        { data !== undefined ?
        <div>
            <div>
                <h3 className="text-center alert-success font-weight-bold">{this.state.message}</h3> 
            </div> 
            <div>
                <h3 className="text-center text-warning font-weight-bold">Order Form</h3> 
            </div>   
            <div className="row justify-content-center">
            <table className="table w-75">
                    <tbody>
                        { 
                            data !== undefined && Object.entries(data.filterDetails).map(([key,value],i) => {
                                let fieldName =  key.charAt(0).toUpperCase() + key.slice(1);
                                fieldName = fieldName.replace(/([A-Z])/g, ' $1').trim();
                                return (
                                    <tr key={i}>
                                        <td><label className="text-muted font-weight-bold">{fieldName}</label></td>
                                        <td><label className="text-info font-weight-bold">{value.map(v=>{return v+"; "})}</label></td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td><label className="text-muted font-weight-bold">Data Count</label></td>
                            <td><label className="text-info font-weight-bold">{this.state.recordCount}</label></td>
                        </tr>
                        <tr>
                            <td><label className="text-muted font-weight-bold">Total Price</label></td>
                            <td><label className="text-info font-weight-bold">{this.state.cost.toFixed(2)}</label></td>
                        </tr>
                        <tr>
                            {this.state.status === 200 ?
                            <td colSpan="2" className="text-center"><Link to="/admin/dashboard">Order is placed, click here to go to back to home</Link></td>
                            :
                            <td colSpan="2" className="text-center"><button onClick={this.placeOrder} className="btn btn-danger">Place Final Order</button></td>
                            }
                        </tr>
                    </tbody>
                    </table>
                </div>
               </div> 
         
          : <div className="text-center"><Link to="/admin/dashboard">Data is refreshed, Please go to Marketing Data List</Link></div> } 
      </div>
    );
  }
}

export default withRouter(OrderForm)