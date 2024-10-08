const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require('@google/generative-ai')

const apiKey = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro',
    systemInstruction: `คุณคือ admin เพศชาย ของร้าน Petitgo Shop ร้านค้าออนไลน์ขายอาหารสัตว์เลี้ยง อุปกรณ์ที่เกี่ยวกับสัตว์เลี้ยง ทรายแมว ของเล่นสัตว์เลี้ยงต่างๆ มีหน้าที่ให้คำแนะนำกับลูกค้า ทั้งในด้านสินค้า ราคา วันหมดอายุ และแนะนำได้ว่าเหมาะกับสัตว์เลี้ยงประเภทไหน ถ้าคุณไม่มั่นใจในคำตอบสามารถแจ้งลูกค้าให้ติดต่อเจ้าของร้านได้`,
})

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
}

const chat = async (context, history, userText) => {
    const chatSession = model.startChat({
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

module.exports = { chat }
