import connector from "../connector";


export const sendMessageApi = async function (id, payload, options = {}) {
  const url = `3000/chat/${id}/sendMessage`;
  return connector.post(url, payload, options);
};