import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const askAssistant = async (req, res) => {
  let response;
  try {
    const baseUrl = env.aimlServiceUrl.replace(/\/+$/, '');
    response = await fetch(`${baseUrl}/api/assistant/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question: req.body.question }),
      signal: AbortSignal.timeout(20_000),
    });
  } catch {
    throw new ApiError(502, 'Campus assistant is temporarily unavailable.', 'ASSISTANT_UNAVAILABLE');
  }
  if (!response.ok) {
    throw new ApiError(502, 'Campus assistant is temporarily unavailable.', 'ASSISTANT_UNAVAILABLE');
  }
  let result;
  try {
    result = await response.json();
  } catch {
    throw new ApiError(502, 'Campus assistant returned an invalid response.', 'ASSISTANT_INVALID_RESPONSE');
  }
  if (typeof result.answer !== 'string' || typeof result.source !== 'string') {
    throw new ApiError(502, 'Campus assistant returned an invalid response.', 'ASSISTANT_INVALID_RESPONSE');
  }
  return sendSuccess(res, 200, 'Assistant response generated.', {
    answer: result.answer,
    source: result.source,
  });
};
