# AI for the Indian Investor

An intelligent platform that turns market data into actionable investment decisions for Indian retail investors.

## Features

### Opportunity Radar
- **Real-time Monitoring**: Tracks corporate filings, quarterly results, bulk/block deals, insider trades, and regulatory changes
- **Alert Types**: 
  - Bulk deal notifications for large institutional transactions
  - Insider trading activity alerts
  - Regulatory filing updates
- **AI-Powered Detection**: Advanced signal detection beyond simple summarization
- **Daily Alerts**: Automated notifications for missed investment opportunities

### Chart Pattern Intelligence
- **Technical Analysis**: Real-time pattern detection across NSE universe stocks
- **Pattern Types**:
  - Breakout patterns with resistance level analysis
  - Reversal setups with support building indicators
  - Consolidation phases with range-bound trading signals
- **Success Rate Tracking**: Historical back-tested performance metrics (56%-68% success rates)
- **Visual Charts**: Interactive price charts with pattern overlays
- **Plain-English Explanations**: AI-generated insights in understandable language

### Market ChatGPT Next Gen
- **Conversational AI**: Advanced chat interface for market queries
- **Portfolio Integration**: Context-aware responses based on user's stock holdings
- **Multi-step Analysis**: Complex reasoning and market scenario evaluation
- **Data Sources**: Citations from NSE data, market analysis, and institutional flows
- **Intelligent Fallbacks**: Works with or without OpenAI API integration
- **Specialized Responses**: Tailored answers for Nifty, Sensex, dividend strategies, and risk management

### AI Market Video Engine
- **Automated Video Generation**: Creates 30-90 second professional market update videos
- **Content Types**:
  - Daily market summary videos
  - Sector rotation analysis
  - FII/DII flow visualizations
  - IPO tracker updates
  - Race-chart simulators for market performance
- **Data Integration**: Real-time market data, institutional flows, and sector performance
- **Zero Editing Required**: Fully automated video production pipeline
- **Visual Elements**: Charts, animations, and data visualizations

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
