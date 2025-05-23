
import { Navbar } from "@/components/Navbar";

export default function Competitions() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Competitions</h1>
        <p className="text-muted-foreground">
          Coming soon - Competitions will be available in a future update.
        </p>
      </div>
    </div>
  );
}
