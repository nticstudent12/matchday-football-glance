
import { useState } from "react";
import { getTodayMatches } from "@/services/matchService";
import { MatchCard } from "@/components/MatchCard";
import { Navbar } from "@/components/Navbar";
import { MatchStatus } from "@/types/match";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const matches = getTodayMatches();
  
  const filteredMatches = matches.filter(match => {
    if (activeTab === "all") return true;
    return match.status === activeTab;
  });

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Football Matches</h1>
          <p className="text-muted-foreground">
            {formatDate(new Date())}
          </p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="LIVE">Live</TabsTrigger>
            <TabsTrigger value="UPCOMING">Upcoming</TabsTrigger>
            <TabsTrigger value="FINISHED">Finished</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.length > 0 ? (
            filteredMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h2 className="text-xl font-medium text-muted-foreground">
                No matches found for the selected filter
              </h2>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 FootballHub. All rights reserved.</p>
            <p className="mt-1">Data provided for demo purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
