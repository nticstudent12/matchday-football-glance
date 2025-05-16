
// API configuration for external services
export const API_CONFIG = {
  FOOTBALL_API: {
    BASE_URL: "https://v3.football.api-sports.io",
    KEY: import.meta.env.VITE_FOOTBALL_API_KEY || "",
  },
  NEWS_API: {
    BASE_URL: "https://newsapi.org/v2",
    KEY: import.meta.env.VITE_NEWS_API_KEY || "",
  }
};
