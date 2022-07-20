import connector from "../connector";


export const userRegistrationApi = async function (payload, options = {}) {
  const url = '4001/auth/signup';
  return await connector.post(url, payload, options);
};

export const userLoginApi = async function (payload, options = {}) {
  const url = '4001/auth/signin';
  return await connector.post(url, payload, options);
};

export const userLogoutApi = async function (id, options = {}) {
  const url = `3001/chat/${id}/signout`;
  return await connector.get(url, options);
};

export const editprofileApi = async function (id, payload, options = {}) {
  const url = `4001/users/edit/${id}`;
  return await connector.put(url, payload, options);
}

export const editprofilePhotoApi = async function (id, payload, options = {}) {
  const url = `4001/upload/${id}`;
  return await connector.post(url, payload, options);
}

export const editPasswordApi = async function (id, payload, options = {}) {
  const url = `4001/users/${id}/changepassword`;
  return await connector.put(url, payload, options);
}

export const allUserListApi = async function (options = {}) {
  const url = '4001/users';
  return await connector.get(url, options);
};

export const userActiveStatusApi = async function (id, options = {}) {
  const url = `4001/users/${id}/activestatus`;
  return await connector.get(url, options);
};

export const friendListApi = async function (userId, options = {}) {
  const url = `4001/auth/friendList/${userId}`;
  return await connector.get(url, options);
};

export const checkJWTToken = async function (payload, options = {}) {
  const url = '4001/auth/verifyjwt';
  return await connector.post(url, payload, options);
}