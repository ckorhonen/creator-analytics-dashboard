# 🔌 Platform Integration Guide

This guide provides code examples for integrating each creator platform's API.

## 📺 YouTube Analytics API

### Setup
```typescript
// Install Google API client
npm install googleapis

// src/services/youtube.ts
import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

const youtubeAnalytics = google.youtubeAnalytics({
  version: 'v2',
  auth: oauth2Client // Requires OAuth2
});
```

### Fetch Channel Stats
```typescript
export async function getYouTubeStats(channelId: string) {
  // Get subscriber count and view count
  const channelResponse = await youtube.channels.list({
    part: ['statistics', 'snippet'],
    id: [channelId]
  });

  const stats = channelResponse.data.items?.[0]?.statistics;
  
  return {
    subscribers: parseInt(stats?.subscriberCount || '0'),
    totalViews: parseInt(stats?.viewCount || '0'),
    videoCount: parseInt(stats?.videoCount || '0')
  };
}
```

### Fetch Revenue (Requires OAuth)
```typescript
export async function getYouTubeRevenue(channelId: string) {
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 30*24*60*60*1000).toISOString().split('T')[0];

  const response = await youtubeAnalytics.reports.query({
    ids: `channel==${channelId}`,
    startDate,
    endDate,
    metrics: 'estimatedRevenue,views',
    dimensions: 'day'
  });

  return {
    revenue: response.data.rows?.reduce((sum, row) => sum + row[1], 0) || 0,
    views: response.data.rows?.reduce((sum, row) => sum + row[2], 0) || 0
  };
}
```

**Documentation**: [YouTube Data API](https://developers.google.com/youtube/v3) | [YouTube Analytics API](https://developers.google.com/youtube/analytics)

---

## 🎨 Patreon API

### Setup
```typescript
// Install Patreon client
npm install patreon

// src/services/patreon.ts
import patreon from 'patreon';

const patreonAPI = patreon.patreon;
const patreonOAuth = patreon.oauth;

// Initialize OAuth client
const oauth = patreonOAuth(
  process.env.PATREON_CLIENT_ID!,
  process.env.PATREON_CLIENT_SECRET!
);
```

### Fetch Campaign Data
```typescript
export async function getPatreonStats(accessToken: string) {
  const client = patreonAPI(accessToken);
  
  // Get campaigns
  const response = await client('/current_user/campaigns', {
    fields: {
      campaign: ['patron_count', 'creation_count', 'earnings_visibility'],
      tier: ['amount_cents', 'patron_count', 'title']
    },
    include: ['tiers']
  });

  const campaign = response.data[0];
  const tiers = response.included || [];

  // Calculate total monthly revenue
  const monthlyRevenue = tiers.reduce((sum, tier) => {
    if (tier.type === 'tier') {
      return sum + (tier.attributes.amount_cents * tier.attributes.patron_count / 100);
    }
    return sum;
  }, 0);

  return {
    patrons: campaign.attributes.patron_count,
    monthlyRevenue,
    posts: campaign.attributes.creation_count
  };
}
```

### OAuth Flow
```typescript
export function getPatreonAuthUrl(redirectUri: string) {
  return oauth.getOAuthUrl({
    clientId: process.env.PATREON_CLIENT_ID!,
    redirectUri,
    scope: 'campaigns campaigns.members'
  });
}

export async function getPatreonTokens(code: string, redirectUri: string) {
  return oauth.getTokens({
    code,
    redirectUri
  });
}
```

**Documentation**: [Patreon API v2](https://docs.patreon.com/)

---

## 🎮 Twitch API

### Setup
```typescript
// src/services/twitch.ts
interface TwitchAuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

async function getTwitchAccessToken(): Promise<string> {
  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID!,
      client_secret: process.env.TWITCH_CLIENT_SECRET!,
      grant_type: 'client_credentials'
    })
  });

  const data: TwitchAuthResponse = await response.json();
  return data.access_token;
}
```

### Fetch Channel Stats
```typescript
export async function getTwitchStats(username: string) {
  const token = await getTwitchAccessToken();
  
  const headers = {
    'Client-ID': process.env.TWITCH_CLIENT_ID!,
    'Authorization': `Bearer ${token}`
  };

  // Get user info
  const userResponse = await fetch(
    `https://api.twitch.tv/helix/users?login=${username}`,
    { headers }
  );
  const userData = await userResponse.json();
  const userId = userData.data[0].id;

  // Get follower count
  const followResponse = await fetch(
    `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${userId}`,
    { headers }
  );
  const followData = await followResponse.json();

  // Get subscriber count (requires user access token with channel:read:subscriptions)
  const subResponse = await fetch(
    `https://api.twitch.tv/helix/subscriptions?broadcaster_id=${userId}`,
    { headers }
  );
  const subData = await subResponse.json();

  return {
    followers: followData.total,
    subscribers: subData.total || 0,
    viewCount: userData.data[0].view_count
  };
}
```

### Calculate Revenue
```typescript
export async function getTwitchRevenue(userId: string, userToken: string) {
  // Note: Actual revenue data requires Partner/Affiliate dashboard access
  // This estimates based on subscriptions and bits
  
  const headers = {
    'Client-ID': process.env.TWITCH_CLIENT_ID!,
    'Authorization': `Bearer ${userToken}`
  };

  const response = await fetch(
    `https://api.twitch.tv/helix/subscriptions?broadcaster_id=${userId}`,
    { headers }
  );
  
  const data = await response.json();
  const subscribers = data.data;

  // Estimate: $2.50 per Tier 1, $5 per Tier 2, $12.50 per Tier 3
  const revenue = subscribers.reduce((sum, sub) => {
    const tierRevenue = {
      '1000': 2.50,
      '2000': 5.00,
      '3000': 12.50
    };
    return sum + (tierRevenue[sub.tier] || 0);
  }, 0);

  return { estimatedRevenue: revenue };
}
```

**Documentation**: [Twitch API Reference](https://dev.twitch.tv/docs/api/)

---

## 💎 Whop API

### Setup
```typescript
// src/services/whop.ts
const WHOP_API_BASE = 'https://api.whop.com/v1';

