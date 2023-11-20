
import React from 'react'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

export default class CustomerReport extends React.Component {
   state = {
      customer: []
   }
   
   /**
    * Confirmation Dialogue Implementation
    */
   confirmatioBox = (id) => {
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to delete this record ?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.deleteData(id)
          },
          {
            label: 'No'
          }
        ]
      });
    }

   /**
    * Function for getting lists
    */
   componentDidMount() {
      axios.get(`${config.api_url}/customer/list/2`)
         .then(res => {
            const customer = res.data;
            this.setState({ customer });
            console.log(customer);
         })
   }

   /**
    * Function for deleting data
    * @param {*} id 
    */
   deleteData(id) {
      axios.delete(`${config.api_url}/customer/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.componentDidMount();
      })
   }

   render() {
      return (
         <section>
            <section id="inner-headline">
               <div className="container">
                  <div className="row">
                     <div className="col-lg-12">
                        <h2 className="pageTitle">Customer Report</h2>
                     </div>
                  </div>
               </div>
            </section>
            <section id="content">
               <div className="container content">
                  <div>
                     <div className="col-md-12">
                        <div>
                           <h2 className='h2c'>All Customer Report  </h2>
                        </div>
                        <br />
                     </div>
                  </div>
                  <div>
                  <div className='add-button btn btn-success'><Link to="/register">Add New Customer</Link></div>
                     <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                           <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Customer Name</th>
                              <th scope="col">Contact No</th>
                              <th scope="col">Email</th>
                              <th scope="col">City</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              this.state.customer
                                 .map(customer =>
                                    <tr>
                                       <th scope="row">{customer.customer_id}</th>
                                       <td>{customer.customer_first_name} {customer.customer_last_name}</td>
                                       <td>{customer.customer_mobile}</td>
                                       <td>{customer.customer_email}</td>
                                       <td>{customer.customer_city}</td>
                                       <td>
                                          <Link to={"/customer-details/"+customer.customer_id}>
                                          <span className="glyphicon glyphicon-share sharei"></span>
                                          </Link>&nbsp;&nbsp;
                                          <a onClick={() => this.confirmatioBox(customer.customer_id)} href="#!">
                                             <span className="glyphicon glyphicon-trash deletei"></span>
                                          </a>
                                       </td>
                                    </tr>
                                 )
                           }
                        </tbody>
                     </table>
                  </div>
               </div>
            </section>
         </section>
      )
   }
}