
import { API_CONFIG } from "../config/api";
import { toast } from "sonner";

/**
 * Generic API client for making HTTP requests
 */
export class ApiClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor(baseUrl: string, apiKey: string, additionalHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.headers = {
      "Content-Type": "application/json",
      ...additionalHeaders
    };
  }

  /**
   * Make a GET request to the API
   */
  async get<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      
      // Add query parameters
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      console.error("API request failed:", error);
      toast.error("Failed to fetch data from the API");
      throw error;
    }
  }
}

/**
 * Football API client instance
 */
export const footballApiClient = new ApiClient(
  API_CONFIG.FOOTBALL_API.BASE_URL,
  API_CONFIG.FOOTBALL_API.KEY,
  {
    "x-rapidapi-key": API_CONFIG.FOOTBALL_API.KEY,
    "x-rapidapi-host": "v3.football.api-sports.io"
  }
);

/**
 * News API client instance
 */
export const newsApiClient = new ApiClient(
  API_CONFIG.NEWS_API.BASE_URL,
  API_CONFIG.NEWS_API.KEY
);
