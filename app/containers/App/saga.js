import { takeEvery, select, put, call } from 'redux-saga/effects';
import 'whatwg-fetch';

import { TYPOLOGY, MAX_LOAD_ATTEMPTS, PATHS, PAGES } from 'config';

import { selectLocale } from 'containers/LanguageProvider/selectors';

import {
  selectTypologyReadyByKey,
  selectTypologyRequestedByKey,
  selectContentReadyByKey,
  selectContentRequestedByKey,
} from './selectors';

import {
  setTypologyRequested,
  setTypologyLoadError,
  setTypologyLoadSuccess,
  setContentRequested,
  setContentLoadError,
  setContentLoadSuccess,
} from './actions';

import { LOAD_TYPOLOGY, LOAD_CONTENT } from './constants';

/**
 * Generator function. Function for restarting sagas multiple times before giving up and calling the error handler.
 * - following https://codeburst.io/try-again-more-redux-saga-patterns-bfbc3ffcdc
 *
 * @param {function} generator the saga generator to be restarted
 * @param {function} handleError the error handler after X unsuccessful tries
 * @param {integer} maxTries the maximum number of tries
 */
const autoRestart = (generator, handleError, maxTries = MAX_LOAD_ATTEMPTS) =>
  function* autoRestarting(...args) {
    let n = 0;
    while (n < maxTries) {
      n += 1;
      try {
        yield call(generator, ...args);
        break;
      } catch (err) {
        if (n >= maxTries) {
          yield handleError(err, ...args);
        }
      }
    }
  };

/**
 * Generator function. Load data error handler:
 * - Record load error
 *
 * @param {object} payload {key: data set key}
 */
function* loadDataErrorHandler(err, { key }) {
  yield put(setTypologyLoadError(err, key));
}
function* loadContentErrorHandler(err, { key, contentType, locale }) {
  yield put(setContentLoadError(err, contentType, locale, key));
}

export function* loadDataSaga({ key }) {
  if (TYPOLOGY[key]) {
    // requestedSelector returns the times that entities where fetched from the API
    const requestedAt = yield select(selectTypologyRequestedByKey, key);
    const ready = yield select(selectTypologyReadyByKey, key);
    // If haven't loaded yet, do so now.
    if (!requestedAt && !ready) {
      const url = `${PATHS.DATA}/${TYPOLOGY[key].path}`;
      try {
        // First record that we are requesting
        yield put(setTypologyRequested(key, Date.now()));
        const response = yield fetch(url);
        const responseOk = yield response.ok;
        if (responseOk && typeof response.json === 'function') {
          const json = yield response.json();
          if (json) {
            yield put(setTypologyLoadSuccess(key, json, Date.now()));
          } else {
            yield put(setTypologyRequested(key, false));
            throw new Error(response.statusText);
          }
        } else {
          yield put(setTypologyRequested(key, false));
          throw new Error(response.statusText);
        }
      } catch (err) {
        yield put(setTypologyRequested(key, false));
        // throw error
        throw new Error(err);
      }
    }
  }
}

// key expected to include full path, for at risk data metric/country
export function* loadContentSaga({ key, contentType, locale }) {
  if (PAGES[key] || TYPOLOGY[contentType]) {
    const requestedAt = yield select(selectContentRequestedByKey, {
      contentType,
      locale,
      key,
    });
    const ready = yield select(selectContentReadyByKey, {
      contentType,
      locale,
      key,
    });
    // If haven't loaded yet, do so now.
    if (!requestedAt && !ready) {
      const requestLocale = yield locale || select(selectLocale);
      let url;
      if (contentType === 'pages') {
        const page = PAGES[key];
        url = `${PATHS.CONTENT}/${requestLocale}/${page.path}/`;
      }
      if (TYPOLOGY[contentType]) {
        const typo = TYPOLOGY[contentType];
        url = `${PATHS.CONTENT}/${requestLocale}/${typo.contentPath}/${key}`;
      }
      if (url) {
        try {
          // First record that we are requesting
          yield put(setContentRequested(contentType, locale, key, Date.now()));
          const response = yield fetch(url);
          const responseOk = yield response.ok;
          if (responseOk && typeof response.text === 'function') {
            const responseBody = yield response.text();
            if (responseBody) {
              yield put(
                setContentLoadSuccess(
                  contentType,
                  locale,
                  key,
                  responseBody,
                  Date.now(),
                ),
              );
            } else {
              yield put(setContentRequested(contentType, locale, key, false));
              throw new Error(response.statusText);
            }
          } else {
            yield put(setContentRequested(contentType, locale, key, false));
            throw new Error(response.statusText);
          }
        } catch (err) {
          // throw error
          yield put(setContentRequested(contentType, locale, key, false));
          throw new Error(err);
        }
      }
    }
  }
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(
    LOAD_TYPOLOGY,
    autoRestart(loadDataSaga, loadDataErrorHandler, MAX_LOAD_ATTEMPTS),
  );
  yield takeEvery(
    LOAD_CONTENT,
    autoRestart(loadContentSaga, loadContentErrorHandler, MAX_LOAD_ATTEMPTS),
  );
}
