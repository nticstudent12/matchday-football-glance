
import { useState } from "react";
import { 
  getTodayMatches, 
  getYesterdayMatches, 
  getTomorrowMatches,
  getDates
} from "@/services/matchService";
import { MatchCard } from "@/components/MatchCard";
import { Navbar } from "@/components/Navbar";
import { MatchStatus } from "@/types/match";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const yesterdayMatches = getYesterdayMatches();
  const todayMatches = getTodayMatches();
  const tomorrowMatches = getTomorrowMatches();
  const dates = getDates();
  
  const filteredTodayMatches = todayMatches.filter(match => {
    if (activeTab === "all") return true;
    return match.status === activeTab;
  });

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return dateObj.toLocaleDateString(undefined, options);
  };

  const formatSectionTitle = (date: string) => {
    const today = dates.today;
    const yesterday = dates.yesterday;
    const tomorrow = dates.tomorrow;

    if (date === today) return "Today";
    if (date === yesterday) return "Yesterday";
    if (date === tomorrow) return "Tomorrow";
    return formatDate(date);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Football Matches</h1>
          <p className="text-muted-foreground">
            {formatDate(dates.today)}
          </p>
        </div>

        {/* Today's Matches */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">{formatSectionTitle(dates.today)}</h2>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="hidden sm:block">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="LIVE">Live</TabsTrigger>
                <TabsTrigger value="UPCOMING">Upcoming</TabsTrigger>
                <TabsTrigger value="FINISHED">Finished</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Mobile tabs */}
          <div className="mb-4 sm:hidden">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="LIVE">Live</TabsTrigger>
                <TabsTrigger value="UPCOMING">Upcoming</TabsTrigger>
                <TabsTrigger value="FINISHED">Finished</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <ScrollArea className="w-full">
            <div className="flex space-x-6 pb-4 px-1">
              {filteredTodayMatches.length > 0 ? (
                filteredTodayMatches.map(match => (
                  <div key={match.id} className="min-w-[300px] sm:min-w-[350px]">
                    <MatchCard match={match} />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-12">
                  <h2 className="text-xl font-medium text-muted-foreground">
                    No matches found for the selected filter
                  </h2>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Yesterday's Matches */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{formatSectionTitle(dates.yesterday)}</h2>
          <ScrollArea className="w-full">
            <div className="flex space-x-6 pb-4 px-1">
              {yesterdayMatches.length > 0 ? (
                yesterdayMatches.map(match => (
                  <div key={match.id} className="min-w-[300px] sm:min-w-[350px]">
                    <MatchCard match={match} />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-12">
                  <h2 className="text-xl font-medium text-muted-foreground">
                    No matches found for yesterday
                  </h2>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Tomorrow's Matches */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{formatSectionTitle(dates.tomorrow)}</h2>
          <ScrollArea className="w-full">
            <div className="flex space-x-6 pb-4 px-1">
              {tomorrowMatches.length > 0 ? (
                tomorrowMatches.map(match => (
                  <div key={match.id} className="min-w-[300px] sm:min-w-[350px]">
                    <MatchCard match={match} />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-12">
                  <h2 className="text-xl font-medium text-muted-foreground">
                    No matches found for tomorrow
                  </h2>
                </div>
              )}
            </div>
          </ScrollArea>
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
