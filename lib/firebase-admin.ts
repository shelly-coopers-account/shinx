import admin from 'firebase-admin'

const serviceAccount = require('/home/vinny/c/shinx.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export default admin.firestore()
