
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';
import { withRouter } from "react-router"
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';

const HopitalDetails = () => {

   // Function for edit //
   let { id } = useParams();

   const [quotationDetails, setData] = useState({});

   useEffect(() => {
      if (id) {
         axios.get(`${config.api_url}/quotation/quotation-detaills/${id}`)
            .then(res => {
               console.log(res.data);
               setData(res.data[0]);
            })
      }
   }, []);

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">Details of Quotation</h2>
                  </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container">
               <div className="about">
                  <section className="features">
                     <div className="container">
                        <div>
                           <div>
                              <div>
                                 <h2 className='h2c'>Details of Quotation ID : {quotationDetails.quotation_id}</h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                        <table className="table table-striped table-bordered" style={{width:"70%"}}>
                        <thead className="thead-dark">
                           <tr>
                              <th scope="col" style={{width:'30%'}}>Column</th>
                              <th scope="col">Data</th>
                           </tr>
                        </thead>
                           <tbody>
                              <tr>
                                 <th className="thead-dark">Customer Name</th>
                                 <td>{quotationDetails.user_name}</td>
                              </tr>
                              <tr>
                                 <th className="thead-dark">Customer Email</th>
                                 <td className='invetorycf'>{quotationDetails.user_email}</td>
                              </tr>
                              <tr>
                                 <th className="thead-dark">Customer Contact</th>
                                 <td>{quotationDetails.user_mobile}</td>
                              </tr>
                              <tr>
                                 <th className="thead-dark">Services Requested  For</th>
                                 <td>{quotationDetails.services_name}</td>
                              </tr>
                              <tr>
                                 <th className="thead-dark">From Address</th>
                                 <td>{quotationDetails.quotation_from_address}</td>
                              </tr>
                              <tr>
                                 <th className="thead-dark">To Address</th>
                                 <td>{quotationDetails.quotation_to_address}</td>
                              </tr>
                              <tr>
                                 <th className="thead-dark">Shiting Date</th>
                                 <td>{quotationDetails.quotation_date_time}</td>
                              </tr>
                              <tr>
                                 <th className="thead-dark">References</th>
                                 <td>{quotationDetails.quotation_reference}</td>
                              </tr>
                              <tr>
                                 <th className="thead-dark">Quotation Details</th>
                                 <td>{quotationDetails.quotation_details}</td>
                              </tr>
                           </tbody>
                           </table>
                        </section>
                     </div>
                  </section>
               </div>
            </div>
         </section>
      </section>
   )
}

export default HopitalDetails;