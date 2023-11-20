
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link, Navigate } from 'react-router-dom';
import config from '../../utils/config';
import { withRouter } from "react-router"
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {

   // Function for edit //
   let { id } = useParams();
   let orderForm = {};
   let sellForm =  {};
   const navigate = useNavigate();
   const customer_level_id = window.sessionStorage.getItem("customer_level_id");
   const customer_id =  window.sessionStorage.getItem("customer_id");

   const [productDetails, setData] = useState({});

   const addToCart = () => {
      console.log("Customer ID : " + customer_id)
      if (customer_id) {
         if (window.sessionStorage.getItem("order_id")) {
            saveSells();
         } else {
            saveOrder();
         }
      } else {
         navigate("/CustomerLogin",
         {
           state:
             { msg: 'Kindy login to add item into the cart !!!.', error_type: 'alert-danger' }
         }
       )
      }
   };

   const saveSells = () => {
      sellForm.sell_product_id = productDetails.product_id;
      sellForm.sell_price_per_unit = productDetails.product_cost;
      sellForm.sell_order_id = window.sessionStorage.order_id;
      sellForm.sell_units = 1
      sellForm.sell_total_cost = productDetails.product_cost;
      addItems();
   };

   const addItems = () => {
      console.log(sellForm);
      axios({
         method: 'post',
         url: `${config.api_url}/sells`,
         data: sellForm,
       })
      .then(function (response) {
         console.log(response);
         navigate('/product-cart');
      })
      .catch(function (response) {
         console.log(response);
      });
   };

   const saveOrder = () => {
      let myDate = new Date();
      let todayDate = ""//datePipe.transform(myDate, 'dd MMM yyyy hh:mm a');
      console.log("Date = " + todayDate);
      orderForm.order_date = todayDate;
      orderForm.order_customer_id = customer_id;
      orderForm.order_total = 0;
      orderForm.order_status = "In Progress";
      addOrder();

   };

   const addOrder = () => {
      axios({
         method: 'post',
         url: `${config.api_url}/orders`,
         data: orderForm,
       })
      .then(function (response) {
         console.log(response);
         window.sessionStorage.order_id = response['order_id'];
         console.log("Order ID : " + window.sessionStorage.order_id);
         saveSells();
      })
      .catch(function (response) {
         console.log(response);
      });
   };

   useEffect(() => {
      if (id) {
         axios.get(`${config.api_url}/product/product-details/${id}`)
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
                     <h2 className="pageTitle">&nbsp;</h2>
                  </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container">
               <div className="about">
                  <div>
                     <div>
                        <div>
                           <h2 className='h2c'>{productDetails.product_title} Details</h2>
                        </div>
                        <br />
                     </div>
                  </div>
                  <section class="product_area single-post-area">
                     <div class="container">
                        <div class="container-fliud">
                           <div class="wrapper row">
                              <div class="preview col-md-6">
                                 <div class="preview-pic tab-content">
                                    <div class="tab-pane active" id="pic-1"><img src={"http://127.0.0.1:8080/uploads/" + productDetails.product_image_filename} /></div>
                                 </div>
                              </div>
                              <div class="details col-md-6">
                                 <h3 class="product-title">{productDetails.product_title}</h3>
                                 <table class="table table-striped table-hover">
                                    <tbody>
                                       <tr>
                                          <td colSpan={2}>{productDetails.product_description}</td>
                                       </tr>
                                       <tr>
                                          <th>Product Cost : </th>
                                          <td>{productDetails.product_cost}</td>
                                       </tr>
                                       <tr>
                                          <th>Company : </th>
                                          <td>{productDetails.company_name}</td>
                                       </tr>
                                       <tr>
                                          <th>Category : </th>
                                          <td>{productDetails.category_title}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                                 <div class="action">
                                    <button class="add-to-cart btn btn-default"  onClick={addToCart} type="button">add to cart</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>
               </div>
            </div>
         </section>
      </section>
   )
}

export default ProductDetails;