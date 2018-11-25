/**
 * Gets the latet news from the api.
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_NEWS } from 'containers/App/constants';
import { newsLoaded, newsLoadingError } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Get news request/response handler
 */
export function* getNews() {
  // this can be move to a constant file
  const requestURL = 'http://localhost:3000/api/news';

  try {
    // Call our request helper (see 'utils/request')
    const news = yield call(request, requestURL);
    yield put(newsLoaded(news));
  } catch (err) {
    yield put(newsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* newsData() {
  // Watches for LOAD_NEWS actions and calls getNews when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_NEWS, getNews);
}
