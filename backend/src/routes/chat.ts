import { Router } from 'express';
import { startChat, getSession } from '../controllers/chatController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', startChat);
router.get('/:sessionId', getSession);

export default router;
