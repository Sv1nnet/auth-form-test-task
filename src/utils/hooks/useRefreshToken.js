import { useCallback } from 'react';
import { useStore } from 'react-redux';
import auth from '../../actions/authActions';

/**
 * Get a function that makes request for getting content and if access token is expired
 * it sends refresh request. If the refresh request is successful the function repeats content request.
 * If it's successful the function returns result of the content request, otherwise
 * it removes refresh and access tokens from the store and returns an error. 
 * @param {Function} getContent function which is used for gettig fontent by using accesss token
 * @returns {Function} function memoized by React.useCallback
 */
const useRefreshToken = (getContent) => {
  const store = useStore();
  return useCallback(() => getContent().catch(async (err) => {
    if (err.message === 'jwt expired' || err.statusCode === 401) {
      try {
        await auth.refresh()(store.dispatch, store.getState);
        return await getContent();
      } catch (error) {
        throw error;
      }
    } else {
      throw err;
    }
  }), [getContent, store]);
};

export default useRefreshToken;
