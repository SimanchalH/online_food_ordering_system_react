import axios from "axios";

export const getAllQuotation=()=>async dispatch=>
{
    console.log("I am here");
  try {
      const res=await axios.get(`${config.api_url}/quotation`);
      console.log("Calling Get All Quotation");
      console.log(res);
      dispatch ({
          type:'GET_Quotation',
          payload:res.data
      });
  } catch (err) {
      dispatch ({
          type:'Error in  calling API',
          payload:{msg:err.response.statusText,status:err.response.status}
      }); 
  }
}

