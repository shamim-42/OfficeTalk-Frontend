import connector from "../connector";


export const sendMessageApi = async function (id, payload, options = {}) {
  const url = `3000/chat/${id}/sendMessage`;
  return await connector.post(url, payload, options);
};

export const getAllMessageApi = async function (id, payload, options = {}) {
  const url = `3000/chat/${id}/messages?page=${options.urlParams.page}`;
  return connector.post(url, payload, options);
};

export const getConversationsApi = async function (id, options = {}) {
  const url = `4000/users/message/${id}`;
  return await connector.get(url, options);
};

export const makeReadApi = async function (id, payload, options = {}) {
  const url = `3000/chat/${id}/markAsRead`;
  return await connector.post(url, payload, options);
};

export const acceptUserApi = async function (payload, options = {}) {
  const url = '3000/chat/approval';
  return await connector.post(url, payload, options);
};

export const creategroupApi = async function (payload, options = {}) {
  const url = '3000/chat/creategroup';
  return await connector.post(url, payload, options);
};

export const deleteMessageApi = async function (messageID, senderId, receiverId, options = {}) {
  const url = `3000/chat/deletemessage/${messageID}/${senderId}/${receiverId}`;
  return await connector.delete(url, options);
};

