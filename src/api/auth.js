import connector from "../connector";


export const userRegistrationApi = async function (payload, options = {}) {
  const url = '/auth/signup';
  return await connector.post(url, payload, options);
};

export const userLoginApi = async function (payload, options = {}) {
  const url = '/auth/signin';
  return await connector.post(url, payload, options);
};

export const userLogoutApi = async function (id, options = {}) {
  const url = `/auth/${id}/signout`;
  return connector.get(url, options);
};

export const editprofileApi = async function (id, payload, options = {}) {
  const url = `/users/edit/${id}`;
  return connector.put(url, payload, options);
}