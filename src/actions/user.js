import {
  USER_LOG_IN,
  USER_LOG_IN_FAIL,
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT_FAIL,
  USER_LOG_OUT_SUCCESS,
  USER_SET_CURRENT_USER,
  USER_LOAD_TV_SERIES_WISHLIST,
  USER_LOAD_MOVIES_WISHLIST,
} from './actions-types';
import http from './../lib/axios-wrapper';
import {notification} from 'antd';
import {push} from 'react-router-redux';
import firebase from 'firebase';
import _ from 'lodash';

export function loginSuccess(data) {
  return {type: USER_LOG_IN_SUCCESS, data};
}

export function loginFailed() {
  return {type: USER_LOG_IN_FAIL};
}

export function logOutFailed() {
  return {type: USER_LOG_OUT_FAIL};
}

export function logOutSuccess() {
  return {type: USER_LOG_OUT_SUCCESS};
}

export function setCurrentUser(data) {
  return {type: USER_SET_CURRENT_USER, data};
}

export function loadTVSeriesWishlist(data) {
  return {type: USER_LOAD_TV_SERIES_WISHLIST, data};
}

export function loadMoviesWishlist(data) {
  return {type: USER_LOAD_MOVIES_WISHLIST, data};
}

export function register(payload) {
  return function (dispatch) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(result => {
      firebase.database().ref(`users/${result.user.uid}`).set({
        name: payload.name,
        email: payload.email,
        avatar: 'gs://binger-e4fea.appspot.com/Avengers-Thor-icon.png',
      });
      notification.open({
        type: 'success',
        className: 'success',
        message: 'Account created!',
        description: 'You have successfully created a new account!',
      })
      dispatch(push('/login'));
    })
    .catch(error => {
      notification.open({
        type: 'error',
        className: 'error',
        message: 'Register failed!',
        description: error.message,
      })
    });
  }
}

export function login(payload) {
  return function (dispatch) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(result => {
      dispatch(loginSuccess(result.user));
      notification.open({
        type: 'success',
        className: 'success',
        message: 'You have successfully logged in!',
      })
      dispatch(push('/dashboard'));
    })
    .catch(error => {
      notification.open({
        type: 'error',
        className: 'error',
        message: 'Login failed!',
        description: error.message,
      })
    });
  }
}

export function logOut() {
  return function (dispatch) {
    firebase.auth().signOut().then(() => {
      dispatch(logOutSuccess());
      dispatch(push('/login'))
    })
    .catch(error => {
      dispatch(logOutFailed());
      dispatch(push('/login'))
    });
  }
}

export function getCurrentUser(payload) {
  return function (dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {
        const userData = Object.assign({}, snapshot.val(), {uid: user.uid})
        dispatch(setCurrentUser(userData))
      });
    });
  }
}

export function getTVSeriesWishlist() {
  return function (dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref(`/users/${user.uid}/tvSeriesWishlist`).on('value', snapshot => {
        let result = snapshot.val();
        _.keys(result).map(item => {
          result[item].uid = item;
        });
        dispatch(loadTVSeriesWishlist(_.toArray(result)))
      })
    });
  }
}

export function getMoviesWishlist() {
  return function (dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref(`/users/${user.uid}/moviesWishlist`).on('value', snapshot => {
        let result = snapshot.val();
        _.keys(result).map(item => {
          result[item].uid = item;
        });
        dispatch(loadMoviesWishlist(_.toArray(result)))
      })
    });
  }
}

export function deleteTVSeriesFromWishlist(payload, uid) {
  return function(dispatch) {
    firebase.database().ref(`users/${uid}/tvSeriesWishlist/${payload.uid}`).remove();
    notification.open({
      type: 'success',
      className: 'success',
      message: 'TV Series deleted from wishlist!',
      description: `You have succesfully deleted ${payload.name} from your wishlist!`,
    })
  }
}

export function deleteMovieFromWishlist(payload, uid) {
  return function(dispatch) {
    firebase.database().ref(`users/${uid}/moviesWishlist/${payload.uid}`).remove();
    notification.open({
      type: 'success',
      className: 'success',
      message: 'Movie deleted from wishlist!',
      description: `You have succesfully deleted ${payload.title} from your wishlist!`,
    })
  }
}