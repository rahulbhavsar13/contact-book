/**
 * Common helper for local data storage needs.
 */
const DatabaseService = {

    /** 
     *  Lists all known keys for data storage.
     */
    keys: {
        SESSION : 'session',
        STATE : 'state',
        DYNAMIC_CONFIG: 'dynamicConfig',
        REMOTE_CONSOLE_CONNECTION: 'remoteConsoleConnection'
    },

    /**
     * Loads and returns saved `state`
     */
    loadState() {
        try  {
            const serializedState = this.get(this.keys.STATE);
            if(serializedState === null) {
                //No State exists. Reducer should initialize the application state.
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch(error) {
            //Reducer should initialize the application state.
            return undefined;
        }
    },
    
    /**
     * Saves requested state to local data store.
     * @param {Object} state 
     */
    saveState(state) {
        try {
            const serializedState = JSON.stringify(state);
            this.set(this.keys.STATE, serializedState);
        } catch(error) {
            throw new Error('Error encountered while saving state: ' + error);
        }
    },

    /**
     * Helper method to fetch session token from storage
     */
    getSessionToken() {
        try {
            let session = this.get(this.keys.SESSION);
            if (session) {
                const token = JSON.parse(session).token;
                if (token) {
                    return token.base64;
                }
            }
        } catch (error) {
            throw new Error('Error encountered while retrieving session token: ' + error);
        }
        return '';
    },

    /**
     * Helper method to fetch session from storage
     */
    getSession() {
        try {
            let session = this.get(this.keys.SESSION);
            if (typeof session == 'string') {
                return JSON.parse(session);
            } else {
                return session;
            }
        } catch (error) {
            throw new Error('Error encountered while retrieving session information: ' + error);
        }
    },

    /**
     * Loads and returns saved `dynamicConfig`
     */
    getDynamicConfig() {
        try  {
            const serializedConfig = this.get(this.keys.DYNAMIC_CONFIG);
            if(serializedConfig === null) {
                return undefined;
            }
            return JSON.parse(serializedConfig);
        } catch(error) {
            return undefined;
        }
    },

    /**
     * Clears up all the saved items.
     */
    clear() {
        localStorage.clear();
    },

    /**
     * Sets a serizalized value against requested key.
     * @param {String} key 
     * @param {String} value 
     */
    set(key, value) {
        localStorage.setItem(key, value);
    },

    /**
     * Returns serialized value stored against requested key.
     * @param {String} key 
     */
    get(key) {
        return localStorage.getItem(key);
    }
};

export default DatabaseService;