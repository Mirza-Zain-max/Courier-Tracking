// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { collection, getCountFromServer, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyACP6zBZ_YjSrobzDLIrDSHMdT7bvSNx-s",
//   authDomain: "btsproject-5d6e0.firebaseapp.com",
//   projectId: "btsproject-5d6e0",
//   storageBucket: "btsproject-5d6e0.firebasestorage.app",
//   messagingSenderId: "32656532061",
//   appId: "1:32656532061:web:1cd6648fbced591d76a3b4",
//   measurementId: "G-F5FVSEJEX5"
// };

const firebaseConfig = {
  apiKey: "AIzaSyASvmD5PrAaUBLRxMmqiEJs8exW_7dz538",
  authDomain: "sonic-express-a725e.firebaseapp.com",
  projectId: "sonic-express-a725e",
  storageBucket: "sonic-express-a725e.firebasestorage.app",
  messagingSenderId: "315445968859",
  appId: "1:315445968859:web:4f4c161503b73591f5b1fe",
  measurementId: "G-368QP3JV4V"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fireStore = getFirestore(app);

const getTotalCount = async (collectionName) => {
  // const coll = collection(fireStore, collectionName);
  const snapshot = await getCountFromServer(collectionName);
  return snapshot.data().count;
};

export { analytics , auth ,fireStore, getTotalCount };