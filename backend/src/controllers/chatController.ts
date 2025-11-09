import { Request, Response } from 'express';
import ChatSession from '../models/chatSession.model';
import { callLLM } from '../utils/llmClient';

export async function startChat(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { message, sessionName } = req.body;
    // create session
    const session = await ChatSession.create({
      user: userId,
      name: sessionName || 'New session',
      messages: [{ role: 'user', content: message }]
    });
    // call LLM (simple wrapper)
    const assistant = await callLLM([{ role: 'user', content: message }]);
    session.messages.push({ role: 'assistant', content: assistant });
    await session.save();
    res.json({ session });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
}

export async function getSession(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const sessionId = req.params.sessionId;
    const session = await ChatSession.findOne({ _id: sessionId, user: userId });
    if (!session) return res.status(404).json({ message: 'Not found' });
    res.json({ session });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
}
