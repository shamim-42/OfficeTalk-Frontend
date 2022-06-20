import connector from "../connector";

export const getGroupInfo = async function (id, userId, options = {}) {
  const url = `3000/chat/group/${id}/${userId}`;
  return connector.get(url, options);
};