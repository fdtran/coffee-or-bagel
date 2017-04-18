import axios from 'axios';
import { GET_MATCHES, GET_TARGET } from './types.jsx';
import { axiosInstance, getUserInfo } from './index.jsx';

export function getMatches (email, city) {
  return function (dispatch) {
    axiosInstance.get('/api/users', {
      headers: {
        Email: email,
        City: city
      }
    })
    .then(res => {
      dispatch({ type: GET_MATCHES, payload: res.data });
    })
    .catch(err => {
      console.error("unable to retrieve events data ", err);
    });
  }
}

export function getTarget (email) {
  return function (dispatch) {
    axiosInstance.get('/api/target', {
      headers: {
        Email: email
      }
    })
    .then(res => {
      dispatch({type: GET_TARGET, payload: res.data});
    })
    .catch(err => {
      console.error("unable to retrieve target data", err);
    });
  }
}


export function resetNotifications(email) {
  return function(dispatch) {
    axiosInstance.post('/api/notification', {
      Email: email
    })
    .then(res => {
      let token = localStorage.getItem("token");
      dispatch(getUserInfo(token, email, false));
    })
    .catch(err => {
      console.error("could not reset notifications", err);
    })
  }
}

