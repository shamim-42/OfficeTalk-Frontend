import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseConfig } from "./firebase.config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log(process.env)
// Your web app's Firebase configuration


initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


export const requestForToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: 'BN3t6d3DEcrhtdMIPo996NjCRFMYaSOaqT-iNFA7kUQlpjKcrIlseV4c2uzdEZKDydhxc5NLDpfR2aTo1ULKoTc' }).then((currentToken) => {
    if (currentToken) {
      // console.log('current token for client: ', currentToken);
      setTokenFound(currentToken);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound('');
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
};


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });