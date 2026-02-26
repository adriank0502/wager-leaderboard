// Streamer Branding Configuration
// Set via environment variables in Vercel for each streamer

export interface BrandingConfig {
  streamerName: string;
  streamerCode: string;
  domain: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundGradient: string[];
  };
  gameAssets: {
    provider: string;
    games: string[];
    backgroundImages?: string[];
  };
  customText?: {
    heroTitle?: string;
    heroDescription?: string;
    referralCode?: string;
  };
}

// Get branding from environment variables
const getBrandingConfig = (): BrandingConfig => {
  const streamerCode = import.meta.env.VITE_STREAMER_CODE || 'default';
  const streamerName = import.meta.env.VITE_STREAMER_NAME || 'WAGER';
  const domain = import.meta.env.VITE_STREAMER_DOMAIN || 'wager.com';
  
  // ButcherX configuration
  if (streamerCode.toLowerCase() === 'butcher' || streamerCode.toLowerCase() === 'butcherx') {
    return {
      streamerName: 'ButcherX',
      streamerCode: 'butcher',
      domain: 'BTXRewards.com',
      theme: {
        primaryColor: '#8B0000', // Dark red (butcher theme)
        secondaryColor: '#DC143C', // Crimson
        accentColor: '#FF6347', // Tomato red
        backgroundGradient: ['#1a0000', '#2d0000', '#1a0000'], // Dark red gradient
      },
      gameAssets: {
        provider: 'No Limit City',
        games: ['NO limit', 'SERIAL', 'DEAD DEAD DEADER', 'Mental 2'],
        backgroundImages: [
          'https://cdn-cms.wager.com/assets/images/games/vertexst8/nolimit-city/nlc-mental-2.jpg',
          'https://cdn-cms.wager.com/assets/images/games/vertexst8/nolimit-city/nlc-dead-dead-or-deader.jpg',
          'https://cdn-cms.wager.com/assets/images/games/vertexst8/nolimit-city/nlc-serial.jpg',
        ],
      },
      customText: {
        heroTitle: 'ButcherX Leaderboard',
        heroDescription: 'Sign up using referral code BTX and start wagering to compete for prizes',
        referralCode: 'BTX',
      },
    };
  }
  
  // Default WAGER configuration
  return {
    streamerName: streamerName,
    streamerCode: streamerCode,
    domain: domain,
    theme: {
      primaryColor: '#85C7FF',
      secondaryColor: '#526197',
      accentColor: '#60A6FF',
      backgroundGradient: ['#0a0e1a', '#0d1220', '#0a0e1a'],
    },
    gameAssets: {
      provider: 'Default',
      games: [],
    },
    customText: {
      heroTitle: `${streamerName} Leaderboard`,
      heroDescription: `Sign up using referral code ${streamerName} and start wagering to compete for prizes`,
      referralCode: streamerName,
    },
  };
};

export const BRANDING = getBrandingConfig();
