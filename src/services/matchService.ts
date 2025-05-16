
import { Match, MatchStatus, Team } from "../types/match";
import { FootballApiResponse, FixtureResponse } from "../types/apiResponses";
import { footballApiClient } from "./apiClient";
import { useQuery } from "@tanstack/react-query";

// Get a formatted date string (YYYY-MM-DD) for a specific date
const getFormattedDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Helper to get dates for yesterday, today, and tomorrow
export const getDates = () => {
  const now = new Date();
  
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  return {
    yesterday: getFormattedDate(yesterday),
    today: getFormattedDate(now),
    tomorrow: getFormattedDate(tomorrow)
  };
};

/**
 * Convert API fixture to our Match type
 */
const convertFixtureToMatch = (fixture: FixtureResponse): Match => {
  // Get match status
  let status: MatchStatus = "UPCOMING";
  if (fixture.fixture.status.short === "FT" || fixture.fixture.status.short === "AET" || 
      fixture.fixture.status.short === "PEN") {
    status = "FINISHED";
  } else if (fixture.fixture.status.short === "1H" || fixture.fixture.status.short === "2H" || 
             fixture.fixture.status.short === "HT" || fixture.fixture.status.short === "ET" || 
             fixture.fixture.status.short === "P") {
    status = "LIVE";
  }

  // Create team objects
  const homeTeam: Team = {
    id: String(fixture.teams.home.id),
    name: fixture.teams.home.name,
    logo: fixture.teams.home.logo,
    score: fixture.goals.home !== null ? fixture.goals.home : undefined
  };

  const awayTeam: Team = {
    id: String(fixture.teams.away.id),
    name: fixture.teams.away.name,
    logo: fixture.teams.away.logo,
    score: fixture.goals.away !== null ? fixture.goals.away : undefined
  };

  // Get match time
  const matchDate = new Date(fixture.fixture.date);
  const time = matchDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const date = getFormattedDate(matchDate);

  return {
    id: String(fixture.fixture.id),
    homeTeam,
    awayTeam,
    date,
    time,
    status,
    competition: {
      id: String(fixture.league.id),
      name: fixture.league.name,
      logo: fixture.league.logo
    },
    stadium: fixture.fixture.venue.name,
    referee: fixture.fixture.referee || undefined
  };
};

/**
 * Fetch matches for a specific date
 */
export const fetchMatchesByDate = async (date: string): Promise<Match[]> => {
  try {
    const response = await footballApiClient.get<FootballApiResponse<FixtureResponse[]>>("/fixtures", {
      date,
      timezone: "Europe/London" // Using a standard timezone
    });

    // Filter for popular leagues to not overwhelm with too many matches
    const popularLeagueIds = [39, 140, 78, 135, 61, 2]; // Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League
    const filteredFixtures = response.response.filter(fixture => popularLeagueIds.includes(fixture.league.id));
    
    return filteredFixtures.map(convertFixtureToMatch);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
};

/**
 * React Query hook for getting matches by date
 */
export const useMatchesByDate = (date: string) => {
  return useQuery({
    queryKey: ["matches", date],
    queryFn: () => fetchMatchesByDate(date),
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
  });
};

/**
 * Fetch match by ID
 */
export const fetchMatchById = async (id: string): Promise<Match | undefined> => {
  try {
    const response = await footballApiClient.get<FootballApiResponse<FixtureResponse[]>>("/fixtures", {
      id
    });
    
    if (response.response.length === 0) {
      return undefined;
    }

    return convertFixtureToMatch(response.response[0]);
  } catch (error) {
    console.error("Error fetching match:", error);
    return undefined;
  }
};

/**
 * React Query hook for getting match by ID
 */
export const useMatchById = (id: string) => {
  return useQuery({
    queryKey: ["match", id],
    queryFn: () => fetchMatchById(id),
    staleTime: 1 * 60 * 1000, // Data considered fresh for 1 minute
    enabled: !!id
  });
};

// Hook for yesterday's matches
export const useYesterdayMatches = () => {
  const { yesterday } = getDates();
  return useMatchesByDate(yesterday);
};

// Hook for today's matches
export const useTodayMatches = () => {
  const { today } = getDates();
  return useMatchesByDate(today);
};

// Hook for tomorrow's matches
export const useTomorrowMatches = () => {
  const { tomorrow } = getDates();
  return useMatchesByDate(tomorrow);
};
