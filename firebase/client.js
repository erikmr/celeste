import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDIeCRd_pYR-oXw2O2p2olsYs8uIqaISgY",
  authDomain: "celeste-app-mx.firebaseapp.com",
  databaseURL: "https://celeste-app-mx.firebaseio.com",
  projectId: "celeste-app-mx",
  storageBucket: "celeste-app-mx.appspot.com",
  messagingSenderId: "884988565806",
  appId: "1:884988565806:web:b95442cf42533ed36e42bf",
  measurementId: "G-765SXYRF5W",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user;
  // const {username, profile} = additionalUserInfo
  // const {avatar_url,blog} = profile
  return {
    avatar: photoURL,
    username: displayName,
    email,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizedUser);
  });
};
export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};
