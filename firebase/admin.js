var admin = require('firebase-admin')

// var serviceAccount = require('./firebase-keys.json')
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
// console.log(process.env.FIREBASE_DATABASE_URL)
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL, // 'https://celeste-app-mx.firebaseio.com',
  })
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

export const firestore = admin.firestore()
