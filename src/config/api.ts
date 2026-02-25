// API Configuration
export const API_CONFIG = {
  // Base API host - change {{host}} to your actual domain
  BASE_URL: import.meta.env.VITE_API_HOST || 'https://api.wager.com',
  
  // API endpoints
  ENDPOINTS: {
    // Get ongoing streamer tournaments
    TOURNAMENTS: '/player/api/v1/tournaments?categories[]=streamer&status[]=ongoing',
    
    // Get leaderboard for specific tournament
    LEADERBOARD: (tournamentId: string) => 
      `/player/api/v1/tournaments/${tournamentId}/leaderboard?per_page=100`,
  },
  
  // Default tournament ID (fallback)
  DEFAULT_TOURNAMENT_ID: '121134',
};

// Helper function to build full URL
export function buildApiUrl(endpoint: string): string {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}
