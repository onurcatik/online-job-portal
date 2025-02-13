const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
//   const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI("AIzaSyCLlzEek4qCOIn4HmTiYGaWkB1YZ66wMAI");
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function getGenerativeAIResponse(prompt : string) {

    const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ];


    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
console.log(result.response.text());
return result.response.text().trim().replace(/```/g, "");

  }
  
export default getGenerativeAIResponse