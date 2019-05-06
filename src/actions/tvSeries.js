import {
  TV_SERIES_SEARCH,
  TV_SERIES_SEARCH_SUCCESS,
  TV_SERIES_SEARCH_CLEAR
} from './actions-types';
import http from './../lib/axios-wrapper';
import {notification} from 'antd';
import {push} from 'react-router-redux';
import firebase from 'firebase';
import config from '../lib/config';

export function tvSeriesSearchSuccess(data) {
  return {type: TV_SERIES_SEARCH_SUCCESS, data};
}

export function tvSeriesSearchClear() {
  return {type: TV_SERIES_SEARCH_CLEAR};
}

export function tvSeriesSearch(searchTerm) {
  return function (dispatch) {

  	const payload = {
  		api_key: config.THE_MOVIE_DB_TOKEN,
  		language: 'en-US',
  		query: searchTerm,
  	}

  	return http.get(`search/tv`, payload)
      .then(result => {
        result.results = result.results.map(item => {
          return Object.assign({}, item, {key: item.id})
        })

        dispatch(tvSeriesSearchSuccess(result));
      })
      .catch(error => {
        notification.open({
          type: 'error',
          message: 'The TV Series cannot be retrieved!',
          description: 'Please contact the administrator.',
        })
      });
  }
}

export function tvSeriesAddToWishList(payload, uid) {
  return function(dispatch) {
    firebase.database().ref(`users/${uid}/tvSeriesWishlist`).push(payload);
    notification.open({
      type: 'success',
      className: 'success',
      message: 'TV Series added to wishlist!',
      description: `You have succesfully added ${payload.name} to your wishlist!`,
    })
  }
}