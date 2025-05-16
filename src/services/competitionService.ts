
import { useQuery } from "@tanstack/react-query";
import { footballApiClient } from "./apiClient";
import { FootballApiResponse, LeagueResponse } from "../types/apiResponses";

export interface Competition {
  id: string;
  name: string;
  country: string;
  logo: string;
  season: number;
}

/**
 * Fetch all major competitions/leagues
 */
export const fetchCompetitions = async (): Promise<Competition[]> => {
  try {
    const response = await footballApiClient.get<FootballApiResponse<LeagueResponse[]>>("/leagues");
    
    // Filter major leagues and tournaments
    const majorLeagueIds = [39, 140, 78, 135, 61, 2]; // Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League
    const filteredLeagues = response.response.filter(
      item => majorLeagueIds.includes(item.league.id)
    );
    
    return filteredLeagues.map(item => {
      const currentSeason = item.seasons.find(season => season.current)?.year || 
                            item.seasons[item.seasons.length - 1].year;
      
      return {
        id: String(item.league.id),
        name: item.league.name,
        country: item.country.name,
        logo: item.league.logo,
        season: currentSeason
      };
    });
  } catch (error) {
    console.error("Error fetching competitions:", error);
    return [];
  }
};

/**
 * React Query hook for fetching competitions
 */
export const useCompetitions = () => {
  return useQuery({
    queryKey: ["competitions"],
    queryFn: fetchCompetitions,
    staleTime: 24 * 60 * 60 * 1000, // Competitions don't change often, cache for a day
  });
};
