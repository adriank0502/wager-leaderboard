# Cron Job Setup for Real-Time Leaderboard Updates

This project includes a cron job system to fetch and cache leaderboard data for real-time updates.

## How It Works

1. **Cron Job** (`/api/cron/fetch-leaderboard.ts`): Runs every 2 minutes to fetch fresh leaderboard data from the Wager API and cache it.

2. **API Endpoint** (`/api/leaderboard.ts`): Serves the cached leaderboard data to the frontend.

3. **Frontend**: Can optionally use the cached endpoint for faster, real-time updates.

## Setup Instructions

### 1. Environment Variables

Add these to your Vercel project settings:

```
VITE_API_HOST=https://api.wager.com
VITE_TOURNAMENT_ID=your_tournament_id
CRON_SECRET=your_random_secret_string
```

**Important**: Set `CRON_SECRET` to a random string (e.g., generate with `openssl rand -base64 32`). This prevents unauthorized access to your cron endpoint.

### 2. Vercel Configuration

The `vercel.json` file is already configured with:
- Cron job runs every 2 minutes (`*/2 * * * *`)
- Path: `/api/cron/fetch-leaderboard`

### 3. Testing the Cron Job

You can manually trigger the cron job by calling:
```bash
curl -X GET "https://your-domain.vercel.app/api/cron/fetch-leaderboard" \
  -H "Authorization: Bearer your_cron_secret"
```

### 4. Using Cached Data in Frontend

Update your `useLeaderboard` hook to optionally use the cached endpoint:

```typescript
// Option 1: Use cached endpoint (faster, real-time)
const response = await fetch(`/api/leaderboard?tournamentId=${tournamentId}`);

// Option 2: Use direct API (always fresh, slower)
const response = await fetch(`${apiHost}/player/api/v1/tournaments/${tournamentId}/leaderboard`);
```

## Production Setup (Upstash Redis)

This project uses **Upstash Redis** for persistent caching across serverless function instances.

### Setup Instructions

1. **Install Upstash Redis Integration**:
   - Go to your Vercel project dashboard
   - Navigate to **Settings** → **Integrations**
   - Search for "Upstash Redis" and install it
   - Or visit: https://vercel.com/marketplace/upstash/upstash-redis

2. **Environment Variables** (Auto-configured):
   After installing the integration, Vercel automatically sets:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

3. **Verify Setup**:
   The cache is already configured in `api/lib/cache.ts` to use Upstash Redis automatically.

### Benefits

- ✅ **Persistent**: Cache survives serverless function cold starts
- ✅ **Fast**: Sub-millisecond read/write operations
- ✅ **Scalable**: Handles high traffic loads
- ✅ **Reliable**: 99.99% uptime SLA
- ✅ **Automatic TTL**: Data expires after 5 minutes automatically

## Cron Schedule Options

Current: Every 2 minutes (`*/2 * * * *`)

Other options:
- Every minute: `* * * * *`
- Every 5 minutes: `*/5 * * * *`
- Every 10 minutes: `*/10 * * * *`
- Every hour: `0 * * * *`

## Monitoring

Check Vercel logs to monitor cron job execution:
1. Go to Vercel Dashboard
2. Select your project
3. Go to "Deployments" → Click on a deployment → "Functions" tab
4. Look for `/api/cron/fetch-leaderboard` logs

## Troubleshooting

- **Cron not running**: Check that `CRON_SECRET` is set and matches in the Authorization header
- **No cached data**: Wait for the first cron job to run (up to 2 minutes)
- **Stale data**: Check cron job logs to ensure it's running successfully
