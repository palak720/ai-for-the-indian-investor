# Backend

This is the backend service for the AI for the Indian Investor platform, built with Python FastAPI.

## Features

- RESTful API endpoints for market data analysis
- Integration with OpenAI API for AI-powered insights
- Yahoo Finance data fetching
- FastAPI framework for high performance

## Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set your OpenAI API key:
   ```bash
   export OPENAI_API_KEY=your-api-key-here
   ```

4. Run the server:
   ```bash
   python main.py
   ```

The server will start on `http://localhost:8000`.

## API Documentation

Once the server is running, visit `http://localhost:8000/docs` for interactive API documentation powered by Swagger UI.

## Dependencies

- fastapi: Web framework
- uvicorn: ASGI server
- openai: OpenAI API client
- yfinance: Yahoo Finance data
- python-multipart: For file uploads (if needed)
- Other dependencies as listed in requirements.txt