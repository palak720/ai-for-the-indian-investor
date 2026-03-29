# AI for the Indian Investor

An intelligent platform that turns market data into actionable investment decisions for Indian retail investors.

## Features

### Opportunity Radar
- Monitors corporate filings, quarterly results, bulk/block deals, insider trades, and regulatory changes
- Surfaces missed opportunities as daily alerts
- AI-powered signal detection, not just summarization

### Chart Pattern Intelligence
- Real-time technical pattern detection across NSE universe
- Breakouts, reversals, support/resistance, divergences
- Plain-English explanations with historical back-tested success rates

### Market ChatGPT Next Gen
- Deeper data integration and multi-step analysis
- Portfolio-aware answers with source citations
- Advanced conversational AI for market queries

### AI Market Video Engine
- Auto-generates short, visually rich market update videos (30-90 seconds)
- Race-chart simulators, daily market wraps, sector rotations
- FII/DII flow visualizations and IPO trackers
- Zero human editing required

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Recharts
- **Backend**: Python FastAPI, OpenAI API, Yahoo Finance
- **Deployment**: Ready for containerization

## Setup

### Backend

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set OpenAI API key:
   ```bash
   export OPENAI_API_KEY=your-api-key-here
   ```

4. Run the server:
   ```bash
   python main.py
   ```

### Frontend

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## API Endpoints

- `GET /opportunity-radar` - Get market opportunity alerts
- `POST /chart-pattern/{symbol}` - Analyze chart patterns for a stock
- `POST /market-chat` - Chat with market AI
- `GET /market-video-data` - Get data for video generation

## Development

The application is designed to help Indian investors make informed decisions by providing:
- Real-time market intelligence
- Technical analysis with success rates
- Conversational AI for market queries
- Automated video content generation

## Note

This is a prototype implementation. For production use, integrate with actual ET Markets data APIs and NSE data feeds.