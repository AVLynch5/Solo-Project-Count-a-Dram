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

function* getDrams(action) {
    try{
        const getDate = yield axios.get(`/api/dram/${action.payload}`);
        yield put({type: 'SET_DRAMS', payload: getDate.data})
    } catch(error) {
        console.log(`Error getting drams from ${action.payload}`, error);
    }
}

function* deleteDram(action) {
    try {
        const dramID = action.payload.id;
        const dramDate = action.payload.date;
        yield axios.delete(`/api/dram/${dramID}`);
        yield put({type: 'GET_DATE_DRAMS', payload: dramDate});
    } catch(error) {
        console.log('Error deleting dram', error);
    }
}

function* dramSaga() {
  yield takeLatest('ADD_NEW_DRAM', postDram);
  yield takeLatest('GET_DATE_DRAMS', getDrams);
  yield takeLatest('DELETE_DRAM', deleteDram);
}

export default dramSaga;