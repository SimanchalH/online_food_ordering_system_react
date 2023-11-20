import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import config from '../../utils/config';

const QuotationAdd = ({ setAlert, quotation, isAuthenticated }) => {
   const navigate = useNavigate();
   // Function for edit //
   let { id } = useParams();

   const [servicesDropDown, setservicesDropDown] = useState([{
      services_id: '',
      services_name: ''
   }]);

   const [quotationDropDown, setQuotationDropDown] = useState([{
      quotation_id: '',
      quotation_name: ''
   }]);

   const [formData, setFormData] = useState({
      quotation_id: '',
      quotation_service_id: '',
      quotation_user_id: window.sessionStorage.getItem("user_id"),
      quotation_from_address: '',
      quotation_to_address: '',
      quotation_date_time: '',
      quotation_reference: '',
      quotation_details: ''
   });

    // Creating FormData Form elements ////
    const [message, setMessage] = useState({
      show_message: false,
      error_type: '',
      msg: ''
    });

   useEffect(() => {
      if (id) {
         axios.get(`${config.api_url}/quotation/${id}`)
            .then(res => {
               console.log('Edit Data');
               console.log(res.data)
               setFormData(res.data);
            })
      }
      // Get  Quotation Group Dropdown
      axios.get(`${config.api_url}/services`)
      .then(res => {
         setservicesDropDown(res.data);
      })

      // Get  Quotation Quotation Dropdown
      axios.get(`${config.api_url}/quotation`)
      .then(res => {
         setQuotationDropDown(res.data);
      })
   }, []);

   // Handlinng Change Event
   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   // Handling Submit
   const onSubmit = async (e) => {
      e.preventDefault();
      // On submit //
      if (id) {
         axios({
            method: 'put',
            url: `${config.api_url}/quotation/${id}`,
            data: formData,
         })
            .then(function (response) {
               //handle success
               console.log("Success  : ");
               console.log(response);
               navigate("/quotation-report")
            })
            .catch(function (response) {
               //handle error
               console.log("Error  : ");
               console.log(response);
            });
      } else {
         axios({
            method: 'post',
            url: `${config.api_url}/quotation`,
            data: formData,
         })
            .then(function (response) {
               //handle success
               console.log("Success  : ");
               console.log(response);
               navigate("/quotation-report")
            })
            .catch(function (response) {
               //handle error
               console.log("Error  : ");
               console.log(response);
            });
      }
   };

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">Quotation Entry</h2>
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
                                 <h2 className='h2c'>Quotation Entry Form</h2>
                              </div>
                              <br />
                           </div>
                        </div>
                        {message.show_message ? (
                           <div className={'alert ' + message.error_type} role="alert">
                              {message.msg}
                           </div>
                        ) : (
                           ''
                        )}
                        <section className="vh-100">
                           <div className="d-flex justify-content-center align-items-center h-100 frmc">
                              <form className="form-horizontal" onSubmit={onSubmit}>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Select Service :</label>
                                    <div className="col-sm-8">
                                    <select name='quotation_service_id' value={formData.quotation_service_id} onChange={e => onChange(e)}  className="form-control">
                                       <option>Select Service</option>
                                       {servicesDropDown.map((option) => (
                                          <option value={option.services_id}>{option.services_name}</option>
                                       ))}
                                    </select>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Shift From Address :</label>
                                    <div className="col-sm-8">
                                       <textarea name="quotation_from_address" onChange={e => onChange(e)} className="form-control" placeholder="Shift From Address" required value={formData.quotation_from_address}></textarea>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Shift To Address :</label>
                                    <div className="col-sm-8">
                                       <textarea name="quotation_to_address" onChange={e => onChange(e)} className="form-control" placeholder="Shift To Address" required value={formData.quotation_to_address}></textarea>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Service Date :</label>
                                    <div className="col-sm-8">
                                       <input type="date" value={formData.quotation_date_time} onChange={e => onChange(e)} name="quotation_date_time" className="form-control" placeholder="Service Date" required />
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">References :</label>
                                    <div className="col-sm-8">
                                       <textarea name="quotation_reference" onChange={e => onChange(e)} className="form-control" placeholder="Enter References" required value={formData.quotation_reference}></textarea>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="email">Details of Services:</label>
                                    <div className="col-sm-8">
                                       <textarea name="quotation_details" onChange={e => onChange(e)} className="form-control" placeholder="Enter details of all Items" required value={formData.quotation_details}></textarea>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <div className="col-sm-offset-4 col-sm-8">
                                       <button type="submit" className="btn btn-default">Submit</button>&nbsp;&nbsp;
                                       <button type="reset" className="btn btn-danger">Reset</button>
                                    </div>
                                 </div>
                                 <input type="hidden" value={window.sessionStorage.getItem("user_id")} class="form-control" id="quotation_user_id" name="quotation_user_id" />
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

QuotationAdd.propTypes = {
   setAlert: PropTypes.func.isRequired,
   quotation: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool

};
const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert })(QuotationAdd);