import connector from "../connector";


export const userRegistrationApi = async function (payload, options = {}) {
  const url = '/auth/signup';
  return await connector.post(url, payload, options);
};

export const userLoginApi = async function (payload, options = {}) {
  const url = '/auth/signin';
  return await connector.post(url, payload, options);
};