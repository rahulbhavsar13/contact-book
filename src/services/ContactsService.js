import APIHelper from '../utils/APIHelper';

/**
 * Utility having all API calls related to Management workflows.
 */
const ContactsService = {

    fetchContacts: async (filters) => {
        let url = `${APIHelper.API_ENDPOINT}/api/v1/contact`;
        let filterQuery = '';
        if (Object.keys(filters).length > 0) {
            filterQuery = APIHelper.flattenParams(filters);
            url += `?${filterQuery}`;
        }
        return await APIHelper.fetchData(url);
    },

    addContacts: async (filters) => {
        let url = `${APIHelper.API_ENDPOINT}/api/v1/contact`;
        let filterQuery = '';
        if (Object.keys(filters).length > 0) {
            filterQuery = APIHelper.flattenParams(filters);
            url += `?${filterQuery}`;
        }
        return await APIHelper.fetchData(url);
    },
};

export default ContactsService;
