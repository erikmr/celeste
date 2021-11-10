var admin = require('firebase-admin')
console.log('process.env en archivo admin')
console.log(process.env.NEXT_PUBLIC_FIREBASE_ENV)

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT

try {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount)),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  })
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

export const firestore = admin.firestore()
