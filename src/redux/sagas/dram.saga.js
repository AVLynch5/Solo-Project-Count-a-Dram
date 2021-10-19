import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//post new dram entry
function* postDram(action) {
  try {
    const newDram = action.payload;
    yield axios.post('/api/dram', newDram);
  } catch (error) {
    console.log('new dram POST request error', error);
  }
}

//get dram entries by date
function* getDrams(action) {
    try{
        const getDate = yield axios.get(`/api/dram/${action.payload}`);
        yield put({type: 'SET_DRAMS', payload: getDate.data});
    } catch(error) {
        console.log(`Error getting drams from ${action.payload}`, error);
    }
}

//delete dram entry by id
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

//edit dram entry by id
function* putDram(action) {
  try {
    const dramID = action.payload.id;
    const editObject = action.payload;
    yield axios.put(`/api/dram/${dramID}`, editObject);
  } catch(error) {
    console.log('Error editing dram', error);
  }
}

//get dram data by date range
function* getData(action) {
  try {
    const getDateRange = yield axios.get(`/api/dram/range/${action.payload}`);
    console.log(action.payload);
    yield put({type: 'SET_RANGE_DRAMS', payload: getDateRange.data});
  } catch (error) {
    console.log('Error GETting date data in range', error);
  }
}

function* dramSaga() {
  yield takeLatest('ADD_NEW_DRAM', postDram);
  yield takeLatest('GET_DATE_DRAMS', getDrams);
  yield takeLatest('DELETE_DRAM', deleteDram);
  yield takeLatest('EDIT_DB_DRAM', putDram);
  yield takeLatest('GET_RANGE_DRAMS', getData);
}

export default dramSaga;