async function whopFetch(endpoint: string) {
  const response = await fetch(`${WHOP_API_BASE}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${process.env.WHOP_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Whop API error: ${response.statusText}`);
  }

  return response.json();
}
```

### Fetch Sales Data
```typescript
export async function getWhopStats() {
  // Get company info
  const company = await whopFetch('/company');

  // Get all products
  const products = await whopFetch('/products');

  // Get memberships (active subscribers)
  const memberships = await whopFetch('/memberships?status=active');

  // Get payments for revenue calculation
  const thirtyDaysAgo = new Date(Date.now() - 30*24*60*60*1000).toISOString();
  const payments = await whopFetch(`/payments?created_after=${thirtyDaysAgo}`);

  const revenue = payments.data.reduce((sum, payment) => {
    return sum + (payment.amount / 100); // Amount is in cents
  }, 0);

  return {
    revenue,
    activeSubscribers: memberships.pagination.total,
    totalProducts: products.pagination.total
  };
}
```

### Webhook Handler
```typescript
export async function handleWhopWebhook(request: Request) {
  const signature = request.headers.get('X-Whop-Signature');
  const body = await request.text();

  // Verify webhook signature
  const isValid = verifyWhopSignature(body, signature, process.env.WHOP_WEBHOOK_SECRET!);
  
  if (!isValid) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(body);

  switch (event.type) {
    case 'subscription.created':
      // Handle new subscription
      break;
    case 'subscription.cancelled':
      // Handle cancellation
      break;
    case 'payment.succeeded':
      // Handle successful payment
      break;
  }

  return new Response('OK', { status: 200 });
}
```

**Documentation**: [Whop API Docs](https://dev.whop.com/)

---

## 🔄 Data Aggregation

### Combine All Platforms
```typescript
// src/services/aggregator.ts
export async function aggregateAllPlatforms() {
  const [youtube, patreon, twitch, whop] = await Promise.allSettled([
    getYouTubeStats('YOUR_CHANNEL_ID'),
    getPatreonStats('USER_ACCESS_TOKEN'),
    getTwitchStats('USERNAME'),
    getWhopStats()
  ]);

  const platforms = [
    {
      name: 'YouTube',
      revenue: youtube.status === 'fulfilled' ? youtube.value.revenue : 0,
      subscribers: youtube.status === 'fulfilled' ? youtube.value.subscribers : 0,
      views: youtube.status === 'fulfilled' ? youtube.value.totalViews : 0,
      color: '#FF0000',
      icon: '📹'
    },
    {
      name: 'Patreon',
      revenue: patreon.status === 'fulfilled' ? patreon.value.monthlyRevenue : 0,
      subscribers: patreon.status === 'fulfilled' ? patreon.value.patrons : 0,
      views: 0,
      color: '#FF424D',
      icon: '🎨'
    },
    {
      name: 'Twitch',
      revenue: twitch.status === 'fulfilled' ? twitch.value.estimatedRevenue : 0,
      subscribers: twitch.status === 'fulfilled' ? twitch.value.subscribers : 0,
      views: twitch.status === 'fulfilled' ? twitch.value.viewCount : 0,
      color: '#9146FF',
      icon: '🎮'
    },
    {
      name: 'Whop',
      revenue: whop.status === 'fulfilled' ? whop.value.revenue : 0,
      subscribers: whop.status === 'fulfilled' ? whop.value.activeSubscribers : 0,
      views: 0,
      color: '#7C3AED',
      icon: '💎'
    }
  ];

  const totals = platforms.reduce(
    (acc, platform) => ({
      revenue: acc.revenue + platform.revenue,
      subscribers: acc.subscribers + platform.subscribers,
      views: acc.views + platform.views
    }),
    { revenue: 0, subscribers: 0, views: 0 }
  );

  return {
    ...totals,
    platforms,
    lastUpdated: new Date().toISOString()
  };
}
```

## 💡 Tips

1. **Rate Limiting**: Implement exponential backoff for API calls
2. **Caching**: Use Cloudflare KV to cache responses (5-15 minutes)
3. **Error Handling**: Always use `Promise.allSettled` to prevent one failing API from breaking everything
4. **OAuth**: Store refresh tokens securely and refresh access tokens automatically
5. **Testing**: Use mock data during development to avoid hitting API limits

## 🔒 Security Checklist

- [ ] Never commit API keys to Git
- [ ] Use environment variables for all secrets
- [ ] Implement proper OAuth flows
- [ ] Validate webhook signatures
- [ ] Use HTTPS only
- [ ] Implement rate limiting on your endpoints
- [ ] Set proper CORS headers
- [ ] Rotate API keys regularly

---

Need help with integration? Open an issue on GitHub!
