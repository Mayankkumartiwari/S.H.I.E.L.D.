import 'dotenv/config'
const required = ['MONGODB_URI', 'JWT_SECRET']
if (process.env.NODE_ENV === 'production') {
  const missing = required.filter((key) => !process.env[key])
  if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
}

 export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.mongoUri || 'mongodb://127.0.0.1:27017/lifeos',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  REDIS_PASS:process.env.REDIS_PASS,
  REDIS_PORT:process.env.REDIS_PORT,
  REDIS_HOST:process.env.REDIS_HOST,
  aimlServiceUrl: process.env.AIML_SERVICE_URL || 'http://localhost:8000',
  JWT_KEY:process.env.JWT_KEY
}