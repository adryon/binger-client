import defaultState from './default-state';
import {
  MOVIES_SEARCH,
  MOVIES_SEARCH_SUCCESS,
  MOVIES_SEARCH_CLEAR
} from './../actions/actions-types';

import config from './../lib/config';
import lockr from 'lockr';

lockr.prefix = config.LOCKR_PREFIX;

export default function userState(state = defaultState.movies, action) {

  switch (action.type) {

    case MOVIES_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        searchData: action.data
      });

    case MOVIES_SEARCH_CLEAR:
      return Object.assign({}, state, {
        searchData: []
      })

    default:
      return state;
  }
};
