import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { PropTypes } from 'prop-types';
import { register } from '../../actions/auth';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {
   const navigate = useNavigate();


   function logout() {
      window.sessionStorage.removeItem("user");
      window.sessionStorage.removeItem("user_id");
      window.sessionStorage.removeItem("user_level_id");
      window.sessionStorage.removeItem("user_name");
      navigate("/CustomerLogin")
   }

   const agentLinks = (
      <ul>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/About">About</Link></li>
         <li><Link to="/location-add">Find Packers and Movers</Link></li>
         <li><Link to="/quotation-report">View Quotations</Link></li>
         <li><Link to={'/customer-add/'+window.sessionStorage.getItem("user_id")}>My Account</Link></li>
         <li><a onClick={logout} href="#!">Logout</a></li>
      </ul>
   )

   const customerLinks = (
      <ul>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/products/0">All Products</Link></li>
         <li><Link to="/product-cart">My Cart</Link></li>
         <li><Link to="/order-report">My Orders</Link></li>
         <li><Link to="/feedback">Submit Feedback</Link></li>
         <li><Link to={'/customer-add/'+window.sessionStorage.getItem("user_id")}>My Account</Link></li>
         <li><a onClick={logout} href="#!">Logout</a></li>
      </ul>
   )

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">
                     <Fragment>
                        {
                           window.sessionStorage.getItem("user_level_id") == "2" ? " Customer Dashboard" : ''
                        }
                     </Fragment>
                     </h2>
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
                                 <h2 className='h2c'>
                                 <Fragment>
                                    {
                                       window.sessionStorage.getItem("user_level_id") == "2" ? " Customer Dashboard" : ''
                                    }
                                 </Fragment>
                                 </h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        <section className="vh-100">
                        <div className="row">
                           <div className="col-sm-6">
                              <div id="login-home">
                                 {(
                                    <Fragment>
                                       {
                                          window.sessionStorage.getItem("user_level_id") == "2" ? customerLinks : ''
                                       }
                                    </Fragment>
                                 )}
                              </div>
                           </div>
                           <div className="col-sm-6">
                              <img src="/img/home.jpeg" style={{height:400, width:600}}/><br />
                           </div>
                        </div>
                        </section>
                     </div>
                  </section >
               </div >
            </div >
         </section >
      </section >
   );
};

Register.propTypes = {
   setAlert: PropTypes.func.isRequired,
   register: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool

};
const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);