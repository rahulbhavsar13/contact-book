import { DatabaseService } from "../services";
//import { buffers, eventChannel, END } from 'redux-saga';

/**
* Fallback function for reading value from env file for cloud environments.
* Returns empty string for localhost, which facilitates use of Proxy server,
* to avoid CORS pre flight requests. 
*/
const getFallbackAPIHost = () => {
  const origin = window.location && window.location.origin;
  if (!origin.includes('localhost')) {
    return `${process.env.REACT_APP_ZEDCLOUD_HOST}`;
  } else {
    return '';
  }
}

/**
 * Returns the default API host.
 */
const getDefaultAPIHost = () => {
  const origin = window.location && window.location.origin;
  if (!origin.includes('localhost')) {
    return `${origin}`;
  } else {
    return `${process.env.REACT_APP_ZEDCLOUD_HOST}`;
  }
}

/**
 * Helper for making all HTTP calls
 */
const APIHelper = {

  /**
   * API endpoint. This gets replaced pre-login if the serving host
   * chooses to redirect further calls to a different endpoint.
   */
  API_ENDPOINT: getDefaultAPIHost(),

  FALLBACK_API_ENDPOINT : getFallbackAPIHost(),
  /**
   * GET call to fetch api base information.
   */
  unauthenticedGet: async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return {
          status: response.status,
          data: data
        };
      } else {
        return {
          status: response.status,
          data: null
        }
      }
    } catch (error) {
      return {
        status: 503,
        data: null
      }
    }
  },

  /**
   * GET call to fetch information using an auth bearer token.
   */
  fetchData: async (url) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': buildTokenHeader()
      };
      const response = await fetch(url,
        {
          headers: headers
        }
      );
      if (response.ok) {
        const data = await response.json();
        return {
          status: response.status,
          data: data
        };
      } else {
        return {
          status: response.status,
          data: null
        }
      }
    } catch (error) {
      return {
        status: 503,
        data: null
      }
    }
  },

  /**
   * GET call to fetch information using an auth bearer token.
   */
  fetchContent: async (url) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const response = await fetch(url,
        {
          headers: headers
        }
      );
      if (response.ok) {
        const text = await response.text();
        return {
          status: response.status,
          text: text
        };
      } else {
        return {
          status: response.status,
          text: null
        }
      }
    } catch (error) {
      return {
        status: 503,
        data: null
      }
    }
  },

  /**
   * Request for an image using an auth bearer token.
   */
  fetchImage: async (url) => {
    const headers = {
      'Authorization': buildTokenHeader()
    };
    const response = await fetch(url,
      {
        headers: headers
      }
    );
    if (response.ok) {
      const image = await response.blob();
      return {
        status: response.status,
        data: image
      };
    } else {
      return {
        status: response.status,
        data: null
      }
    }
  },

  /**
   * Makes a POST call with an auth bearer token.
   */
  post: async (url, headers, payload) => {
    try {
      if (!headers) {
        headers = new Headers({
          'Content-Type': 'application/json'
        });
      }
      headers.set('Authorization', buildTokenHeader());
      const response = await fetch(url, 
        { 
          headers: headers, 
          method: 'POST', 
          body: JSON.stringify(payload)
        }
      );
      const data = await response.json();
      if(response.ok){
        return {
          status: response.status,
          data: data
        };
      }else{
        return {
          status: response.status,
          data: null,
          error: data.error
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Makes a POST call with an custom auth bearer token.
   */
  postCustomToken: async (url, headers, payload, token) => {
    try {
      if (!headers) {
        headers = new Headers({
          'Content-Type': 'application/json'
        });
      }
      let authToken = 'Bearer '.concat(token)
      headers.set('Authorization', authToken);
      const response = await fetch(url, 
        { 
          headers: headers, 
          method: 'PUT', 
          body: JSON.stringify(payload),
        }
      );
      try{
        const data = await response.json();
        return {
          status: response.status,
          data: data
        };
      }catch(e){
        return {
          status: response.status,
          data: null
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Makes a POST call to backend without any auth bearer token.
   * This should be invoked only in scenarios where token isn't available e.g. login
   */
  unauthenticedPost: async (url, headers, payload) => {
    try {
      if (!headers) {
        headers = new Headers({
          'Content-Type': 'application/json',
          'Origin': '*'
        });
      }
      const response = await fetch(url, 
        { 
          headers: headers, 
          method: 'POST', 
          body: JSON.stringify(payload)
        }
      );
      if (response.ok) {
        try{
          const data = await response.json();
          return {
            status: response.status,
            data: data
          };
        }catch(e){
          return {
            status: response.status,
            data: null
          }
        }
      } else {
        return {
          status: response.status,
          data: null
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Makes a PUT call with an auth bearer token.
   */
  put: async (url, headers, payload) => {
    try {
      if (!headers) {
        headers = new Headers({
          'Content-Type': 'application/json'
        });
      }
      headers.set('Authorization', buildTokenHeader());
      const response = await fetch(url, 
        { 
          headers: headers, 
          method: 'PUT', 
          body: JSON.stringify(payload)
        }
      );
      const data = await response.json();
      return {
        status: response.status,
        data: data
      };
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Makes a multipart PUT call with an auth bearer token.
   * Any additional params, other than the file should be sent as
   * payload.fileMetaData: [{name: <String>, value: <String>}]
   */
  uploadPut: async (url, headers, payload) => {
    try {
      if (!headers) {
        headers = new Headers({

        });
      }
      headers.set('Authorization', buildTokenHeader());
      const formData = new FormData();
      formData.append(payload.name, payload.file, payload.fileName);
      if(payload && Array.isArray(payload.fileMetaData)) {
        payload.fileMetaData.forEach((data) => {
          formData.append(data.name, data.value);
        });
      }
      const response = await fetch(url, 
        { 
          headers: headers, 
          method: 'PUT', 
          body: formData
        }
      );
      const data = await response.json();
      return {
        status: response.status,
        data: data
      };
    } catch (error) {
      console.log(error);
    }
  }, 

  /**
   * Makes a DELETE call using the auth bearer token.
   */
  delete: async(url, headers) => {
    try {
      if (!headers) {
        headers = new Headers({
          'Content-Type': 'application/json'
        });
      }
      headers.set('Authorization', buildTokenHeader());
      const response = await fetch(url, 
        { 
          headers: headers, 
          method: 'DELETE'
        }
      );
      const data = await response.json();
      return {
        status: response.status,
        data: data
      };
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Flattens params object for request friendly string.
   */
  flattenParams: (params, delimiter = '&') => {

    if (params && Object.keys(params).length > 0) {
      return Object.keys(params).reduce(function(a,key){a.push(key+'='+params[key]);return a},[]).join(delimiter);
    }
    return '';
  }
};

/**
 * Common helper to build auth request token.
 */
const buildTokenHeader = () => {
  let authToken = DatabaseService.getSessionToken();
  if (authToken === '') {
    throw new Error('Unexpected error, no valid session token found. Cannot proceed!');
  }
  authToken = 'Bearer '.concat(authToken);

  return authToken;
}

export default APIHelper;