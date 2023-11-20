
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

const HopitalList = () => {

   const [quotations, setData] = useState([]);
   const [search_text, setSearchData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);
   /**
    * Function for getting lists
    */
   useEffect(() => {
      axios.get(`${config.api_url}/quotation/quotation-report`)
         .then(res => {
            const quotations = res.data;
            setData(quotations);
            setFilteredData(quotations);
            console.log(quotations);
         })
   }, []);

   const reset_search = () => {
      search_text.search_text = '';
      setFilteredData(quotations);
   };

   const search_data = () => {
      const newData = quotations.filter(quotation => {
         return quotation.bgroup_name.toLowerCase().includes(search_text.search_text.toLowerCase())
         || quotation.quotation_city.toLowerCase().includes(search_text.search_text.toLowerCase())
         || quotation.quotation_name.toLowerCase().includes(search_text.search_text.toLowerCase());
       });

      if(search_text.search_text) {
         setFilteredData(newData);
      } else {
         setFilteredData(quotations);
      }
   };

    // Handlinng Change Event
    const onChange = (e) =>
    setSearchData({[e.target.name]: e.target.value });

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">Quotation Inventory</h2>
                  </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container content">
               <div className="row">
                  <div className="col-md-12">
                     <div>
                        <h2>All Quotation Inventory Report</h2>
                        These all are available quotation quotation. Kindly click on the quotations to see the details of it.
                     </div>
                     <br />
                     <form className="form-horizontal search_box">
                        <div className="form-group">
                           <label className="col-sm-2" htmlFor="email">Search Quotation:</label>
                           <div className="col-sm-4">
                              <input type="text" onChange={e => onChange(e)} name="search_text" className="form-control" placeholder="Search Quotation Group/City/Hospital" required />
                           </div>
                           <div className="col-sm-4">
                              <button type="button" className="btn btn-default" onClick={search_data}>Search</button>&nbsp;&nbsp;
                              <button type="reset" className="btn btn-danger" onClick={reset_search}>Reset</button>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
               <div className="row">
                  {
                     filteredData
                        .map(quotation =>
                           <div className="col-sm-4 info-blocks">
                              <i className="icon-info-blocks"><Link to={"/quotation-details/" + quotation.quotation_id}><img src={quotation.bgroup_image} width={75} /></Link></i>
                              <div className="info-blocks-in">
                                 <h3><Link to={"/quotation-details/" + quotation.quotation_id}><span style={{color:'red'}}>{quotation.bgroup_name}</span> <span style={{color:'green'}}>({quotation.quotation_quantity} Available)</span></Link></h3>
                                 <p>
                                    <table>
                                       <tr>
                                          <td>Quotation Quotation : </td>
                                          <td> {quotation.quotation_name}</td>
                                       </tr>
                                       <tr>
                                          <td>Contact : </td>
                                          <td> {quotation.quotation_contact}</td>
                                       </tr>
                                       <tr>
                                          <td>Email :</td>
                                          <td>{quotation.quotation_email}</td>
                                       </tr>
                                       <tr>
                                          <td>City :</td>
                                          <td>{quotation.quotation_city}</td>
                                       </tr>
                                    </table>
                                 </p>
                              </div>
                           </div>
                        )
                  }
               </div>
            </div>
         </section>
      </section>
   )
}
export default HopitalList;