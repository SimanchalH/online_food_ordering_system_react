import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {  useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../../utils/config';

const CustomerAdd = () => {
   const navigate = useNavigate();
   const location = useLocation();

   // Function for edit //
   let { id } = useParams();

   // Alert message for displaying success and error ////
   const [message, setMessage] = useState({
      show_message: false,
      error_type: '',
      msg: ''
   });

   // Alert message for displaying success and error ////
   const [diplay, hidePassword] = useState('block');

   // Creating FormData Form elements ////
   const [formData, setFormData] = useState({
      customer_id: '',
      customer_level_id: '',
      customer_email: '',
      customer_password: '',
      customer_confirm_password: '',
      customer_first_name: '',
      customer_last_name: '',
      customer_dob: '',
      customer_address: '',
      customer_city: '',
      customer_state: '',
      customer_country: '',
      customer_mobile: '',
      customer_nationalty: ''
   });

   useEffect(() => {

      // if(window.sessionStorage.getItem("user_level_id") == 2) {
      //    hidePassword('none');
      // }

      if (location.state != null) {
         setMessage({
            show_message: true,
            error_type: location.state.error_type,
            msg: location.state.msg
         });
      }

      if (id) {
         axios.get(`${config.api_url}/customer/${id}`)
            .then(res => {
               console.log('Edit Data');
               console.log(res.data)
               setFormData(res.data);
            })
      }
   }, []);

   // Handlinng Change Event
   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   // Handling Submit
   const onSubmit = async (e) => {
      e.preventDefault();
      if (formData.customer_password != formData.customer_confirm_password && window.sessionStorage.getItem("user_level_id") !=2) {
         console.log(formData.customer_password+" AND "+formData.customer_confirm_password)
         setMessage({
            show_message: true,
            error_type: 'alert-danger',
            msg: 'Password and Confirm Password is not matching. Kindly re-enter !!!'
         });
         return 0;
      }
      // On submit //
      if (id) {
         axios({
            method: 'put',
            url: `${config.api_url}/customer/${id}`,
            data: formData,
         })
            .then(function (response) {
               //handle success
               console.log("Success  : ");
               console.log(response);
               setMessage({
                  show_message: true,
                  error_type: 'alert-success',
                  msg: 'Your Account Updated Successfully !!!'
               });
               navigate("/customer-add/" + id)
            })
            .catch(function (response) {
               //handle error
               console.log("Error  : ");
               console.log(response);
            });
      } else {
         // Check Customer Email Already Exits ///
         axios({
            method: 'get',
            url: `${config.api_url}/customer/check-customer-exits/${formData.customer_email}`
         })
            .then(function (customer_data) {
               console.log("customer data");
               if (customer_data.data.length == 0) {
                  axios({
                     method: 'post',
                     url: `${config.api_url}/customer`,
                     data: formData,
                  })
                     .then(function (response) {
                        //handle success
                        console.log("Success  : ");
                        console.log(response);
                        navigate("/CustomerLogin",
                           {
                              state:
                                 { msg: 'Your account has been successfully registered. Kinldy login.', error_type: 'alert-success' }
                           }
                        )
                        // navigate("/CustomerLogin")
                     })
                     .catch(function (response) {
                        //handle error
                        console.log("Error  : ");
                        console.log(response);
                     });
               } else {
                  setMessage({
                     show_message: true,
                     error_type: 'alert-danger',
                     msg: 'Email ID already exits. Kindly choose another email ID or login !!!'
                  });
               }
            });

      }
   };

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">Customer Registration</h2>
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
                                 <h2 className='h2c'>Customer Registration Form</h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                           {message.show_message ? (
                              <div className={'alert ' + message.error_type} role="alert">
                                 {message.msg}
                              </div>
                           ) : (
                              ''
                           )}
                           <div className='lgfrm'>
                              <form  onSubmit={onSubmit} className="form-horizontal">
                                 <div>
                                    <div className="row">
                                       <div className="col">
                                          <label>Email ID</label>
                                          <input type="email" className="form-control" id="customer_email" required name="customer_email" value={formData.customer_email} onChange={e => onChange(e)} />
                                       </div>
                                       <div className="col">
                                          &nbsp;
                                       </div>
                                    </div>
                                 </div>
                                 <div style={{display:diplay}}>
                                    <div className="row">
                                       <div className="col">
                                          <label>Password</label>
                                          <input type="password" className="form-control" id="customer_password" required name="customer_password" value={formData.customer_password} onChange={e => onChange(e)} />
                                       </div>
                                       <div className="col">
                                          <label>Confirm Password</label>
                                          <input type="password" className="form-control" id="customer_confirm_password" required name="customer_confirm_password" onChange={e => onChange(e)}   />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>First Name</label>
                                       <input type="text" className="form-control" id="customer_first_name" required name="customer_first_name" value={formData.customer_first_name} onChange={e => onChange(e)} />
                                    </div>
                                    <div className="col">
                                       <label>Last Name</label>
                                       <input type="text" className="form-control" id="customer_last_name" required name="customer_last_name" value={formData.customer_last_name} onChange={e => onChange(e)} />
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>Date of Birth</label>
                                       <input type="date" className="form-control" id="customer_dob" required name="customer_dob" value={formData.customer_dob} onChange={e => onChange(e)} />
                                    </div>
                                    <div className="col">
                                       <label>Mobile</label>
                                       <input type="text" className="form-control" id="customer_mobile" required name="customer_mobile" value={formData.customer_mobile} onChange={e => onChange(e)} />
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>Nationality</label>
                                       <input type="text" className="form-control" id="customer_nationalty" required name="customer_nationalty" value={formData.customer_nationalty} onChange={e => onChange(e)} />
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>Full Address</label>
                                       <input type="text" className="form-control" id="customer_address" required name="customer_address" value={formData.customer_address} onChange={e => onChange(e)} />
                                    </div>
                                    <div className="col">
                                       <label>City</label>
                                       <input type="text" className="form-control" id="customer_city" required name="customer_city" value={formData.customer_city} onChange={e => onChange(e)} />
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <label>State</label>
                                       <input type="text" className="form-control" id="customer_state" required name="customer_state" value={formData.customer_state} onChange={e => onChange(e)} />
                                    </div>
                                    <div className="col">
                                       <label>Country</label>
                                       <input type="text" className="form-control" id="customer_country" required name="customer_country" value={formData.customer_country} onChange={e => onChange(e)} />
                                    </div>
                                 </div>
                                 <div className='lgbtn'>
                                    <button type="submit" className="btn btn-success">Submit</button>&nbsp;&nbsp;
                                    <button type="reset" className="btn btn-danger">Reset</button>
                                 </div>
                              </form>
                           </div>
                        </section>
                     </div>
                  </section>
               </div>
            </div>
         </section>
      </section>
   );
};

export default CustomerAdd;
export def 
