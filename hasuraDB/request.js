const axios = require("axios");
const { hasura_url, hasura_secret } = require("../secret/admin_secret");

module.exports = async (query) => {
  let response = "";
  if(query ==null || query ===" "){
    return "Error in query!!"
  }
  try {

    const data = await axios.post(
      hasura_url,
      {
        query: query,
        variables: {},
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": hasura_secret,
        },
      }
      )
      
      return  response = data.data.data ;
    }catch(err){
      console.log(err)
    }
  };
