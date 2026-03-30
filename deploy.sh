#!/bin/bash

echo "🚀 Deploying AI for the Indian Investor to Vercel"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy frontend
echo "📦 Deploying frontend..."
cd frontend
npm install
npm run build
cd ..

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --yes --prod

echo ""
echo "✅ Frontend deployed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Copy the deployment URL from above"
echo "2. Deploy backend to Railway/Render/Heroku"
echo "3. Set VITE_API_BASE environment variable in Vercel dashboard"
echo "4. Update the README with your backend URL"