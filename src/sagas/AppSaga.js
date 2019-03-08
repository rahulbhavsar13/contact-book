import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import * as ActionTypes from '../actions/actionsTypes';
import * as Actions from '../actions/Actions';
import * as AppActions from '../actions/AppsActions';
import { AppsService, GlobalService, LoggerService, DatabaseService } from '../../services';
import APIHelper from '../../utils/APIHelper';

/**
 * Exposes saga definition for all workflows within the app.
 */
export default function* appSaga() {
  yield all([
    // takeEvery(ActionTypes.SELECT_MENU, selectMenu),
    // takeEvery(ActionTypes.SELECT_SUB_MENU, selectSubMenu),
    // takeLatest(ActionTypes.API_VERSION_REQUEST, fetchAPIVersion),
    // takeLatest(ActionTypes.EVENTS_REQUEST, fetchEvents),

    // //Handlers for Apps
    // takeEvery(ActionTypes.APP_BUNDLE_LIST_REQUEST, fetchApps),
    // takeEvery(ActionTypes.APP_BUNDLE_DETAILS_REQUEST, fetchAppDetail),
    // takeLatest(ActionTypes.APP_BUNDLE_DETAILS_SUBMIT_REQUEST, submitAppDetails),
    // takeLatest(ActionTypes.APP_BUNDLE_DELETE_REQUEST, deleteApp),
    // takeLatest(ActionTypes.REQUEST_API_BASE_URL, fetchAPIBaseURL),

    // //handlers for policy version
    // takeEvery(ActionTypes.REQUEST_LATEST_POLICY_VERSION, getLatestPolicyVersion)
  ]);
} 

/**
 * Saga handler to fetch latest policy version.
 */
export function* getLatestPolicyVersion(){
  try{
    const fetchLatestPolicyVersion = yield call(handleRemoteData, GlobalService.fetchLatestPolicyVersion);
    if(fetchLatestPolicyVersion.status >= 200 && fetchLatestPolicyVersion.status <= 300 && fetchLatestPolicyVersion.data && fetchLatestPolicyVersion.data.list) {
      yield put(Actions.receiveLatestPolicyVersion(fetchLatestPolicyVersion.data.list));
    }else {
      yield put(Actions.receivePreLoginAPIError());
    }
  } catch (e) {
    LoggerService.reportError(e);
    yield put(Actions.receivePreLoginAPIError());
  }
}


/**
 * Saga handler to handle API Call.
 * @param {Function}  API function which need to call
 * @param {Object}  Parameters which want to pass function
 */
export function* handleRemoteData(api, ...params) {
  try {
    yield put(showLoading('applicationBar'));
    const response = yield call(api, ...params);
    yield put(hideLoading('applicationBar'));
    if(response.status >= 200 && response.status <= 300) {
      return response;
    } else if(response.status === 401) {
      yield put(Actions.informSessionTimedout());
    } else {
      return response;
    }
  } catch (e) {
    LoggerService.reportError(e);
  } finally {
    yield put(hideLoading('applicationBar'));
  }
}

/**
 * Saga handler to handle bulk API Calls.
 * To be used when making multiple cll to same API with different payloads
 * @param {Function}  API function which need to call
 * @param {Array} Array of parameters which want to pass to API function
 */
export function* handleBulkOperation(api, params) {
  let responses, sessionTimedOut= false;
  try {
      yield put(showLoading('applicationBar'));
      let calls = {};
      params.forEach(param => {
        calls[param[0]] = call(api, ...param)
      });
      responses = yield all(
        calls
      );
  } catch (e) {
    LoggerService.reportError(e);
  } finally {
    yield put(hideLoading('applicationBar'));
    Object.keys(responses).forEach((key) => {
      if(responses[key].status === 401) {
        sessionTimedOut = true;
      }
    })
    if(sessionTimedOut) {
      yield put(Actions.informSessionTimedout());
    } else {
      return responses;
    }
  }
}


/**
 * Saga handler for select menu operation.
 * @param {Object} menu 
 */
export function* selectMenu(menu) {
  yield put({ type: ActionTypes.SELECT_MENU_ACTIVE, primaryNavigation: menu.payload });
}

/**
 * Saga handler for select subMenu operation.
 * @param {Object} subMenu 
 */
export function* selectSubMenu(subMenu) {
  yield put({ type: ActionTypes.SELECT_SUB_MENU_ACTIVE, secondaryNavigation: subMenu.payload });
}

/** 
 * Handles fetching of the deployed API version. 
 */
export function* fetchAPIVersion() {
  try {
    const fetchAPIVersionResponse = yield call(handleRemoteData, GlobalService.fetchAPIVersion);
    yield put(Actions.receiveAPIVersion(fetchAPIVersionResponse.data.version.ver));
  } catch (e) {
    LoggerService.reportError(e);
  }
}

/**
 * Handles fetching of all app events.
 */
