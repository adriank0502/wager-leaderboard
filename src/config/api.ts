// API Configuration
export const API_CONFIG = {
  // Base API host - set VITE_API_HOST in Vercel environment variables
  BASE_URL: import.meta.env.VITE_API_HOST || 'https://api.wager.com',

  // Per-streamer tournament ID - set VITE_TOURNAMENT_ID in Vercel environment variables
  // If set, this tournament ID will be used directly (skips the tournaments API call)
  // If not set, the app will fetch the active tournament from the API
  TOURNAMENT_ID: import.meta.env.VITE_TOURNAMENT_ID || null,
  
  // API endpoints
  ENDPOINTS: {
    // Get ongoing streamer tournaments
    TOURNAMENTS: '/player/api/v1/tournaments?categories[]=streamer&status[]=ongoing',
    
    // Get leaderboard for specific tournament
    LEADERBOARD: (tournamentId: string) => 
      `/player/api/v1/tournaments/${tournamentId}/leaderboard?per_page=100`,
  },
};

// Helper function to build full URL
export function buildApiUrl(endpoint: string): string {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}
