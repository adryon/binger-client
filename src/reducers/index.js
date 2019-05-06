import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { pendingTasksReducer } from 'react-redux-spinner'
import app from './app'
import user from './user'
import tvSeries from './tvSeries'
import movies from './movies'

export default combineReducers({
  routing: routerReducer,
  pendingTasks: pendingTasksReducer,
  app,
  user,
  tvSeries,
  movies
})
