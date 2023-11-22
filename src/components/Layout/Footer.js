import React,{Fragment} from 'react'
import { Link} from 'react-router-dom'
import { connect } from 'react-redux';




const Landing = ({isAuthenticated}) => {
return (
<footer>
   <div id="sub-footer">
      <div className="container">
         <div className="row">
            <div className="col-lg-6">
            </div>
         </div>
      </div>
   </div>
</footer>
)
}
Landing.propTypes={
isAuthenticated:PropTypes.bool
}
const mapStateToProps =state=>
 ({
isAuthenticated:state.auth.isAuthenticated
 })

export default connect(mapStateToProps)(Landing);
