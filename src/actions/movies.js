import {
  MOVIES_SEARCH,
  MOVIES_SEARCH_SUCCESS,
  MOVIES_SEARCH_CLEAR,
  MOVIES_GET_DETAILS_SUCCESS,
} from './actions-types';
import http from './../lib/axios-wrapper';
import {notification} from 'antd';
import {push} from 'react-router-redux';
import firebase from 'firebase';
import config from '../lib/config';

export function moviesSearchSuccess(data) {
  return {type: MOVIES_SEARCH_SUCCESS, data};
}

export function moviesSearchClear() {
  return {type: MOVIES_SEARCH_CLEAR};
}

export function getMovieDetailsSuccess(data) {
  return {type: MOVIES_GET_DETAILS_SUCCESS, data};
}

export function moviesSearch(searchTerm) {
  return function (dispatch) {

  	const payload = {
  		api_key: config.THE_MOVIE_DB_TOKEN,
  		language: 'en-US',
  		query: searchTerm,
  	}

  	return http.get(`search/movie`, payload)
      .then(result => {
        result.results = result.results.map(item => {
          return Object.assign({}, item, {key: item.id})
        })

        dispatch(moviesSearchSuccess(result));
      })
      .catch(error => {
        notification.open({
          type: 'error',
          message: 'The movie cannot be retrieved!',
          description: 'Please contact the administrator.',
        })
      });
  }
}

export function moviesAddToWishList(payload, uid) {
  return function(dispatch) {
    firebase.database().ref(`users/${uid}/moviesWishlist`).push(payload);
    notification.open({
      type: 'success',
      className: 'success',
      message: 'Movie added to wishlist!',
      description: `You have succesfully added ${payload.title} to your wishlist!`,
    })
  }
}

export function getMovieDetails(movie_id) {
  return function(dispatch) {
    const payload = {
      api_key: config.THE_MOVIE_DB_TOKEN,
      language: 'en-US',
    }

    return http.get(`movie/${movie_id}`, payload)
      .then(result => {
        dispatch(getMovieDetailsSuccess(result));
      })
      .catch(error => {
        notification.open({
          type: 'error',
          message: 'The movie cannot be retrieved!',
          description: 'Please contact the administrator.',
        })
      });
  }
}