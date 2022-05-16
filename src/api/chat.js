import connector from "../connector";


export const sendMessageApi = async function (id, payload, options = {}) {
  const url = `3000/chat/${id}/sendMessage`;
  return connector.post(url, payload, options);
};

export const getAllMessageApi = async function (id, payload, options = {}) {
  const url = `3000/chat/${id}/messages`;
  return connector.post(url, payload, options);
};

