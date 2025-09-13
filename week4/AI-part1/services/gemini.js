const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI("AIzaSyB5mAEAClYVTaVDBG5Jsrs1d2PsSuxgGUY");

const MODEL_NAME = "models/gemini-1.5-flash-latest"; // Using a general latest model

const geminiModel = genAI.getGenerativeModel({ model: MODEL_NAME });

const model = async (contents) => {
  try {
    const result = await geminiModel.generateContent({
    
      contents: [{
        parts: [{ text: contents }],
      }],
      generationConfig: {
        temperature: 0.1,
      },
    });
    return result.response;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw error;
  }
};
module.exports = model;