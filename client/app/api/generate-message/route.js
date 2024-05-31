import { auth } from "@clerk/nextjs/server";
// const OpenAI = require("openai");
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(request) {
  try {
    const { text } = await request.json();
    const { userId } = auth();
    if (!userId) return Response.json({
      status: 401,
      message: "Not Authenticated"
    })

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
    const content = response.choices[0].message.content;
    console.log(content)

    return Response.json({
      status: 200,
      message: content
    })
  } catch (err) {
    console.log(err)
    return Response.json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}