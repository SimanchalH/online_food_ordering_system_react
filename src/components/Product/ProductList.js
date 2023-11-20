
import axios from 'axios';
import Parser from 'html-react-parser';
import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link,useParams } from 'react-router-dom';
import config from '../../utils/config';

const ProductList = () => {

   let { id } = useParams();
   const [products, setData] = useState([]);
   const [filteredData, setFilteredData] = useState([]);
   /**
    * Function for getting lists
    */
   useEffect(() => {
      axios.get(`${config.api_url}/product/all-product/${id}`)
         .then(res => {
            const products = res.data;
            setData(products);
            setFilteredData(products);
            console.log(products);
         })
   }, []);

   

   

   // Handlinng Change Event
   

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">All Products</h2>
                  </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container content">
               <div className="row">
                  <div className="col-md-12">
                     <div>
                        <h2>All Products</h2>
                        These all are available products. Kindly click on the products to see the details of it.
                     </div>
                     <br />
                     
                  </div>
               </div>
               <div className="row">
               {
                     filteredData
                        .map(product =>
                        <div className="col-md-3 col-sm-6 product-list">
                           <div className="product-grid">
                              <div className="product-image">
                                 <a href="#" className="image">
                                    <img className="pic-1" src={"http://127.0.0.1:8080/uploads/"+product.product_image_filename} />
                                 </a>
                                 <span class="product-sale-label">{product.category_title}</span>
                                 <ul className="product-links">
                                    <li><Link to={"/product-details/" + product.product_id}><i className="fa fa-shopping-bag"></i> Add to cart</Link></li>
                                    <li><Link to={"/product-details/" + product.product_id}><i className="fa fa-search"></i> Quick View</Link></li>
                                 </ul>
                              </div>
                              <div className="product-content">
                                 <h3 className="title"><a href="#">{product.product_title}</a></h3>
                                 <div className="price">Cost : {Parser(config.currency_symbol)} {product.product_cost}.00/-</div>
                              </div>
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
export default ProductList;