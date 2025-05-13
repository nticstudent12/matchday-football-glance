
import { Match } from "@/types/match";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";

type MatchDetailProps = {
  match: Match;
};

export function MatchDetail({ match }: MatchDetailProps) {
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    if (match.status === "UPCOMING") {
      const calculateTimeLeft = () => {
        const matchDateTime = new Date(`${match.date}T${match.time}:00`);
        const now = new Date();
        const difference = matchDateTime.getTime() - now.getTime();

        if (difference <= 0) {
          return "Starting soon";
        }

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${hours}h ${minutes}m until kickoff`;
      };

      const timer = setTimeout(() => {
        setCountdown(calculateTimeLeft());
      }, 1000);

      setCountdown(calculateTimeLeft());
      return () => clearTimeout(timer);
    }
  }, [match, countdown]);

  const renderScore = () => {
    if (match.status === "UPCOMING") {
      return <div className="text-xl font-bold">VS</div>;
    }
    return (
      <div className="text-2xl font-bold">
        {match.homeTeam.score} - {match.awayTeam.score}
      </div>
    );
  };

  const renderStatus = () => {
    switch (match.status) {
      case "LIVE":
        return <div className="match-status-live">LIVE</div>;
      case "UPCOMING":
        return (
          <div className="match-status-upcoming flex flex-col items-center">
            <span>UPCOMING</span>
            <span className="text-xs font-normal mt-1">{countdown}</span>
          </div>
        );
      case "FINISHED":
        return <div className="match-status-finished">FINISHED</div>;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-football-primary to-football-accent py-6 flex flex-col items-center">
        <div className="flex items-center space-x-2 mb-2">
          <img 
            src={match.competition.logo} 
            alt={match.competition.name} 
            className="w-6 h-6"
          />
          <span className="text-white font-medium">
            {match.competition.name}
          </span>
        </div>
        <div className="text-white text-sm mb-4">
          {match.date} • {match.time}
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col items-center mr-8">
            <div className="w-20 h-20 bg-white rounded-full p-2 mb-2">
              <img 
                src={match.homeTeam.logo} 
                alt={match.homeTeam.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white font-medium text-center">
              {match.homeTeam.name}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-white">
            {renderScore()}
          </div>

          <div className="flex flex-col items-center ml-8">
            <div className="w-20 h-20 bg-white rounded-full p-2 mb-2">
              <img 
                src={match.awayTeam.logo} 
                alt={match.awayTeam.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white font-medium text-center">
              {match.awayTeam.name}
            </span>
          </div>
        </div>
        <div className="mt-4">
          {renderStatus()}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-2">Match Info</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Stadium:</span>
                <span className="text-sm font-medium">{match.stadium}</span>
              </div>
              {match.referee && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Referee:</span>
                  <span className="text-sm font-medium">{match.referee}</span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-2">Competition</h3>
            <div className="flex items-center space-x-2">
              <img 
                src={match.competition.logo} 
                alt={match.competition.name} 
                className="w-6 h-6"
              />
              <span className="text-sm font-medium">{match.competition.name}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
