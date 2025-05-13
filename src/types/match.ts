
export type Team = {
  id: string;
  name: string;
  logo: string;
  score?: number;
};

export type MatchStatus = "LIVE" | "UPCOMING" | "FINISHED";

export type Match = {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  status: MatchStatus;
  competition: {
    id: string;
    name: string;
    logo: string;
  };
  stadium: string;
  referee?: string;
};
