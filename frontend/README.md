# Frontend

This is the frontend application for the AI for the Indian Investor platform, built with React 19, Vite, and Tailwind CSS.

## Features

- **Opportunity Radar**: Real-time market opportunity alerts
- **Chart Intelligence**: Technical pattern detection and analysis
- **Market Chat**: AI-powered conversational interface for market queries
- **Video Engine**: Automated market update video generation

## Tech Stack

- React 19 with Vite for fast development
- Tailwind CSS for styling
- Recharts for data visualization
- ESLint for code quality

## Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser

## Build for Production

```bash
npm run build
```

## Components

- `App.jsx`: Main application component
- `ChartIntelligence.jsx`: Technical analysis charts
- `MarketChat.jsx`: AI chat interface
- `OpportunityRadar.jsx`: Market alerts dashboard
- `VideoEngine.jsx`: Video generation interface

## Development

The application connects to the backend API running on `http://localhost:8000`. Make sure the backend is running before starting the frontend.
