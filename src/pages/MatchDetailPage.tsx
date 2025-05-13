
import { useParams, useNavigate } from "react-router-dom";
import { getMatchById } from "@/services/matchService";
import { MatchDetail } from "@/components/MatchDetail";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Match } from "@/types/match";
import { Navbar } from "@/components/Navbar";

export default function MatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const matchData = getMatchById(id);
      if (matchData) {
        setMatch(matchData);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-football-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Match not found</h1>
            <Button onClick={() => navigate("/")}>Back to matches</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="mb-4">
          <Button variant="outline" onClick={() => navigate("/")}>
            &larr; Back to matches
          </Button>
        </div>
        <MatchDetail match={match} />
      </div>
    </div>
  );
}
