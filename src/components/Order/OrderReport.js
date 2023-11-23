
import React from 'react'
import Parser from 'html-react-parser';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

export default class OrderReport extends React.Component {
   state = {
      orders: []
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
      axios.get(`${config.api_url}/orders/customer-orders/${window.sessionStorage.getItem("user_id")}`)
         .then(res => {
            const orders = res.data;
            this.setState({ orders });
            console.log(orders);
         })
   }

   /**
    * Function for deleting data
    * @param {*} id 
    */
   deleteData(id) {
      axios.delete(`${config.api_url}/order/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.componentDidMount();
      })
   }

   render() {
      return (
         <section>
            <section id="content">
               <div className="container content">
                  <div>
                     <div className="col-md-12">
                        <div>
                           <h4 className='myhead'>All Orders Report</h4>
                        </div>
                        <br />
                     </div>
                  </div>
                  <div>
                     <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                           <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Customer Name</th>
                              <th scope="col">Order Date</th>
                              <th scope="col">Total Amount</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              this.state.orders
                                 .map(order =>
                                    <tr>
                                       <th scope="row">{order.order_id}</th>
                                       <td>{order.customer_name}</td>
                                       <td>{order.order_date}</td>
                                       <td>{Parser(config.currency_symbol)}  {order.order_total}</td>
                                       <td className={order.order_status}>{order.order_status}</td>
                                       <td>
                                          <Link to={"/order-details/"+order.order_id}>
                                          <span className="glyphicon glyphicon-check checki"></span>
                                          </Link>&nbsp;&nbsp;
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
