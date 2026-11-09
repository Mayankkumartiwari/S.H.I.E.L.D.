import OpenAI from 'openai';
import { env } from './env.js';

if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key') {
  throw new Error('OPENAI_API_KEY is required to use the campus assistant.');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: env.openaiTimeout,
  maxRetries: 0,
});

export const openaiConfig = {
  model: env.openaiModel,
  maxOutputTokens: env.openaiMaxOutputTokens,
};
