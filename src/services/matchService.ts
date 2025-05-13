
import { Match } from "../types/match";

// Mock data for football matches
export const getTodayMatches = (): Match[] => {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  return [
    {
      id: "1",
      homeTeam: {
        id: "team1",
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
        score: 2,
      },
      awayTeam: {
        id: "team2",
        name: "Arsenal",
        logo: "https://media.api-sports.io/football/teams/42.png",
        score: 1,
      },
      date: today,
      time: "15:00",
      status: "LIVE",
      competition: {
        id: "comp1",
        name: "Premier League",
        logo: "https://media.api-sports.io/football/leagues/39.png",
      },
      stadium: "Old Trafford",
      referee: "Michael Oliver",
    },
    {
      id: "2",
      homeTeam: {
        id: "team3",
        name: "Barcelona",
        logo: "https://media.api-sports.io/football/teams/529.png",
      },
      awayTeam: {
        id: "team4",
        name: "Real Madrid",
        logo: "https://media.api-sports.io/football/teams/541.png",
      },
      date: today,
      time: "20:00",
      status: "UPCOMING",
      competition: {
        id: "comp2",
        name: "La Liga",
        logo: "https://media.api-sports.io/football/leagues/140.png",
      },
      stadium: "Camp Nou",
      referee: "Mateu Lahoz",
    },
    {
      id: "3",
      homeTeam: {
        id: "team5",
        name: "Bayern Munich",
        logo: "https://media.api-sports.io/football/teams/157.png",
        score: 3,
      },
      awayTeam: {
        id: "team6",
        name: "Borussia Dortmund",
        logo: "https://media.api-sports.io/football/teams/165.png",
        score: 1,
      },
      date: today,
      time: "14:30",
      status: "FINISHED",
      competition: {
        id: "comp3",
        name: "Bundesliga",
        logo: "https://media.api-sports.io/football/leagues/78.png",
      },
      stadium: "Allianz Arena",
      referee: "Felix Brych",
    },
    {
      id: "4",
      homeTeam: {
        id: "team7",
        name: "Liverpool",
        logo: "https://media.api-sports.io/football/teams/40.png",
      },
      awayTeam: {
        id: "team8",
        name: "Manchester City",
        logo: "https://media.api-sports.io/football/teams/50.png",
      },
      date: today,
      time: "17:30",
      status: "UPCOMING",
      competition: {
        id: "comp1",
        name: "Premier League",
        logo: "https://media.api-sports.io/football/leagues/39.png",
      },
      stadium: "Anfield",
      referee: "Anthony Taylor",
    },
    {
      id: "5",
      homeTeam: {
        id: "team9",
        name: "Juventus",
        logo: "https://media.api-sports.io/football/teams/496.png",
        score: 0,
      },
      awayTeam: {
        id: "team10",
        name: "Inter Milan",
        logo: "https://media.api-sports.io/football/teams/505.png",
        score: 0,
      },
      date: today,
      time: "13:00",
      status: "LIVE",
      competition: {
        id: "comp4",
        name: "Serie A",
        logo: "https://media.api-sports.io/football/leagues/135.png",
      },
      stadium: "Allianz Stadium",
      referee: "Daniele Orsato",
    },
    {
      id: "6",
      homeTeam: {
        id: "team11",
        name: "PSG",
        logo: "https://media.api-sports.io/football/teams/85.png",
        score: 4,
      },
      awayTeam: {
        id: "team12",
        name: "Lyon",
        logo: "https://media.api-sports.io/football/teams/80.png",
        score: 2,
      },
      date: today,
      time: "12:00",
      status: "FINISHED",
      competition: {
        id: "comp5",
        name: "Ligue 1",
        logo: "https://media.api-sports.io/football/leagues/61.png",
      },
      stadium: "Parc des Princes",
      referee: "Clément Turpin",
    },
  ];
};

export const getMatchById = (id: string): Match | undefined => {
  const matches = getTodayMatches();
  return matches.find(match => match.id === id);
};
