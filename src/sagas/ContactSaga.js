import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionsTypes';
import * as ContactActions from '../actions/contactActions';
import { ContactsService } from '../services';
//import { handleRemoteData } from './AppSaga';

/**
 * Saga handler to handle API Call.
 * @param {Function}  API function which need to call
 * @param {Object}  Parameters which want to pass function
 */
export function* handleRemoteData(api, ...params) {
    try {
      const response = yield call(api, ...params);
      if(response.status >= 200 && response.status <= 300) {
        return response;
      } else {
        return response;
      }
    } catch (e) {
      console.log(e)
    } 
  }

/**
 * Exposes saga definition for all workflows related to Devices
 */
export default function* ContactsSaga() {
    yield all([
        takeEvery(ActionTypes.FETCH_CONTACT, fetchContactList),
        takeLatest(ActionTypes.ADD_CONTACT, addContact),
    ]);
}

/**
 * Saga handler to fetch contact.
 * @param {object} payload
 */
export function* fetchContactList(payload) {
    try {
        const fetchContacts = yield call(handleRemoteData, ContactsService.fetchContacts);
        yield put(ContactActions.receiveContactList(fetchContacts.data));
    } catch (e) {
        console.log(e)
    }
}


/**
 * Saga handler to Add contact.
 * @param {object} payload
 */
export function* addContact(payload) {
  console.log(payload)
  debugger;
    try {
        const addContact = payload
        console.log(addContact)
        yield put(ContactActions.receiveContactList(addContact));
    } catch (e) {
        console.log(e)
    }
}
