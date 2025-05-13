
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-background border-b border-border flex items-center justify-between px-4 h-16 backdrop-blur-sm bg-opacity-90">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-football-primary rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a8.5 8.5 0 0 0-2 16.5" />
              <path d="M12 2a8.5 8.5 0 0 1 0 17" />
              <path d="M12 2v20" />
              <path d="m2 12 20 .5" />
              <path d="M5 6a9 9 0 0 0 14 0" />
              <path d="M5 18a9 9 0 0 1 14 0" />
            </svg>
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">FootballHub</span>
        </Link>
        <div className="hidden md:flex space-x-2">
          <Button variant="ghost" asChild>
            <Link to="/">Matches</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/competitions">Competitions</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/news">News</Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </nav>
  );
}
