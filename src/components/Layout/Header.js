
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { LOGOUT } from '../../actions/types';



const Header = () => {
  const navigate = useNavigate();

  function logout() {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("user_id");
    window.sessionStorage.removeItem("user_level_id");
    window.sessionStorage.removeItem("user_name");
    navigate("/CustomerLogin",
      {
        state:
          { msg: 'Your have logged out successully !!!.', error_type: 'alert-success' }
      }
    )
  }

  console.log("Session Storage : ");
  console.log(window.sessionStorage.getItem("user"));

  

  const usersLinks = (
    <ul className="nav navbar-nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/About">About</Link></li>
      <li><Link to="/Dashboard">Dashboard</Link></li>
      <li><Link to="/products/0">All Products</Link></li>
      <li className="dropdown">
        <a href="#" data-toggle="dropdown" className="dropdown-toggle">My Administration<b className="caret"></b></a>
        <ul className="dropdown-menu">
          <li><Link to="/product-cart">My Cart</Link></li>
          <li><Link to="/order-report">My Orders</Link></li>
         <li><Link to="/feedback">Submit Feedback</Link></li>
         <li><Link to={'/customer-add/'+window.sessionStorage.getItem("user_id")}>My Account</Link></li>
        </ul>
      </li>
      <li><a onClick={logout} href="#!">Logout</a></li>
    </ul>
  )


  const guestLinks = (
    <ul className="nav navbar-nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/About">About</Link></li>
      <li><Link to="/category-list">Category</Link></li>
      <li><Link to="/products/0">All Products</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/CustomerLogin">Login</Link></li>
      <li><Link to="/feedback">Feedback</Link></li>
    </ul>
  )
  return (
    <header>
      <div className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand theadh">Online Food Ordering System</Link>
          </div>
          <div className="navbar-collapse collapse ">
            {(
              <Fragment>
                {
                    window.sessionStorage.getItem("user_level_id") == "2" ? usersLinks :
                      
                }
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header;
