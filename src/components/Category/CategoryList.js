
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import config from '../../utils/config';

const CategoryList = () => {

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

   const reset_search = () => {
      search_text.search_text = '';
      setFilteredData(categories);
   };

   const search_data = () => {
      const newData = categories.filter(category => {
         return category.category_title.toLowerCase().includes(search_text.search_text.toLowerCase());
      });

      if (search_text.search_text) {
         setFilteredData(newData);
      } else {
         setFilteredData(categories);
      }
   };

   // Handlinng Change Event
   const onChange = (e) =>
      setSearchData({ [e.target.name]: e.target.value });

   return (
      <section>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <h2 className="pageTitle">All Category</h2>
                  </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container content">
               <div className="row">
                  <div className="col-md-12">
                     <div>
                        <h2>All Category</h2>
                        These all are available categories. Kindly click on the categories to see the details of it.
                     </div>
                     <br />
                     
                  </div>
               </div>
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
         </section>
      </section>
   )
}
export default CategoryList;