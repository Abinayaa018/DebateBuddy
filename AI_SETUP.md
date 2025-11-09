# AI Backend Setup Guide

## 🤖 Connecting Real AI to Your Debate App

Your DebateAI frontend is now integrated with AI services! Follow these steps to get it working.

---

## Option 1: OpenAI (Recommended) ⭐

### Step 1: Get Your API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **"Create new secret key"**
5. Copy your API key (starts with `sk-...`)

### Step 2: Add API Key to Project

1. Open the `.env` file in your project root
2. Add your API key:
   ```
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```
3. Save the file
4. Restart your dev server (`npm run dev`)

### Step 3: Test It!

1. Go to http://localhost:8080
2. Login (any credentials work in demo mode)
3. Select a debate topic
4. Start debating - you'll get real AI responses!

### Pricing (as of 2024)
- **GPT-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **GPT-3.5-turbo**: ~$0.50 per 1M input tokens, ~$1.50 per 1M output tokens
- A typical debate costs **less than $0.01**

---

## Option 2: Anthropic Claude

### Step 1: Get Your API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to **API Keys**
4. Create a new key
5. Copy your API key

### Step 2: Update Code

1. Open `.env` and add:
   ```
   VITE_ANTHROPIC_API_KEY=your-anthropic-key-here
   ```

2. Open `src/pages/Debate.tsx`
3. Change the import:
   ```typescript
   import { claudeDebateService as aiDebateService } from "@/services/aiService";
   ```

### Pricing
- **Claude 3.5 Sonnet**: ~$3 per 1M input tokens, ~$15 per 1M output tokens
- Very high quality responses!

---

## Option 3: Google Gemini

### Step 1: Get Your API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy your key

### Step 2: Update Code

1. Open `.env` and add:
   ```
   VITE_GEMINI_API_KEY=your-gemini-key-here
   ```

2. Open `src/pages/Debate.tsx`
3. Change the import:
   ```typescript
   import { geminiDebateService as aiDebateService } from "@/services/aiService";
   ```

### Pricing
- **Gemini Pro**: FREE for up to 60 requests per minute!

---

## 🔧 Configuration Options

### Change AI Model

Edit `src/services/aiService.ts`:

```typescript
const MODEL = "gpt-4"; // Options: gpt-4, gpt-4o, gpt-4o-mini, gpt-3.5-turbo
```

### Adjust Response Length

In `aiService.ts`, change `max_tokens`:

```typescript
max_tokens: 500, // Increase for longer responses
```

### Modify Debate Style

Edit the system prompt in `startDebate()` function to change how the AI debates:

```typescript
const systemPrompt = `You are an expert debater...
- Be more aggressive/friendly
- Focus on specific argument styles
- Use more/less formal language
`;
```

---

## 🎯 Features Now Available

✅ **Real-time AI Debates** - Get intelligent, contextual responses
✅ **Smart Scoring** - AI evaluates argument quality
✅ **Debate Analysis** - Get detailed feedback at the end
✅ **Context Awareness** - AI remembers the full conversation
✅ **Adaptive Difficulty** - AI adjusts based on topic difficulty

---

## 🐛 Troubleshooting

### "Failed to start debate" Error

**Cause**: API key not set or invalid

**Solution**:
1. Check `.env` file exists and has your key
2. Restart dev server after adding key
3. Verify key is valid (no typos, not revoked)

### "Rate limit exceeded" Error

**Cause**: Too many requests to API

**Solution**:
1. Wait a few minutes
2. Check your API quota/billing
3. Use a different model (GPT-3.5 instead of GPT-4)

### Demo Mode Instead of AI

**Cause**: API call failed, fallback to demo

**Solution**:
1. Check browser console for errors
2. Verify internet connection
3. Check API service status
4. Confirm API key has billing enabled

---

## 💰 Cost Optimization Tips

1. **Use GPT-4o-mini** instead of GPT-4 (10x cheaper, still great quality)
2. **Set lower max_tokens** to reduce response length
3. **Use Gemini** for free tier (60 requests/min)
4. **Add rate limiting** if needed for production

---

## 🔒 Security Best Practices

1. ✅ **Never commit `.env` file** (already in .gitignore)
2. ✅ **Don't share your API keys** publicly
3. ✅ **Rotate keys regularly** for production
4. ✅ **Set usage limits** in API dashboard
5. ✅ **Use environment variables** (already configured)

---

## 📊 Monitoring Usage

### OpenAI
- Dashboard: https://platform.openai.com/usage
- See costs in real-time
- Set monthly limits

### Anthropic
- Console: https://console.anthropic.com/
- Track usage and costs

### Google Gemini
- Console: https://makersuite.google.com/
- Monitor quota usage

---

## 🚀 Going to Production

When deploying (Vercel, Netlify, etc.):

1. **Add environment variables** in deployment platform
2. **Set up proper backend** (optional but recommended)
3. **Add rate limiting** to prevent abuse
4. **Use API key proxy** to hide keys from frontend
5. **Monitor costs** regularly

---

## ✨ Example API Key Setup

Your `.env` file should look like:

```bash
# OpenAI (choose one)
VITE_OPENAI_API_KEY=sk-proj-abc123...

# OR Anthropic
# VITE_ANTHROPIC_API_KEY=sk-ant-abc123...

# OR Google Gemini
# VITE_GEMINI_API_KEY=AIza...
```

**That's it! You now have a fully functional AI-powered debate platform!** 🎉

---

## 📚 Additional Resources

- [OpenAI API Docs](https://platform.openai.com/docs)
- [Anthropic Claude Docs](https://docs.anthropic.com/)
- [Google Gemini Docs](https://ai.google.dev/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
