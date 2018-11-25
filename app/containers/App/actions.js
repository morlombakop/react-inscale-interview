/*
 * App Actions
 *
 */

import { LOAD_NEWS, LOAD_NEWS_SUCCESS, LOAD_NEWS_ERROR } from './constants';

/**
 * Load the news, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_NEWS
 */
export function loadNews() {
  return {
    type: LOAD_NEWS,
  };
}

/**
 * Dispatched when the news are loaded by the request saga
 *
 * @param  {object} news The news data
 *
 * @return {object} An action object with a type of LOAD_NEWS_SUCCESS passing the news
 */
export function newsLoaded(news) {
  return {
    type: LOAD_NEWS_SUCCESS,
    news,
  };
}

/**
 * Dispatched when loading the news fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_NEWS_ERROR passing the error
 */
export function newsLoadingError(error) {
  return {
    type: LOAD_NEWS_ERROR,
    error,
  };
}
