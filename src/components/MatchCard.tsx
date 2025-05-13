
import { Match, MatchStatus } from "@/types/match";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

type MatchCardProps = {
  match: Match;
};

export function MatchCard({ match }: MatchCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/match/${match.id}`);
  };

  const renderStatus = (status: MatchStatus) => {
    switch (status) {
      case "LIVE":
        return <div className="match-status-live">LIVE</div>;
      case "UPCOMING":
        return <div className="match-status-upcoming">UPCOMING</div>;
      case "FINISHED":
        return <div className="match-status-finished">FINISHED</div>;
      default:
        return null;
    }
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="bg-gradient-to-r from-football-primary to-football-secondary py-2 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src={match.competition.logo} 
            alt={match.competition.name} 
            className="w-5 h-5"
          />
          <span className="text-white text-xs font-medium truncate">
            {match.competition.name}
          </span>
        </div>
        <div className="text-white text-xs">
          {match.date} • {match.time}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 relative">
                <img 
                  src={match.homeTeam.logo} 
                  alt={match.homeTeam.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-medium">{match.homeTeam.name}</span>
            </div>
            <div className="w-8 text-center font-semibold">
              {match.status !== "UPCOMING" && (
                <span>{match.homeTeam.score}</span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 relative">
                <img 
                  src={match.awayTeam.logo} 
                  alt={match.awayTeam.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-medium">{match.awayTeam.name}</span>
            </div>
            <div className="w-8 text-center font-semibold">
              {match.status !== "UPCOMING" && (
                <span>{match.awayTeam.score}</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {match.stadium}
            </div>
            <div>
              {renderStatus(match.status)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