export function* fetchEvents(events) {
  try {
    const filters = {};
    if (events.payload) {
      if (events.payload.name) {
        filters.objname = events.payload.name;
      }
      if (events.payload.limit) {
        filters.limit = events.payload.limit;
      }
      if (events.payload.token) {
        filters.token = events.payload.token;
      }
      if (events.payload.startTime) {
        filters['startTime.seconds'] = events.payload.startTime;
      }
      if (events.payload.endTime) {
        filters['endTime.seconds'] = events.payload.endTime;
      }
    }
    const fetchEventsResponse = yield call(handleRemoteData, GlobalService.fetchEvents, filters);
    yield put(Actions.receiveAllEvents(fetchEventsResponse.data));
  } catch (e) {
    LoggerService.reportError(e);
  }
}

/**
 * Saga handler to fetch list of apps.
 */
export function* fetchApps() {
  try {
    let fetchApps = yield call(handleRemoteData, AppsService.fetchApps);
    yield put(Actions.receiveAppList(fetchApps.data));
  } catch (e) {
    LoggerService.reportError(e);
  }
}

/**
 * Saga handler to fetch API Base URL.
 */
export function* fetchAPIBaseURL() {
  try {
    let fetchApiConfiguration = yield call(handleRemoteData, GlobalService.fetchAPIBaseURL);
    if(fetchApiConfiguration.status === 200 && fetchApiConfiguration.data) {
      DatabaseService.set(DatabaseService.keys.DYNAMIC_CONFIG, JSON.stringify(fetchApiConfiguration.data));
      if (fetchApiConfiguration.data.api_base_url) {
        APIHelper.API_ENDPOINT =  fetchApiConfiguration.data.api_base_url;
      }
    } else {
      APIHelper.API_ENDPOINT = APIHelper.FALLBACK_API_ENDPOINT;
    }
  } catch (e) {
    //Error while fetching API Base URL, navigate to default.
    APIHelper.API_ENDPOINT = APIHelper.FALLBACK_API_ENDPOINT;
  }
}

/**
 * Saga handler to fetch detail of apps.
 */
export function* fetchAppDetail(payload) {
  try {
    let fetchAppDetail = yield call(handleRemoteData, AppsService.fetchAppDetailById, payload.id);
    yield put(AppActions.receiveAppDetails(fetchAppDetail.data));
  } catch (e) {
    LoggerService.reportError(e);
  }
}

/*
 * Saga handler to submit app details.
 */
export function* submitAppDetails(payload) {
  try {
      const payloadDetails = payload.details;
      let details = {
          'name': payloadDetails.name,
          'title': payloadDetails.title,
          'description': payloadDetails.description,
          'manifest': payloadDetails.manifest,
          'revision': payloadDetails.revision
      };
      if (payloadDetails.id && payloadDetails.id != '') {
          details['id'] = payloadDetails.id;
      }
      const submitAppDetailsResponse = yield call(handleRemoteData, AppsService.submitAppDetails, details);
      const submitAppResponseDetails = submitAppDetailsResponse.data;
      if (submitAppResponseDetails) {
        if (submitAppResponseDetails.httpStatusCode == 200) {
          yield put(AppActions.submittedAppDetails(submitAppResponseDetails.objectName || details.name));
        } else if (submitAppResponseDetails.error && submitAppResponseDetails.error.length > 0) {
          const errors = submitAppResponseDetails.error;
          const error = errors[errors.length - 1];
          yield put(AppActions.informAppSubmitError({ message: error.details }));
        } else {
          yield put(AppActions.informAppLocalizedError({ id: "edgeapplications.action.submit.error.message" }));
        }
      }else if(submitAppDetailsResponse && submitAppDetailsResponse.status === 504){
        yield put(AppActions.informAppLocalizedError({ id: "app.instances.generic.response.failure.504"}));
      }else if(submitAppDetailsResponse && submitAppDetailsResponse.status === 502){
        yield put(AppActions.informAppLocalizedError({ id: "app.instances.generic.response.failure.502"}));
      }else {
        yield put(AppActions.informAppLocalizedError({ id: "edgeapplications.action.submit.error.message" }));
      }
  } catch (e) {
    LoggerService.reportError(e);
  }
}

/**
 * Handles app deletion using the requested id.
 * @param {object} payload 
 */
export function* deleteApp(payload) {
  try {
      let deleteAppResponse = yield call(handleRemoteData, AppsService.deleteAppById, payload.id);
      const deleteAppResponseDetails = deleteAppResponse.data;
      if (deleteAppResponseDetails) {
        if (deleteAppResponseDetails.httpStatusCode == 200) {
          yield put(AppActions.informAppDeleteSuccess(deleteAppResponseDetails.objectName || payload.name));
        } else if (deleteAppResponseDetails.error && deleteAppResponseDetails.error.length > 0) {
          const errors = deleteAppResponseDetails.error;
          const error = errors[errors.length - 1];
          yield put(AppActions.informAppDeleteError({ message: error.details }));
        } else {
          yield put(AppActions.informAppLocalizedError({ id: "edgeapplications.action.delete.error.message" }));
        }
      }else{
        yield put(AppActions.informAppLocalizedError({ id: "edgeapplications.action.delete.error.message" }));
      }
  } catch (e) {
    LoggerService.reportError(e);
  }
}
