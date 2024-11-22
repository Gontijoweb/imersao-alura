import 'dotenv/config'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// const prompt = 'Explain how AI works'

// const result = await model.generateContent(prompt)
// console.log(result.response.text())

export default async function generateImgDescription(imageBuffer) {
  const prompt =
    'Gere uma descrição em português do brasil para a seguinte imagem'

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString('base64'),
        mimeType: 'image/png',
      },
    }
    const result = await model.generateContent([prompt, image])
    return result.response.text() || 'Alt-text não disponível'
  } catch (error) {
    console.error('Erro ao obter alt-text:', error.message, error)
    throw new Error('Erro ao obter alt-text do Gemini')
  }
}
