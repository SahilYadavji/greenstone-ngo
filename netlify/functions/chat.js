const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  try {

    const { message } = JSON.parse(event.body);

    const genAI =
      new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
      );

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

   const prompt = `
You are Greenstone NGO's website assistant.

Rules:
- Keep answers short and simple.
- Maximum 2-3 sentences.
- Use easy English.
- If asked about donations, volunteering, events or NGO activities, answer directly.
- Do not give long explanations.
- Be friendly and professional.
- If the user greets you, greet them back briefly.
- If the user asks a general question, give a concise answer.

User Question:
${message}
`;

    const result =
      await model.generateContent(
        prompt
      );

    const reply =
      result.response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply,
      }),
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };

  }

};