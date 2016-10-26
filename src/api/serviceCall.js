import axios from 'axios';


export function axiosPost(url, data) {
  return (
 axios({
      url,
      method: 'POST',
      data: JSON.stringify(data.data),
      headers: data.headers || {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
      responseType: 'json'

    })
  )}

  
export function axiosGet(url, queryString= null) {
    var getUrl = url;
    if(!queryString){
        getUrl = getUrl+"/"+ queryString;
    }
  return (
axios.get(getUrl)
  .catch(function (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
  )}