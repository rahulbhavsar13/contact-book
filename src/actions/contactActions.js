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
