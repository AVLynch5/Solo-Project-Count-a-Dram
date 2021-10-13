import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchWhiskey() {
  try {
    const response = yield axios.get('/api/whiskey');
    yield put({ type: 'SET_WHISKIES', payload: response.data });
  } catch (error) {
    console.log('Whiskies GET request error', error);
  }
}

function* whiskeySaga() {
  yield takeLatest('FETCH_WHISKEY_DB', fetchWhiskey);
}

export default whiskeySaga;