// import dependencies
const { onRequest } = require('firebase-functions/v2/https')
const line = require('./utils/line')
const gemini = require('./utils/gemini')

// create a webhook via HTTP requests
exports.webhook = onRequest(async (req, res) => {
    let response = ''
    if (req.method === 'POST') {
        const events = req.body.events
        for (const event of events) {
            switch (event.type) {
                case 'message':
                    console.log('msg')
                    if (event.message.type === 'text') {
                        console.log('msg txt')
                        const msg = await gemini.chat(event.message.text)
                        console.log(msg)
                        response = msg
                        // await line.reply(event.replyToken, [
                        //     { type: 'text', text: msg },
                        // ])
                        break
                    }
                    break
            }
        }
    }
    res.send(response)
})
