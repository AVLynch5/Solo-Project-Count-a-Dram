import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postDram(action) {
  try {
    const newDram = action.payload;
    yield axios.post('/api/dram', newDram);
    //fetch whiskey to update whiskeyreducer
    yield put({ type: 'FETCH_WHISKEY_DB'});
  } catch (error) {
    console.log('new dram POST request error', error);
  }
}

function* dramSaga() {
  yield takeLatest('ADD_NEW_DRAM', postDram);
}

export default dramSaga;