const {
    initializeApp,
    applicationDefault,
    cert,
} = require('firebase-admin/app')
const {
    getFirestore,
    Timestamp,
    FieldValue,
    Filter,
} = require('firebase-admin/firestore')

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const getProduct = async () => {
    const products = []
    const snapshot = await db.collection('products').get()
    snapshot.forEach((doc) => {
        products.push(doc.data())
    })
    return products
}

module.exports = { getProduct }
