
import { Match } from "../types/match";

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

// Mock data for football matches
const allMatches: Match[] = [
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
    date: getDates().today,
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
    date: getDates().today,
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
    date: getDates().today,
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
    date: getDates().today,
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
    date: getDates().today,
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
    date: getDates().today,
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
  // Yesterday's matches
  {
    id: "7",
    homeTeam: {
      id: "team13",
      name: "Chelsea",
      logo: "https://media.api-sports.io/football/teams/49.png",
      score: 2,
    },
    awayTeam: {
      id: "team14",
      name: "Tottenham",
      logo: "https://media.api-sports.io/football/teams/47.png",
      score: 0,
    },
    date: getDates().yesterday,
    time: "19:45",
    status: "FINISHED",
    competition: {
      id: "comp1",
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
    stadium: "Stamford Bridge",
    referee: "Anthony Taylor",
  },
  {
    id: "8",
    homeTeam: {
      id: "team15",
      name: "AC Milan",
      logo: "https://media.api-sports.io/football/teams/489.png",
      score: 3,
    },
    awayTeam: {
      id: "team16",
      name: "Roma",
      logo: "https://media.api-sports.io/football/teams/497.png",
      score: 1,
    },
    date: getDates().yesterday,
    time: "20:45",
    status: "FINISHED",
    competition: {
      id: "comp4",
      name: "Serie A",
      logo: "https://media.api-sports.io/football/leagues/135.png",
    },
    stadium: "San Siro",
    referee: "Marco Guida",
  },
  {
    id: "9",
    homeTeam: {
      id: "team17",
      name: "Atletico Madrid",
      logo: "https://media.api-sports.io/football/teams/530.png",
      score: 2,
    },
    awayTeam: {
      id: "team18",
      name: "Sevilla",
      logo: "https://media.api-sports.io/football/teams/536.png",
      score: 2,
    },
    date: getDates().yesterday,
    time: "21:00",
    status: "FINISHED",
    competition: {
      id: "comp2",
      name: "La Liga",
      logo: "https://media.api-sports.io/football/leagues/140.png",
    },
    stadium: "Wanda Metropolitano",
    referee: "Alejandro Hernandez",
  },
  // Tomorrow's matches
  {
    id: "10",
    homeTeam: {
      id: "team19",
      name: "PSG",
      logo: "https://media.api-sports.io/football/teams/85.png",
    },
    awayTeam: {
      id: "team20",
      name: "Monaco",
      logo: "https://media.api-sports.io/football/teams/91.png",
    },
    date: getDates().tomorrow,
    time: "20:00",
    status: "UPCOMING",
    competition: {
      id: "comp5",
      name: "Ligue 1",
      logo: "https://media.api-sports.io/football/leagues/61.png",
    },
    stadium: "Parc des Princes",
    referee: "Francois Letexier",
  },
  {
    id: "11",
    homeTeam: {
      id: "team21",
      name: "Napoli",
      logo: "https://media.api-sports.io/football/teams/492.png",
    },
    awayTeam: {
      id: "team22",
      name: "Lazio",
      logo: "https://media.api-sports.io/football/teams/487.png",
    },
    date: getDates().tomorrow,
    time: "20:45",
    status: "UPCOMING",
    competition: {
      id: "comp4",
      name: "Serie A",
      logo: "https://media.api-sports.io/football/leagues/135.png",
    },
    stadium: "Diego Armando Maradona",
    referee: "Daniele Doveri",
  },
  {
    id: "12",
    homeTeam: {
      id: "team23",
      name: "RB Leipzig",
      logo: "https://media.api-sports.io/football/teams/173.png",
    },
    awayTeam: {
      id: "team24",
      name: "Bayer Leverkusen",
      logo: "https://media.api-sports.io/football/teams/168.png",
    },
    date: getDates().tomorrow,
    time: "19:30",
    status: "UPCOMING",
    competition: {
      id: "comp3",
      name: "Bundesliga",
      logo: "https://media.api-sports.io/football/leagues/78.png",
    },
    stadium: "Red Bull Arena",
    referee: "Felix Zwayer",
  },
];

// Get matches for a specific date
export const getMatchesByDate = (date: string): Match[] => {
  return allMatches.filter(match => match.date === date);
};

// Get matches for yesterday, today, and tomorrow
export const getTodayMatches = (): Match[] => {
  return getMatchesByDate(getDates().today);
};

export const getYesterdayMatches = (): Match[] => {
  return getMatchesByDate(getDates().yesterday);
};

export const getTomorrowMatches = (): Match[] => {
  return getMatchesByDate(getDates().tomorrow);
};

export const getMatchById = (id: string): Match | undefined => {
  return allMatches.find(match => match.id === id);
};
