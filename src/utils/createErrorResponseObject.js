/**
 * Creates object from failed request
 * @param {object} err object that contains response object
 * @param {object} err.response response from failed request
 * @param {object} err.response.data contains error message
 * @param {string} err.response.data.err error message
 * @param {string} err.response.status response status code
 * @return {{
 *  message: string,
 *  status: number,
 *  statusTest: string
 * }}
 */
const createErrorResponseObject = (err) => {
  console.log(err)
  const isNetworkError = err.message === 'Network Error';
  const responseData = {
    message: isNetworkError ? 'Service Unavailable' : err.response.data.message,
    status: isNetworkError ? 503 : err.response.status,
    statusText: isNetworkError ? 'Service Unavailable' : err.response.statusText,
  };

  return responseData;
};

export default createErrorResponseObject;
