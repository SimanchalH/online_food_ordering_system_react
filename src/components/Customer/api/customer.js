import axios from "axios";

export const getAllCustomer=()=>async dispatch=>
{
    console.log("I am here");
  try {
      const res=await axios.get(`${config.api_url}/customer`);
      console.log("Calling Get All Customer");
      console.log(res);
      dispatch ({
          type:'GET_Customer',
          payload:res.data
      });
  } catch (err) {
      dispatch ({
          type:'Error in  calling API',
          payload:{msg:err.response.statusText,status:err.response.status}
      }); 
  }
}

