const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getResponse = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": text
          }
        ]
      }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  // const data = JSON.parse(response)
  // console.log(response.choices[0].message.content)
  return response.choices[0].message.content
}

module.exports = getResponse;