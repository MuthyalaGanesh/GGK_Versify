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
  )
}

export function axiosGet(url, queryString = null) {
  var getUrl = url;
  if (!!queryString) {
    getUrl = getUrl + "?" + queryString;
  }
  return (
    axios.get(getUrl)
    .catch(function(error) {
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
    })
  )
}

export function XMLHttpRequestSyncGet(url, queryString = null) {
  var getUrl = url;
  if (!!queryString) {
    getUrl = getUrl + "?" + queryString;
  }
  try {
    var request = new XMLHttpRequest();
    request.open('GET', getUrl, false); // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
      return JSON.parse(request.response);
    } else {
      console.error(getUrl, "Status: ", request.status);
      return [];
    }
  } catch (error) {
    console.error(getUrl, "Error: ", error);
  };
}

export function XMLHttpRequestSyncSaveLocationPost(url, dataObj) {

  try {
          axios({
            url,
            method: 'POST',
            data: data,
            headers: {
              "From": "jmcneil@versify.com",
              "User-Agent": "FiddlerCompose",
              "Content-Type": "application/json"
            },
            responseType: 'json'

          }).then(function(response) {
            console.log(response);
          }).catch(function(error) {
            console.error(url, "axios error: ", error);

          });
      } catch (error) {
        console.error(url, "Error: ", error);
      };
}