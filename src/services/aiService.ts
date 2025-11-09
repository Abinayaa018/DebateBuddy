import { Message, DebateTopic } from "@/types/debate";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";
const API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini"; // or "gpt-3.5-turbo" for faster/cheaper responses

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export const aiDebateService = {
  // Initialize a debate with AI
  async startDebate(topic: DebateTopic): Promise<string> {
    const systemPrompt = `You are an expert debater participating in a formal debate about: "${topic.title}".

Your role:
- Take the OPPOSING position to whatever the user argues
- Be challenging but fair and respectful
- Use logical reasoning, evidence, and critical thinking
- Point out logical fallacies when you see them
- Keep responses focused and concise (2-3 paragraphs max)
- Difficulty level: ${topic.difficulty}

Category: ${topic.category}
Description: ${topic.description}

Start by presenting your opening statement against the proposition.`;

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "system", content: systemPrompt }],
          temperature: 0.8,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error starting debate:", error);
      throw error;
    }
  },

  // Send a message and get AI response
  async sendMessage(
    topic: DebateTopic,
    conversationHistory: Message[]
  ): Promise<{ aiResponse: string; userScore: number; aiScore: number }> {
    // Build conversation context
    const systemPrompt = `You are an expert debater in a formal debate about: "${topic.title}".

Your role:
- Take the OPPOSING position to the user's arguments
- Analyze and counter their points with logic and evidence
- Be challenging but respectful
- Point out weaknesses in their reasoning
- Difficulty level: ${topic.difficulty}

After your response, evaluate both arguments on a scale of 1-10 based on:
- Logical coherence
- Use of evidence
- Persuasiveness
- Addressing counterarguments`;

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.map((msg) => ({
        role: (msg.role === "user" ? "user" : "assistant") as "user" | "assistant",
        content: msg.content,
      })),
    ];

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages,
          temperature: 0.8,
          max_tokens: 600,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Score the debate (simple heuristic - in production, use a separate AI call for evaluation)
      const userScore = this.calculateArgumentScore(
        conversationHistory[conversationHistory.length - 1].content
      );
      const aiScore = this.calculateArgumentScore(aiResponse);

      return { aiResponse, userScore, aiScore };
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },

  // Calculate argument quality score (simple heuristic)
  calculateArgumentScore(argument: string): number {
    let score = 5; // Base score

    // Length check (well-developed arguments)
    if (argument.length > 200) score += 1;
    if (argument.length > 400) score += 1;

    // Evidence indicators
    const evidenceWords = ["because", "therefore", "research", "studies", "data", "evidence"];
    evidenceWords.forEach((word) => {
      if (argument.toLowerCase().includes(word)) score += 0.5;
    });

    // Logical connectors
    const logicalWords = ["however", "furthermore", "moreover", "additionally", "consequently"];
    logicalWords.forEach((word) => {
      if (argument.toLowerCase().includes(word)) score += 0.3;
    });

    // Examples and specificity
    if (argument.includes("for example") || argument.includes("for instance")) score += 0.5;
    if (argument.includes("specifically") || argument.includes("particularly")) score += 0.3;

    // Cap at 10
    return Math.min(Math.round(score * 10) / 10, 10);
  },

  // End debate and get final analysis
  async getDebateAnalysis(
    topic: DebateTopic,
    conversationHistory: Message[]
  ): Promise<string> {
    const systemPrompt = `You are an expert debate judge. Analyze the following debate about "${topic.title}" and provide:

1. Overall performance summary for both sides
2. Key strengths and weaknesses
3. Most persuasive arguments
4. Areas for improvement
5. Final verdict

Keep it concise but insightful.`;

    const debateTranscript = conversationHistory
      .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join("\n\n");

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: debateTranscript },
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error getting analysis:", error);
      throw error;
    }
  },
};

// Alternative: Anthropic Claude integration
export const claudeDebateService = {
  async sendMessage(topic: DebateTopic, conversationHistory: Message[]) {
    const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || "";
    const API_ENDPOINT = "https://api.anthropic.com/v1/messages";

    const systemPrompt = `You are an expert debater arguing the opposing position on: "${topic.title}".
Be challenging, use evidence, and maintain a ${topic.difficulty} difficulty level.`;

    const messages = conversationHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    }));

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 1024,
          system: systemPrompt,
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error("Error with Claude:", error);
      throw error;
    }
  },
};

