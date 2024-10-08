// import dependencies
const { onRequest } = require('firebase-functions/v2/https')
const line = require('./utils/line')
const gemini = require('./utils/gemini')
const firestore = require('./utils/firestore')

// create a webhook via HTTP requests
exports.webhook = onRequest(async (req, res) => {
    if (req.method === 'POST') {
        const events = req.body.events
        for (const event of events) {
            switch (event.type) {
                case 'message':
                    if (event.message.type === 'text') {
                        const jsonProduct = await firestore.getProduct()
                        const history = await firestore.getChatSession(
                            event.source.userId
                        )
                        const msg = await gemini.chat(
                            jsonProduct,
                            history.slice(history.length - 5, history.length),
                            event.message.text
                        )
                        await line.reply(event.replyToken, [
                            {
                                type: 'text',
                                text: msg,
                            },
                        ])
                        await updateFirestoreHistory(
                            event.source.userId,
                            history,
                            event.message.text,
                            msg
                        )
                        break
                    }
                    break
            }
        }
    }
    res.send(req.method)
})

const updateFirestoreHistory = async (
    userId,
    currentHistory,
    userMsg,
    replyMsg
) => {
    await firestore.updateHistoryChatSession(userId, [
        ...currentHistory,
        {
            role: 'user',
            parts: [
                {
                    text: userMsg,
                },
            ],
        },
        {
            role: 'model',
            parts: [
                {
                    text: replyMsg,
                },
            ],
        },
    ])
}
