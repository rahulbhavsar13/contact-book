import * as ActionTypes from '../actions/actionsTypes';

const initialState = {
    contact : {
        list: [
            {
                "name": "Rahul Bhavsar",
                "mobile": "9890360004",
                "email": "rahulbhavsar13@gmail.com",
                "address": "Near Chandani Chouk, Bavdhan, Pune - 411021"
            },
            {
                "name": "ARahul Bhavsar",
                "mobile": "9890360004",
                "email": "rahulbhavsar13@gmail.com",
                "address": "Near Chandani Chouk, Bavdhan, Pune - 411021"
            },
            {
                "name": "ZRahul Bhavsar",
                "mobile": "9890360004",
                "email": "rahulbhavsar13@gmail.com",
                "address": "Near Chandani Chouk, Bavdhan, Pune - 411021"
            },
            {
                "name": "Ritul Bhavsar",
                "mobile": "9890360004",
                "email": "rrb@gmail.com",
                "address": "Near Chandani Chouk, Bavdhan, Pune - 411021"
            }
        ]        
    }
}


let contact = {
    list:[
        {
            "name": "Rahul Bhavsar",
            "mobile": "9890360004",
            "email": "rahulbhavsar13@gmail.com"
        },
        {
            "name": "Ritul Bhavsar",
            "mobile": "9890360004",
            "email": "rrb@gmail.com"
        },
    ]
}

export default (state = initialState, { type, data, modal, query }) => {

    switch (type) {
        case ActionTypes.FETCH_CONTACT:
            return {
                ...state,
                contact: contact && contact.list,
                requesting: false,
                submitted: false,
                successful: false,
                activity: 'list'
            };
        case ActionTypes.RECEIVE_CONTACT:
            return {
                ...state,
                contact: contact && contact.list || data,
                requesting: false,
                submitted: false,
                successful: false,
                activity: 'list'
            };
        case ActionTypes.ADD_CONTACT:
            return {
                ...state,
                contact:{
                    ...state.contact,
                    contact:{
                        list:processRecord(state, data)
                    }
                },
                requesting: false,
                submitted: false,
                successful: false,
                activity: 'list'
            };
        default:
            return state;
    }
}

const processRecord = (state, data) => {
    return state.contact.list.push(data);
}