// Alternative: Google Gemini integration
export const geminiDebateService = {
  // Initialize a debate with AI
  async startDebate(topic: DebateTopic): Promise<string> {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

    if (!API_KEY) {
      throw new Error("Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file");
    }

    // Use Gemini 2.5 Flash - the latest available model
    const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const prompt = `You are a skilled debate opponent in a formal debate.

DEBATE TOPIC: "${topic.title}"
DESCRIPTION: ${topic.description}
CATEGORY: ${topic.category}
DIFFICULTY: ${topic.difficulty}

YOUR TASK:
1. Present a compelling opening statement OPPOSING this proposition
2. Use specific examples, facts, or logical reasoning
3. Make it conversational yet intellectual
4. Length: 3-4 well-developed paragraphs
5. Be persuasive and engaging

GUIDELINES:
- Start with a strong hook or statement
- Present 2-3 main arguments against the proposition
- Use concrete examples when possible
- End with a clear position statement
- Maintain a confident but respectful tone

Now present your opening statement:`;

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Gemini API Response:", data);

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (error) {
      console.error("Error starting debate with Gemini:", error);
      throw error;
    }
  },

  // Send a message and get AI response
  async sendMessage(
    topic: DebateTopic,
    conversationHistory: Message[]
  ): Promise<{ aiResponse: string; userScore: number; aiScore: number }> {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

    if (!API_KEY) {
      throw new Error("Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file");
    }

    const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    // Build conversation context for better responses
    const conversationContext = conversationHistory.slice(-4).map((m) =>
      `${m.role === 'user' ? 'OPPONENT' : 'YOU'}: ${m.content}`
    ).join('\n\n');

    const prompt = `You are in an active debate about: "${topic.title}"

CONTEXT: ${topic.description}
DIFFICULTY: ${topic.difficulty}

RECENT CONVERSATION:
${conversationContext}

YOUR TASK:
Respond to the opponent's latest argument with a strong counter-position.

REQUIREMENTS:
1. Directly address their main points
2. Present 2-3 counterarguments with reasoning
3. Use specific examples, data, or logical principles when relevant
4. Identify any weaknesses in their logic (if present)
5. Make your response 3-4 well-structured paragraphs
6. Be persuasive, confident, but respectful
7. Stay focused on the debate topic

AVOID:
- Generic statements without substance
- Agreeing with the opponent
- Changing the topic
- Being repetitive

Now respond to their argument:`;

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error:", errorText);
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;

      // Score the debate using the same heuristic
      const userScore = this.calculateArgumentScore(
        conversationHistory[conversationHistory.length - 1].content
      );
      const aiScore = this.calculateArgumentScore(aiResponse);

      return { aiResponse, userScore, aiScore };
    } catch (error) {
      console.error("Error sending message with Gemini:", error);
      throw error;
    }
  },

  // Calculate argument quality score (same as OpenAI service)
  calculateArgumentScore(argument: string): number {
    let score = 5; // Base score

    // Length check (well-developed arguments)
    if (argument.length > 200) score += 1;
    if (argument.length > 400) score += 1;

    // Evidence indicators
    const evidenceWords = ["because", "therefore", "research", "studies", "data", "evidence"];
    evidenceWords.forEach((word) => {
      if (argument.toLowerCase().includes(word)) score += 0.5;
    });

    // Logical connectors
    const logicalWords = ["however", "furthermore", "moreover", "additionally", "consequently"];
    logicalWords.forEach((word) => {
      if (argument.toLowerCase().includes(word)) score += 0.3;
    });

    // Examples and specificity
    if (argument.includes("for example") || argument.includes("for instance")) score += 0.5;
    if (argument.includes("specifically") || argument.includes("particularly")) score += 0.3;

    // Cap at 10
    return Math.min(Math.round(score * 10) / 10, 10);
  },

  // End debate and get final analysis
  async getDebateAnalysis(
    topic: DebateTopic,
    conversationHistory: Message[],
    finalScores: { userScore: number; aiScore: number }
  ): Promise<string> {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

    if (!API_KEY) {
      throw new Error("Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file");
    }

    const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const debateTranscript = conversationHistory.map((m, i) =>
      `**Round ${Math.floor(i / 2) + 1} - ${m.role === 'user' ? 'YOUR ARGUMENT' : 'AI OPPONENT'}:**\n${m.content}`
    ).join('\n\n---\n\n');

    const prompt = `You are an expert debate judge. Provide a comprehensive analysis of this debate.

DEBATE TOPIC: "${topic.title}"
TOTAL ROUNDS: ${Math.ceil(conversationHistory.length / 2)}

📊 FINAL SCORES:
- User (You): ${finalScores.userScore}/10
- AI Opponent: ${finalScores.aiScore}/10

FULL DEBATE TRANSCRIPT:
${debateTranscript}

PROVIDE A DETAILED ANALYSIS WITH THESE SECTIONS:

🏆 **OVERALL VERDICT**
Who won the debate and why? (Be specific)

💪 **YOUR STRONGEST ARGUMENTS**
- List 2-3 of your most effective points
- Explain why they were strong

⚠️ **AREAS FOR IMPROVEMENT**
- 2-3 specific weaknesses in your argumentation
- How you could have strengthened them

🎯 **AI OPPONENT'S PERFORMANCE**
- Their strongest counterarguments
- How they challenged your position

📚 **KEY TAKEAWAYS**
- What you did well
- What to focus on next time
- One specific skill to develop

Make it constructive, specific, and encouraging. Use clear formatting.`;

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error:", errorText);
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error getting analysis from Gemini:", error);
      throw error;
    }
  },
};
