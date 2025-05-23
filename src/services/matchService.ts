
import { Match, MatchStatus, Team } from "../types/match";

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

// Teams data with their respective leagues
const teams = {
  premierLeague: [
    { id: "team1", name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png" },
    { id: "team2", name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" },
    { id: "team7", name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" },
    { id: "team8", name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png" },
    { id: "team13", name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png" },
    { id: "team14", name: "Tottenham", logo: "https://media.api-sports.io/football/teams/47.png" }
  ],
  laLiga: [
    { id: "team3", name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" },
    { id: "team4", name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" },
    { id: "team17", name: "Atletico Madrid", logo: "https://media.api-sports.io/football/teams/530.png" },
    { id: "team18", name: "Sevilla", logo: "https://media.api-sports.io/football/teams/536.png" }
  ],
  bundesliga: [
    { id: "team5", name: "Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png" },
    { id: "team6", name: "Borussia Dortmund", logo: "https://media.api-sports.io/football/teams/165.png" }
  ],
  serieA: [
    { id: "team9", name: "Juventus", logo: "https://media.api-sports.io/football/teams/496.png" },
    { id: "team10", name: "Inter Milan", logo: "https://media.api-sports.io/football/teams/505.png" },
    { id: "team15", name: "AC Milan", logo: "https://media.api-sports.io/football/teams/489.png" },
    { id: "team16", name: "Roma", logo: "https://media.api-sports.io/football/teams/497.png" },
    { id: "team20", name: "Napoli", logo: "https://media.api-sports.io/football/teams/492.png" }
  ],
  ligue1: [
    { id: "team11", name: "PSG", logo: "https://media.api-sports.io/football/teams/85.png" },
    { id: "team12", name: "Lyon", logo: "https://media.api-sports.io/football/teams/80.png" },
    { id: "team19", name: "Monaco", logo: "https://media.api-sports.io/football/teams/91.png" }
  ]
};

// Competitions data
const competitions = [
  { id: "comp1", name: "Premier League", logo: "https://media.api-sports.io/football/leagues/39.png" },
  { id: "comp2", name: "La Liga", logo: "https://media.api-sports.io/football/leagues/140.png" },
  { id: "comp3", name: "Bundesliga", logo: "https://media.api-sports.io/football/leagues/78.png" },
  { id: "comp4", name: "Serie A", logo: "https://media.api-sports.io/football/leagues/135.png" },
  { id: "comp5", name: "Ligue 1", logo: "https://media.api-sports.io/football/leagues/61.png" },
  { id: "comp6", name: "Champions League", logo: "https://media.api-sports.io/football/leagues/2.png" }
];

// Stadiums data
const stadiums = [
  "Old Trafford", "Camp Nou", "Allianz Arena", "Anfield", 
  "Allianz Stadium", "Parc des Princes", "Stamford Bridge", 
  "San Siro", "Wanda Metropolitano", "Santiago Bernabéu",
  "Emirates Stadium", "Etihad Stadium", "Signal Iduna Park",
  "Stadio Olimpico", "Diego Armando Maradona", "Red Bull Arena"
];

// Referees data
const referees = [
  "Michael Oliver", "Anthony Taylor", "Felix Brych", 
  "Daniele Orsato", "Clément Turpin", "Mateu Lahoz",
  "Felix Zwayer", "Marco Guida", "Alejandro Hernandez",
  "Francois Letexier", "Daniele Doveri"
];

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Function to get random time (in HH:MM format) within a certain range
function getRandomTime(startHour: number, endHour: number): string {
  const hour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
  // Choose minutes from common football start times (00, 15, 30, 45)
  const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Function to determine match status based on time
function determineMatchStatus(matchTimeStr: string, date: string): {status: MatchStatus, homeScore?: number, awayScore?: number} {
  const now = new Date();
  const today = getFormattedDate(now);
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  
  const [hours, minutes] = matchTimeStr.split(':').map(Number);
  
  // If match is tomorrow, it's always upcoming
  if (date > today) {
    return { status: "UPCOMING" };
  }
  
  // If match is yesterday, it's always finished
  if (date < today) {
    return { 
      status: "FINISHED",
      homeScore: Math.floor(Math.random() * 5),
      awayScore: Math.floor(Math.random() * 5)
    };
  }
  
  // For today's matches
  const matchTimeInMinutes = hours * 60 + minutes;
  const currentTimeInMinutes = currentHour * 60 + currentMinutes;
  
  // If current time is 2 hours past match start time, match is finished
  if (currentTimeInMinutes > matchTimeInMinutes + 120) {
    return { 
      status: "FINISHED",
      homeScore: Math.floor(Math.random() * 5),
      awayScore: Math.floor(Math.random() * 5)
    };
  }
  
  // If current time is within 2 hours of match start time, match is live
  if (currentTimeInMinutes >= matchTimeInMinutes && currentTimeInMinutes <= matchTimeInMinutes + 120) {
    return { 
      status: "LIVE",
      homeScore: Math.floor(Math.random() * 4),
      awayScore: Math.floor(Math.random() * 4)
    };
  }
  
  // Otherwise, match is upcoming
  return { status: "UPCOMING" };
}

// Function to create league matches (teams from same league)
function createLeagueMatches(leagueTeams: any[], competitionId: string, date: string, count: number): Match[] {
  const shuffledTeams = shuffleArray([...leagueTeams]);
  const matches: Match[] = [];
  const competition = competitions.find(comp => comp.id === competitionId)!;
  const shuffledStadiums = shuffleArray([...stadiums]);
  const shuffledReferees = shuffleArray([...referees]);

  // Make sure we have enough teams for the requested matches
  const maxPossibleMatches = Math.floor(shuffledTeams.length / 2);
  const matchesToCreate = Math.min(count, maxPossibleMatches);
  
  for (let i = 0; i < matchesToCreate; i++) {
    const homeTeamIndex = i * 2;
    const awayTeamIndex = i * 2 + 1;
    
    // Get random stadium and referee
    const stadium = shuffledStadiums[i % shuffledStadiums.length];
    const referee = shuffledReferees[i % shuffledReferees.length];
    
    // Get suitable match time
    let matchTime = getRandomTime(12, 21);
    
    // Determine match status and scores
    const { status, homeScore, awayScore } = determineMatchStatus(matchTime, date);
    
    // Create team objects
    const homeTeam: Team = { ...shuffledTeams[homeTeamIndex] };
    const awayTeam: Team = { ...shuffledTeams[awayTeamIndex] };
    
    // Add scores if applicable
    if (homeScore !== undefined) {
      homeTeam.score = homeScore;
    }
    
    if (awayScore !== undefined) {
      awayTeam.score = awayScore;
    }
    
    matches.push({
      id: `${date}-${competitionId}-${i + 1}`,
      homeTeam,
      awayTeam,
      date,
      time: matchTime,
      status,
      competition,
      stadium,
      referee
    });
  }
  
  return matches;
}

// Function to create Champions League matches (teams from different leagues)
function createChampionsLeagueMatches(date: string, count: number): Match[] {
  // Get all teams across leagues
  const allTeams = [
    ...teams.premierLeague,
    ...teams.laLiga,
    ...teams.bundesliga,
    ...teams.serieA,
    ...teams.ligue1
  ];
  
  const shuffledTeams = shuffleArray([...allTeams]);
  const matches: Match[] = [];
  const competition = competitions.find(comp => comp.id === "comp6")!;
  const shuffledStadiums = shuffleArray([...stadiums]);
  const shuffledReferees = shuffleArray([...referees]);

  // Make sure we have enough teams for the requested matches
  const maxPossibleMatches = Math.floor(shuffledTeams.length / 2);
  const matchesToCreate = Math.min(count, maxPossibleMatches);
  
  for (let i = 0; i < matchesToCreate; i++) {
    const homeTeamIndex = i * 2;
    const awayTeamIndex = i * 2 + 1;
    
    // Get random stadium and referee
    const stadium = shuffledStadiums[i % shuffledStadiums.length];
    const referee = shuffledReferees[i % shuffledReferees.length];
    
    // Get suitable match time
    let matchTime = getRandomTime(12, 21);
    
    // Determine match status and scores
    const { status, homeScore, awayScore } = determineMatchStatus(matchTime, date);
    
    // Create team objects
    const homeTeam: Team = { ...shuffledTeams[homeTeamIndex] };
    const awayTeam: Team = { ...shuffledTeams[awayTeamIndex] };
    
    // Add scores if applicable
    if (homeScore !== undefined) {
      homeTeam.score = homeScore;
    }
    
    if (awayScore !== undefined) {
      awayTeam.score = awayScore;
    }
    
    matches.push({
      id: `${date}-CL-${i + 1}`,
      homeTeam,
      awayTeam,
      date,
      time: matchTime,
      status,
      competition,
      stadium,
      referee
    });
  }
  
  return matches;
}

// Generate all matches data dynamically
let allMatches: Match[];

function generateAllMatches(): Match[] {
  const dates = getDates();
  let matches: Match[] = [];
  
  // Yesterday matches
  matches = matches.concat(
    createLeagueMatches(teams.premierLeague, "comp1", dates.yesterday, 1),
    createLeagueMatches(teams.laLiga, "comp2", dates.yesterday, 1),
    createLeagueMatches(teams.serieA, "comp4", dates.yesterday, 1),
    createChampionsLeagueMatches(dates.yesterday, 2)
  );
  
  // Today matches
  matches = matches.concat(
    createLeagueMatches(teams.premierLeague, "comp1", dates.today, 2),
    createLeagueMatches(teams.bundesliga, "comp3", dates.today, 1),
    createLeagueMatches(teams.ligue1, "comp5", dates.today, 1),
    createChampionsLeagueMatches(dates.today, 2)
  );
  
  // Tomorrow matches
  matches = matches.concat(
    createLeagueMatches(teams.laLiga, "comp2", dates.tomorrow, 1),
    createLeagueMatches(teams.serieA, "comp4", dates.tomorrow, 1),
    createLeagueMatches(teams.bundesliga, "comp3", dates.tomorrow, 1),
    createChampionsLeagueMatches(dates.tomorrow, 1)
  );
  
  // Sort matches by time
  return matches.sort((a, b) => {
    // First sort by date
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    
    // Then sort by time
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    
    if (timeA[0] !== timeB[0]) {
      return timeA[0] - timeB[0];
    }
    return timeA[1] - timeB[1];
  });
}

// Initialize matches
allMatches = generateAllMatches();

// Function to regenerate matches data
export const refreshMatchData = (): void => {
  allMatches = generateAllMatches();
};

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

