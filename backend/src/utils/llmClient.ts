import axios from 'axios';

/**
 * Minimal wrapper to call OpenAI Chat API.
 * Replace with your provider or extend with streaming, retries, etc.
 */
export async function callLLM(messages: { role: string; content: string }[]) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return 'Please set OPENAI_API_KEY in environment to get real responses';
  try {
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini', // change if needed
      messages: messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : m.role, content: m.content }))
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    const assistant = res.data?.choices?.[0]?.message?.content;
    return assistant || 'No response from LLM';
  } catch (err:any) {
    console.warn('LLM call error', err?.response?.data || err.message);
    return 'LLM error: ' + (err?.response?.data?.error?.message || err.message);
  }
}
