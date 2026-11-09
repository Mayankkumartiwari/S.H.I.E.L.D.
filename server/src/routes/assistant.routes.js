import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { askAssistant } from '../controllers/assistant.controllers.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();
router.post(
  '/chat',
  requireAuth,
  rateLimit({
    windowMs: 60_000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
  }),
  validate({ body: { question: { type: 'string', required: true, min: 1, max: 2000 } } }),
  askAssistant,
);

export default router;
