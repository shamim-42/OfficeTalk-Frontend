import connector from "../connector";


export const sendMessageApi = async function (id, payload, options = {}) {
  const url = `3000/chat/${id}/sendMessage`;
  return connector.post(url, payload, options);
};

export const getAllMessageApi = async function (id, payload, options = {}) {
  const url = `3000/chat/${id}/messages`;
  return connector.post(url, payload, options);
};

export const getConversationsApi = async function (id, options = {}) {
  const url = `4000/users/message/${id}`;
  return connector.get(url, options);
};

export const makeReadApi = async function (id, payload, options = {}) {
  const url = `3000/chat/${id}/markAsRead`;
  return connector.post(url, payload, options);
};

