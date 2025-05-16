
import { useParams, useNavigate } from "react-router-dom";
import { useMatchById } from "@/services/matchService";
import { MatchDetail } from "@/components/MatchDetail";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

export default function MatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: match, isLoading, error } = useMatchById(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <div className="mb-4">
            <Button variant="outline" onClick={() => navigate("/")} disabled>
              &larr; Back to matches
            </Button>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted py-8 px-4 flex flex-col items-center">
              <Skeleton className="w-24 h-6 mb-4" />
              <Skeleton className="w-40 h-5 mb-6" />
              
              <div className="flex items-center justify-center w-full mb-6">
                <div className="flex flex-col items-center mr-8">
                  <Skeleton className="w-20 h-20 rounded-full mb-2" />
                  <Skeleton className="w-24 h-5" />
                </div>
                <Skeleton className="w-16 h-8" />
                <div className="flex flex-col items-center ml-8">
                  <Skeleton className="w-20 h-20 rounded-full mb-2" />
                  <Skeleton className="w-24 h-5" />
                </div>
              </div>
              <Skeleton className="w-24 h-6" />
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <div className="mb-4">
            <Button variant="outline" onClick={() => navigate("/")}>
              &larr; Back to matches
            </Button>
          </div>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Match not found</h1>
            <p className="text-muted-foreground mb-6">
              {error ? "There was an error loading the match data." : "This match could not be found."}
            </p>
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
