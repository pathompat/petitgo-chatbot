const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require('@google/generative-ai')

const apiKey = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
}

const model = (setting) => {
    const { model, systemInstruction } = setting
    const modelGen = genAI.getGenerativeModel({
        model,
        systemInstruction,
    })

    return modelGen
}

const chat = async (specifiedModel, context, history, userText) => {
    const chatSession = specifiedModel.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
            {
                role: 'user',
                parts: [
                    {
                        text: `นี่คือข้อมูล json สินค้าของร้าน ให้ใช้ข้อมูลนี้ในการตอบลูกค้า เช่น ราคาสินค้า, จำนวนที่เหลือ json: ${JSON.stringify(
                            context
                        )} ราคาสิินค้าให้ใช้ variations.price ในการตอบ, ถ้าลูกค้าถามวันหมดอายุให้ตอบว่ารอแอดมินเช็คข้อมูลสักครู่`,
                    },
                ],
            },
            ...history,
        ],
    })

    const result = await chatSession.sendMessage(userText)
    return result.response.text()
}

module.exports = { model, chat }
