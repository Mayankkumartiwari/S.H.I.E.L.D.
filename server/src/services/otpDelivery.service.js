import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

export const deliverOtp = async ({ email, code }) => {
  if (!env.otpDeliveryUrl) {
    if (env.nodeEnv === 'production') {
      throw new ApiError(503, 'Email verification is not configured.', 'OTP_DELIVERY_UNAVAILABLE');
    }
    return { delivered: false };
  }

  let url;
  try {
    url = new URL(env.otpDeliveryUrl);
  } catch {
    throw new ApiError(503, 'Email verification is not configured correctly.', 'OTP_DELIVERY_UNAVAILABLE');
  }
  if (env.nodeEnv === 'production' && url.protocol !== 'https:') {
    throw new ApiError(503, 'Email verification requires a secure delivery URL.', 'OTP_DELIVERY_UNAVAILABLE');
  }

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(env.otpDeliveryToken ? { authorization: `Bearer ${env.otpDeliveryToken}` } : {}),
      },
      body: JSON.stringify({ email, code, expiresInMinutes: 10 }),
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    throw new ApiError(502, 'Unable to send the verification email. Please try again.', 'OTP_DELIVERY_FAILED');
  }
  if (!response.ok) {
    throw new ApiError(502, 'Unable to send the verification email. Please try again.', 'OTP_DELIVERY_FAILED');
  }
  return { delivered: true };
};
