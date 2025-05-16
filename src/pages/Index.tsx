
import { useState } from "react";
import { MatchCard } from "@/components/MatchCard";
import { Navbar } from "@/components/Navbar";
import { MatchStatus } from "@/types/match";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { 
  useTodayMatches, 
  useYesterdayMatches, 
  useTomorrowMatches,
  getDates
} from "@/services/matchService";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const { 
    data: yesterdayMatches = [], 
    isLoading: yesterdayLoading, 
    error: yesterdayError 
  } = useYesterdayMatches();
  
  const { 
    data: todayMatches = [], 
    isLoading: todayLoading, 
    error: todayError 
  } = useTodayMatches();
  
  const { 
    data: tomorrowMatches = [], 
    isLoading: tomorrowLoading, 
    error: tomorrowError 
  } = useTomorrowMatches();
  
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

  // Loading skeletons for match cards
  const renderMatchSkeletons = (count: number) => (
    <div className="flex space-x-6 pb-4 px-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="min-w-[300px] sm:min-w-[350px]">
          <div className="border rounded-md overflow-hidden">
            <div className="h-12 bg-muted/30 px-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="w-8 h-6" />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="w-8 h-6" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

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
            {todayLoading ? (
              renderMatchSkeletons(4)
            ) : todayError ? (
              <div className="w-full text-center py-12">
                <h2 className="text-xl font-medium text-muted-foreground mb-4">
                  Failed to load today's matches
                </h2>
                <Button onClick={() => window.location.reload()}>Refresh</Button>
              </div>
            ) : filteredTodayMatches.length > 0 ? (
              <div className="flex space-x-6 pb-4 px-1">
                {filteredTodayMatches.map(match => (
                  <div key={match.id} className="min-w-[300px] sm:min-w-[350px]">
                    <MatchCard match={match} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full text-center py-12">
                <h2 className="text-xl font-medium text-muted-foreground">
                  No matches found for the selected filter
                </h2>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Yesterday's Matches */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{formatSectionTitle(dates.yesterday)}</h2>
          <ScrollArea className="w-full">
            {yesterdayLoading ? (
              renderMatchSkeletons(3)
            ) : yesterdayError ? (
              <div className="w-full text-center py-12">
                <h2 className="text-xl font-medium text-muted-foreground mb-4">
                  Failed to load yesterday's matches
                </h2>
                <Button onClick={() => window.location.reload()}>Refresh</Button>
              </div>
            ) : yesterdayMatches.length > 0 ? (
              <div className="flex space-x-6 pb-4 px-1">
                {yesterdayMatches.map(match => (
                  <div key={match.id} className="min-w-[300px] sm:min-w-[350px]">
                    <MatchCard match={match} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full text-center py-12">
                <h2 className="text-xl font-medium text-muted-foreground">
                  No matches found for yesterday
                </h2>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Tomorrow's Matches */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{formatSectionTitle(dates.tomorrow)}</h2>
          <ScrollArea className="w-full">
            {tomorrowLoading ? (
              renderMatchSkeletons(3)
            ) : tomorrowError ? (
              <div className="w-full text-center py-12">
                <h2 className="text-xl font-medium text-muted-foreground mb-4">
                  Failed to load tomorrow's matches
                </h2>
                <Button onClick={() => window.location.reload()}>Refresh</Button>
              </div>
            ) : tomorrowMatches.length > 0 ? (
              <div className="flex space-x-6 pb-4 px-1">
                {tomorrowMatches.map(match => (
                  <div key={match.id} className="min-w-[300px] sm:min-w-[350px]">
                    <MatchCard match={match} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full text-center py-12">
                <h2 className="text-xl font-medium text-muted-foreground">
                  No matches found for tomorrow
                </h2>
              </div>
            )}
          </ScrollArea>
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 FootballHub. All rights reserved.</p>
            <p className="mt-1">Data provided by API-Football.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
