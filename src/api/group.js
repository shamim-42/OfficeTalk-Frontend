import connector from "../connector";

export const creategroupApi = async function (payload, options = {}) {
  const url = '3000/group/creategroup';
  return await connector.post(url, payload, options);
};

export const getGroupInfo = async function (groupId, userId, options = {}) {
  const url = `3000/group/${groupId}/${userId}`;
  return connector.get(url, options);
};

export const getGroupMessagesApi = async function (groupId, payload, options = {}) {
  const url = `3000/group/${groupId}/groupmessages?page=1`;
  return connector.post(url, payload, options);
};

export const groupMessageSendApi = async function (groupId, payload, options = {}) {
  const url = `3000/group/${groupId}/sendMessageGroup`;
  return connector.post(url, payload, options);
};

export const groupMessageSeenApi = async function (groupId, payload, options = {}) {
  const url = `3000/group/${groupId}/markAsRead`;
  return connector.post(url, payload, options);
};


export const groupMessageDeleteApi = async function (msgId, groupId, userId, options = {}) {
  const url = `3000/group/deletemessageGroup/${msgId}/${groupId}/${userId}`;
  return connector.delete(url, options);
};



