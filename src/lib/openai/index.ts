/** @format */

import { decode } from '@utility/string'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: decode('c2stamZ5UmhQZDIyRHNURUxBUU9iMFlUM0JsYmtGSjVPRThoRTR6bndtRHl5YWpHMjh5'),
})

const openai = new OpenAIApi(configuration)

export async function prettyLuscher(text: string) {
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are a career psychologist and consultant. Use the following raw results from a Lüscher test and write a second-hand report to me, your client. The report should be a professional with a cohesive narrative around my acute vs aspirational challenges and opportunities. Unprofessional themes such as "sexual frustration" could be mapped to "frustrations in personal life" and so on. You don't need an opener or closing statement, just the raw report.`,
      },
      {
        role: 'user',
        content: text,
      },
    ],
    temperature: 1,
    max_tokens: 4000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  return response.data.choices[0].message?.content
}
