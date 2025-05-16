
import { useQuery } from "@tanstack/react-query";
import { newsApiClient } from "./apiClient";
import { NewsApiResponse, Article } from "../types/apiResponses";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
}

/**
 * Fetch football news articles
 */
export const fetchFootballNews = async (): Promise<NewsArticle[]> => {
  try {
    const response = await newsApiClient.get<NewsApiResponse>("/top-headlines", {
      category: "sports",
      q: "football OR soccer",
      language: "en",
      pageSize: "10",
      apiKey: import.meta.env.VITE_NEWS_API_KEY || ""
    });
    
    return response.articles.map((article, index) => ({
      id: `${article.source.name}-${index}-${new Date(article.publishedAt).getTime()}`,
      title: article.title || "Untitled",
      description: article.description || "No description available",
      source: article.source.name,
      url: article.url,
      imageUrl: article.urlToImage || "https://via.placeholder.com/300x200?text=Football+News",
      publishedAt: article.publishedAt
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

/**
 * React Query hook for fetching football news
 */
export const useFootballNews = () => {
  return useQuery({
    queryKey: ["footballNews"],
    queryFn: fetchFootballNews,
    staleTime: 30 * 60 * 1000, // Consider news fresh for 30 minutes
  });
};
