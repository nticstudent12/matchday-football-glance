
import { Navbar } from "@/components/Navbar";
import { useCompetitions } from "@/services/competitionService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

export default function Competitions() {
  const { data: competitions, isLoading, error } = useCompetitions();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Competitions</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !competitions || competitions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Competitions</h1>
          <p className="text-muted-foreground mb-6">
            {error 
              ? "There was an error loading competitions data. Please try again later." 
              : "No competitions data is available at this time."}
          </p>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Competitions</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {competitions.map((competition) => (
            <Card key={competition.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src={competition.logo} 
                    alt={competition.name} 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback if logo fails to load
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">{competition.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{competition.country}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <Trophy size={16} className="text-football-primary" />
                  <span>Season {competition.season}</span>
                </div>
                <Button variant="link" className="p-0 h-auto mt-2">
                  View details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
