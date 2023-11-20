
import React from 'react'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

export default class QuotationReport extends React.Component {
   state = {
      quotations: []
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
      axios.get(`${config.api_url}/quotation/quotation-report`)
         .then(res => {
            const quotations = res.data;
            this.setState({ quotations });
            console.log(quotations);
         })
   }

   /**
    * Function for deleting data
    * @param {*} id 
    */
   deleteData(id) {
      axios.delete(`${config.api_url}/quotation/${id}`)
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
                        <h2 className="pageTitle">Quotation Report</h2>
                     </div>
                  </div>
               </div>
            </section>
            <section id="content">
               <div className="container content">
                  <div>
                     <div className="col-md-12">
                        <div>
                           <h2 className='h2c'>All Quotation Report  </h2>
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
                              <th scope="col">Service Name</th>
                              <th scope="col">From Address</th>
                              <th scope="col">Date</th>
                              <th scope="col">To Address</th>
                              <th scope="col">Contact No</th>
                              <th scope="col">Email</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              this.state.quotations
                                 .map(quotation =>
                                    <tr>
                                       <th scope="row">{quotation.quotation_id}</th>
                                       <td>{quotation.user_name}</td>
                                       <td>{quotation.services_name}</td>
                                       <td>{quotation.quotation_from_address}</td>
                                       <td>{quotation.quotation_to_address}</td>
                                       <td>{quotation.quotation_date_time}</td>
                                       <td>{quotation.user_mobile}</td>
                                       <td>{quotation.user_email}</td>
                                       <td>
                                          <Link to={"/quotation-details/"+quotation.quotation_id}>
                                          <span className="glyphicon glyphicon-share sharei"></span>
                                          </Link>&nbsp;&nbsp;
                                          <a onClick={() => this.confirmatioBox(quotation.quotation_id)} href="#!">
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