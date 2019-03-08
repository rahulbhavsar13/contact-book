import * as ActionTypes from './actionsTypes';

/**
 * Trigger workflow to fetch contact list.
 * @param {object} query 
 */
export const addContact = (data) => {
    return { type: ActionTypes.ADD_CONTACT, data };
};

/**
 * Trigger workflow to fetch contact list.
 * @param {object} query 
 */
export const receiveContactList = () => {
    return { type: ActionTypes.RECEIVE_CONTACT};
};

// export function receiveContact(json) {
//     return { type: ActionTypes.RECEIVE_CONTACT, contact: json.contact };
// }

// export function fetchContact() {
//     return dispatch => {
//         return fetch(url(), {
//             method: 'GET',
//             mode: 'cors',
//             credentials: 'include',
//             headers: {
//                 'x-api-key': apiKey,
//                 'Accept': 'application/json'
//             }
//         })
//             .then(response => response.json())
//             .then(json => dispatch(receiveContact(json)));
//     };
// }