import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
  content: { type: String, required: true }
}, { _id: false });

const ChatSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
  messages: { type: [MessageSchema], default: [] }
}, { timestamps: true });

const ChatSession = mongoose.model('ChatSession', ChatSessionSchema);
export default ChatSession;
