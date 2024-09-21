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
                        const msg = await gemini.chat(
                            jsonProduct,
                            event.message.text
                        )
                        await line.reply(event.replyToken, [
                            {
                                type: 'text',
                                text: msg,
                            },
                        ])
                        break
                    }
                    break
            }
        }
    }
    res.send(req.method)
})
