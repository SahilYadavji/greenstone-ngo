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
You are Greenstone Welfare Club's AI Assistant.

You help users with:
- NGO activities
- Donations
- Volunteering
- Events
- Education programs
- Women empowerment
- Environment protection

If users ask general questions,
answer them normally like ChatGPT.

User: ${message}
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