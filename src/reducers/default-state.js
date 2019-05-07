import lockr from 'lockr';
import config from './../lib/config';
import {Map, List} from 'immutable';

lockr.prefix = config.LOCKR_PREFIX;

const hasToken = lockr.get('Authorization');

export default {
  app: {
    from: '',
    isUpdatingContent: false,
    isLoading: false,
    activeDialog: '',
    dialogForms: {},
    submitForms: {},
    isHideLogin: false,
    layoutState: {
      isMenuTop: false,
      menuMobileOpened: false,
      menuCollapsed: false,
      menuShadow: true,
      themeLight: true,
      squaredBorders: false,
      borderLess: true,
      fixedWidth: false,
      settingsOpened: false,
    },
  },
  user: {
    authenticated: !!hasToken,
    data: {},
    rolesConstants: {},
    isFetching: false,
    tvSeriesWishlist: [],
    moviesWishlist: [],
  },
  tvSeries: {
    searchData: {}
  },
  movies: {
    searchData: {},
    viewMovie: null,
  }
};
