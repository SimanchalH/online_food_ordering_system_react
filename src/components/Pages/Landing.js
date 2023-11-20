
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import config from '../../utils/config';



const Landing = () => {
   const [categories, setData] = useState([]);
   const [search_text, setSearchData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);
   /**
    * Function for getting lists
    */
   useEffect(() => {
      axios.get(`${config.api_url}/categories`)
      .then(res => {
         const categories = res.data;
         setData(categories);
         setFilteredData(categories);
         console.log(categories);
      })
   }, []);


   return (
      <section>
         <div className="home-page">
            <section className="jumbobox">
               <div className="container">
                  <div className="row">
                     <div className="col-lg-12 leftclass">
                        <div>
                        <h4 className="myhead"><strong>Online Food Ordering System</strong></h4>
                           <p>  Online food shopping is a form of electronic commerce which allows consumers to directly buy goods or services from a seller over the Internet using a web browser or a mobile app. Consumers find a product of interest by visiting the website of the retailer directly or by searching among alternative vendors using a shopping search engine, which displays the same product's availability and pricing at different e-retailers. As of 2020, customers can shop online using a range of different computers and devices, including desktop computers, laptops, tablet computers and smartphones. An online shop evokes the physical analogy of buying products or services at a regular "bricks-and-mortar" retailer or shopping center; the process is called business-to-consumer (B2C) online shopping. When an online store is set up to enable businesses to buy from another businesses, the process is called business-to-business (B2B) online shopping. A typical online store enables the customer to browse the firm's range of products and services, view photos or images of the products, along with information about the product specifications, features and prices.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         
            <section>
            <div className="container py-5">
               <h4 className="myhead"><strong>Shop By Category</strong></h4>
               <div className="row">
               <div className="row">
               {
                     filteredData
                        .map(category =>
                           <div class="col-md-6 col-lg-4">
                           <div class="single_service">
                               <div class="thumb">
                                 <img className="pic-1" src={"http://127.0.0.1:8080/uploads/"+category.category_image_filename} />
                               </div>
                               <div class="service_info">
                                   <h3><Link to={"/products/"+category.category_id}>{category.category_title}</Link></h3>
                               </div>
                           </div>
                       </div>
                    )
                  }
               </div>
               </div>
            </div>
            </section>
            
            <section className="aboutUs">
               <div className="container">
                  <div className="row">
                     <div className="col-md-6"><img src="img/home.jpeg" className="img-center" alt="" style={{height:300}} /></div>
                     <div className="col-md-6">
                        <div>
                           <h2>About Online Food Ordering System</h2>
                           <p>  Online shopping is a form of electronic commerce which allows consumers to directly buy goods or services from a seller over the Internet using a web browser or a mobile app. Consumers find a product of interest by visiting the website of the retailer directly or by searching among alternative vendors using a shopping search engine, which displays the same product's availability and pricing at different e-retailers. As of 2020, customers can shop online using a range of different computers and devices, including desktop computers, laptops, tablet computers and smartphones. An online shop evokes the physical analogy of buying products or services at a regular "bricks-and-mortar" retailer or shopping center; the process is called business-to-consumer (B2C) online shopping.</p>
                        </div>
                        <br />
                     </div>
                  </div>
               </div>
            </section>
         </div>
         <a href="#" className="scrollup"><i className="fa fa-angle-up active"></i></a>
      </section>
   )
}

export default Landing;