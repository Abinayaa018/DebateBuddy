export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  score?: number;
}

export interface DebateTopic {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface DebateScore {
  userId: number;
  aiScore: number;
  round: number;
}

export interface DebateSession {
  id: string;
  topic: DebateTopic;
  messages: Message[];
  score: DebateScore;
  status: 'active' | 'completed';
  startedAt: Date;
}
