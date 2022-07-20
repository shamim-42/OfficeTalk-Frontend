import connector from "../connector";


export const sendMessageApi = async function (id, payload, options = {}) {
  const url = `3001/chat/${id}/sendMessage`;
  return await connector.post(url, payload, options);
};

export const getAllMessageApi = async function (id, page, payload, options = {}) {
  const url = `3001/chat/${id}/messages?page=${page}`;
  return connector.post(url, payload, options);
};

export const getConversationsApi = async function (id, options = {}) {
  const url = `4001/users/message/${id}`;
  return await connector.get(url, options);
};

export const makeReadApi = async function (id, payload, options = {}) {
  const url = `3001/chat/${id}/markAsRead`;
  return await connector.post(url, payload, options);
};

export const acceptUserApi = async function (payload, options = {}) {
  const url = '3001/chat/approval';
  return await connector.post(url, payload, options);
};

export const deleteMessageApi = async function (messageID, senderId, receiverId, options = {}) {
  const url = `3001/chat/deletemessage/${messageID}/${senderId}/${receiverId}`;
  return await connector.delete(url, options);
};


export const singleReactionApi = async function (userId, payload, options = {}) {
  const url = `3001/like-emoji/${userId}/voteSingle`;
  return await connector.post(url, payload, options);
};

export const userSearchApi = async function (query, options = {}) {
  const url = `4001/users/search?s=${query}`;
  return await connector.get(url, options);
};
