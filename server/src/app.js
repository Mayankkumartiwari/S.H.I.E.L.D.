import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'CampusBuzz API is healthy',
  });
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((error, _req, res, _next) => {
  console.error('Unhandled application error:', error);

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal server error',
  });
});

export default app;
