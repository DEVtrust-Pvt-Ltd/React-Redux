import axios from 'axios'
var qs = require('qs');

//We are calling the API(s) here.

// registerNewUser is the name of the API.

// We get the data from the action and pass the request to the server.

export const registerNewUser = (data) => {   
    console.log("api call",data); 
var data = qs.stringify({
    'firstName': data['firstName'],
    'middleName': '',
    'lastName': data['lastName'],
    'email':data['email'],
    'contact':data['contact'],
    'password':data['password'],
    'confirmPassword':data['confirmPassword']

  });
  var config = {
    method: 'post',
    url: 'http://3.17.207.43/euromaxfood/public/api/adduser',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  return axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}
export const loginUser = (data) => {   
    console.log(data);
    var data = qs.stringify({
        'email': data['user_name'],
        'password': data['password'],
      });
      console.log(data);
      var config = {
        method: 'post',
        url: 'http://3.17.207.43/euromaxfood/public/api/login',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      return axios(config)
      .then(function (response) {
      
        return response.data

      })
      .catch(function (error) {
        console.log(error);
      });
}

export const userPlanApi = (data) => {  

const obj = JSON.parse(data)

var data = qs.stringify({
  'token': JSON.parse(localStorage.getItem('setToken')) 
});
var config = {
  method: 'post',
  url: 'http://3.17.207.43/euromaxfood/public/api/planmaster',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};
return axios(config)
.then(function (response) {
  return response;
})
.catch(function (error) {
  console.log(error);
});
}

export const unsubscribePlan=(data)=>{
  var data = qs.stringify({
    'userid': data['user_id'],
    'planId': data['planId'],
    'token': data['Token'] 
  });
  var config = {
    method: 'post',
    url: 'http://3.17.207.43/euromaxfood/public/api/planunscbscribe',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  return axios(config)
  .then(function (response) {
   
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}
