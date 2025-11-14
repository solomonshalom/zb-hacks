# AI Integration Guide

## Overview
The /wall page now features an AI assistant powered by Groq that can answer questions about all submitted hackathon projects.

## Setup

1. **Get your Groq API Key**
   - Sign up at https://console.groq.com/
   - Get your API key from the dashboard

2. **Add to environment variables**
   ```bash
   # Add to .env file
   GROQ_API_KEY=your-groq-api-key-here
   ```

3. **Restart your development server**
   ```bash
   npm run dev
   ```

## Features

### AI Chat Interface
- **Floating Action Button (FAB)**: Purple gradient button in bottom-right corner
- **Chat Modal**: Clean, dark-themed chat interface
- **Real-time Streaming**: Responses stream in real-time from Groq
- **Project Context**: AI has access to all project information including:
  - Project titles
  - Creator names
  - One-liner descriptions
  - Links
  - Results/achievements

### Example Questions
- "Which projects have achieved the most users?"
- "Tell me about projects related to AI"
- "Who created project X?"
- "What are the most innovative projects?"
- "Show me projects by [creator name]"

## Technical Details

### Backend (`/src/pages/api/chat.ts`)
- Uses Groq SDK with Llama 3.1 70B model
- Streams responses using Server-Sent Events (SSE)
- Provides project context in system prompt

### Model Used
- **llama-3.1-70b-versatile**: Fast, high-quality responses
- Alternative models available:
  - `llama-3.1-8b-instant` (faster, lighter)
  - `mixtral-8x7b-32768` (long context)
  - `gemma2-9b-it` (Google's model)

### Frontend (`/src/components/AIChat.tsx`)
- Modal overlay with backdrop blur
- Auto-scrolling message history
- Textarea with auto-resize
- Disabled state while streaming
- Smooth animations and transitions

### Styling
- Matches overall dark theme
- Purple gradient accents (matches shimmer button)
- Responsive design (mobile-friendly)
- No scrollbars except in modal content
- Glassmorphism effects

## API Usage

The chat endpoint (`/api/chat`) expects:
```json
{
  "messages": [
    { "role": "user", "content": "Your question" }
  ],
  "projects": [/* array of all projects */]
}
```

Returns: Server-Sent Events stream with JSON chunks

## Cost Considerations
- Groq offers generous free tier
- Very fast inference (often sub-second)
- Monitor usage in Groq console
- Cost-effective for production use
