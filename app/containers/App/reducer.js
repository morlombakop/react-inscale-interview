/*
 * AppReducer
 *
 */

import { fromJS } from 'immutable';

import { LOAD_NEWS_SUCCESS, LOAD_NEWS, LOAD_NEWS_ERROR } from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  news: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NEWS:
      return state.set('loading', true).set('error', false);
    case LOAD_NEWS_SUCCESS:
      return state.set('loading', false).set('news', action.news);
    case LOAD_NEWS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
