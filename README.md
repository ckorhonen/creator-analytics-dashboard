# 📊 Creator Analytics Dashboard

> A beautifully simple analytics dashboard that aggregates data from Patreon, YouTube, Twitch, and other creator platforms into one clear view.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)

## ✨ Features

- **🎯 Unified Dashboard** - See all your creator metrics in one place
- **💰 Revenue Tracking** - Track earnings across all platforms
- **📈 Clean Visualizations** - Beautiful charts that actually make sense
- **⚡ Real-time Updates** - Auto-refreshing data every 5 minutes
- **🎨 UX-First Design** - 80% focus on user experience and clarity
- **🚀 Fast & Lightweight** - Deployed on Cloudflare Workers

## 🎬 Supported Platforms

- **YouTube** - Subscribers, views, ad revenue, channel analytics
- **Patreon** - Patron count, monthly recurring revenue, engagement
- **Twitch** - Followers, subscribers, bits, stream analytics
- **Whop** - Product sales, subscriber count, revenue tracking

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Cloudflare account (free tier works great)
- API credentials for your creator platforms

### Installation

```bash
# Clone the repository
git clone https://github.com/ckorhonen/creator-analytics-dashboard.git
cd creator-analytics-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard!

## 🔧 Configuration

### 1. Set up API Keys

Create a `.env` file in the root directory:

```env
YOUTUBE_API_KEY=your_youtube_api_key
PATREON_CLIENT_ID=your_patreon_client_id
PATREON_CLIENT_SECRET=your_patreon_client_secret
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret
WHOP_API_KEY=your_whop_api_key
```

### 2. Platform-Specific Setup

#### YouTube Analytics API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable YouTube Analytics API
4. Create credentials (API Key)
5. Add your API key to `.env`

**Docs**: [YouTube Analytics API](https://developers.google.com/youtube/analytics)

#### Patreon API

1. Visit [Patreon Developers Portal](https://www.patreon.com/portal/registration/register-clients)
2. Create a new OAuth2 client
3. Note your Client ID and Client Secret
4. Add credentials to `.env`

**Docs**: [Patreon API v2](https://docs.patreon.com/)

#### Twitch API

1. Go to [Twitch Developer Console](https://dev.twitch.tv/console)
2. Register a new application
3. Get your Client ID and Client Secret
4. Add credentials to `.env`

**Docs**: [Twitch API Reference](https://dev.twitch.tv/docs/api/)

#### Whop API

1. Log in to [Whop Dashboard](https://whop.com/dashboard)
2. Navigate to Developer Settings
3. Generate an API key
4. Add to `.env`

**Docs**: [Whop API Documentation](https://dev.whop.com/)

## 🌐 Deployment to Cloudflare Workers

### One-Time Setup

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Add your secrets
wrangler secret put YOUTUBE_API_KEY
wrangler secret put PATREON_CLIENT_ID
wrangler secret put PATREON_CLIENT_SECRET
wrangler secret put TWITCH_CLIENT_ID
wrangler secret put TWITCH_CLIENT_SECRET
wrangler secret put WHOP_API_KEY
```

### Deploy

```bash
# Build and deploy
npm run build
npm run deploy
```

Your dashboard will be live at `https://creator-analytics-dashboard.your-subdomain.workers.dev`

## 📁 Project Structure

```
creator-analytics-dashboard/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.tsx    # Main dashboard view
│   │   ├── MetricCard.tsx   # Metric display cards
│   │   ├── PlatformCard.tsx # Platform-specific cards
│   │   └── RevenueChart.tsx # Revenue visualization
│   ├── services/            # API integration
│   │   ├── api.ts          # Main API service
│   │   └── mockData.ts     # Mock data for development
│   ├── types/              # TypeScript types
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── worker/                  # Cloudflare Worker
│   └── index.ts            # Worker logic and routing
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
├── wrangler.toml           # Cloudflare configuration
└── whop.json               # Whop app configuration
```

## 🎨 Design Philosophy

### 80% UX, 20% Code

This project prioritizes **user experience and visual clarity** over technical complexity:

- **Clean & Minimal** - No clutter, just the metrics that matter
- **Instant Understanding** - Data should be obvious at a glance
- **Beautiful by Default** - Carefully chosen colors and spacing
- **Mobile-Friendly** - Responsive design that works everywhere

### Key Metrics Focus

We only show what creators actually care about:
- 💰 **Revenue** (the bottom line)
- 👥 **Subscribers** (your audience size)
- 👁️ **Views** (your reach)

No confusing vanity metrics or analytics jargon.

## 🔒 Security & Privacy

- All API keys stored securely in Cloudflare Workers secrets
- No data persisted beyond 5-minute cache
- CORS enabled for your domain only
- OAuth2 flows for platform authentication

## 🛠️ Development

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Test Cloudflare Worker locally
npm run cf:dev
```

## 📝 Roadmap

- [ ] Add Instagram analytics
- [ ] Add TikTok creator analytics
- [ ] Email weekly summary reports
- [ ] Custom date range filtering
- [ ] Export data to CSV
- [ ] Dark mode toggle
- [ ] Multi-user support
- [ ] Notification system for milestones

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Acknowledgments

- Built with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- Charting with [Recharts](https://recharts.org/)
- Deployed on [Cloudflare Workers](https://workers.cloudflare.com/)
- Icons from [Lucide](https://lucide.dev/)

## 💬 Support

Having issues? Open an issue on GitHub or reach out:

- GitHub Issues: [Create an issue](https://github.com/ckorhonen/creator-analytics-dashboard/issues)
- Email: ckorhonen@gmail.com

---

**Made with ❤️ for creators who deserve better analytics**