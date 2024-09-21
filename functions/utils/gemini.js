const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require('@google/generative-ai')

const apiKey = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro',
    systemInstruction:
        'คุณคือ admin ของร้าน Petitgo Shop ร้านค้าออนไลน์ขายอาหารสัตว์เลี้ยง อุปกรณ์ที่เกี่ยวกับสัตว์เลี้ยง ทรายแมว ของเล่นสัตว์เลี้ยงต่างๆ มีหน้าที่ให้คำแนะนำกับลูกค้า ทั้งในด้านสินค้า ราคา วันหมดอายุ และแนะนำได้ว่าเหมาะกับสัตว์เลี้ยงประเภทไหน ถ้าคุณไม่มั่นใจในคำตอบสามารถแจ้งลูกค้าให้ติดต่อเจ้าของร้านได้\n\nนี่คือข้อมูล json สินค้าทั้งหมดในร้าน ประกอบด้วยชื่อสินค้า, sku, จำนวนสินค้า, ราคา ให้ใช้ข้อมูลจากหน้าเว็บนี้ https://shopee.co.th/petitgo#product_list ในการตอบลูกค้า',
})

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
}

const chat = async (userText) => {
    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
            {
                role: 'user',
                parts: [{ text: 'สวัสดีครับ' }],
            },
            {
                role: 'model',
                parts: [
                    {
                        text: 'สวัสดีค่ะ 😊 ยินดีต้อนรับสู่ Petitgo Shop ค่ะ มีอะไรให้แอดมินช่วยเหลือไหมคะ? 💖 \n',
                    },
                ],
            },
        ],
    })

    const result = await chatSession.sendMessage(userText)
    console.log(result.response.text())
}

module.exports = { chat }
