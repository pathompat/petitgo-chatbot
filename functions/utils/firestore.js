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

const getChatSession = async (userId) => {
    const doc = await db.collection('chatSessions').doc(userId).get()
    if (!doc.exists) {
        console.log('no chat session. created new history')
        await db.collection('chatSessions').doc(userId).set({
            userId,
            history: [],
        })
        return []
    }
    const chat = doc.data()
    return chat.history
}

const updateHistoryChatSession = async (userId, history) => {
    return await db.collection('chatSessions').doc(userId).update({
        history,
    })
}

module.exports = { getProduct, getChatSession, updateHistoryChatSession }
