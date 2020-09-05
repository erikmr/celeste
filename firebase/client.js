import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDIeCRd_pYR-oXw2O2p2olsYs8uIqaISgY',
  authDomain: 'celeste-app-mx.firebaseapp.com',
  databaseURL: 'https://celeste-app-mx.firebaseio.com',
  projectId: 'celeste-app-mx',
  storageBucket: 'celeste-app-mx.appspot.com',
  messagingSenderId: '884988565806',
  appId: '1:884988565806:web:b95442cf42533ed36e42bf',
  measurementId: 'G-765SXYRF5W',
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}
export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}
export const loginWithFacebook = () => {
  const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
  return firebase.auth().signInWithPopup(facebookAuthProvider)
}
export const addDevit = ({ avatar, content, userId, userName, img }) => {
  return db.collection('devits').add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
    img: img,
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection('devits')
    .orderBy('createdAt', 'desc')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          id,
          ...data,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}
export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`files/${file.name}`)
  const task = ref.put(file)
  return task
}
