import connector from "../connector";


export const sendMessageApi = async function (id, payload, options = {}) {
  const url = `/chat/${id}/sendMessage`;
  return connector.post(url, payload, options);
};