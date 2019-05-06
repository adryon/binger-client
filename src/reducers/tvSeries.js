import defaultState from './default-state';
import {
  TV_SERIES_SEARCH,
  TV_SERIES_SEARCH_SUCCESS,
  TV_SERIES_SEARCH_CLEAR
} from './../actions/actions-types';

import config from './../lib/config';
import lockr from 'lockr';

lockr.prefix = config.LOCKR_PREFIX;

export default function userState(state = defaultState.tvSeries, action) {

  switch (action.type) {

    case TV_SERIES_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        searchData: action.data
      });

    case TV_SERIES_SEARCH_CLEAR:
      return Object.assign({}, state, {
        searchData: []
      })

    default:
      return state;
  }
};
