import axios from 'axios';
import { IP } from './vars.config';
import setAuthHeaders from './utils/setAuthHeaders';

/**
 * Signup user
 * @param {Object} data - object that contains users email and password
 * @param {string} data.email - users email
 * @param {string} data.password - users password
 * @returns Promise
 */
export const signup = (data) => {
  setAuthHeaders();
  return axios.post(`${IP}/auth/signup`, data);
};

/**
 * Signin user
 * @param {Object} data - object that contains users email and password
 * @param {string} data.email - users email
 * @param {string} data.password - users password
 * @returns Promise
 */
export const signin = (data) => {
  setAuthHeaders();
  return axios.post(`${IP}/auth/signin`, data);
};

/**
 * Signout user
 * @param {Object} data - object that contains refresh token
 * @param {string} data.value - refresh token
 * @returns Promise
 */
export const signout = (data) => {
  setAuthHeaders();
  return axios.post(`${IP}/auth/signout`, data);
};

/**
 * Refresh token
 * @param {Object} data - object that contains refresh token
 * @param {string} data.value - refresh token
 * @returns Promise
 */
export const refresh = (data) => {
  setAuthHeaders();
  return axios.post(`${IP}/auth/refresh`, data);
};

/**
 * Refresh token
 * @param {string} token - access token
 * @returns Promise
 */
export const userList = (token) => {
  setAuthHeaders(token);
  return axios.get(`${IP}/user/list`);
};

export default {
  signup,
  signin,
  signout,
  refresh,
  userList,
};
