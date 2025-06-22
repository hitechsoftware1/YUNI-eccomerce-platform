"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { recommendProducts } from "@/ai/flows/product-recommendations";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductRecommendations() {
  const [browsingHistory, setBrowsingHistory] = useState("Visited pages for 'smart watches', 'running shoes', and 'protein powder'.");
  const [searchQueries, setSearchQueries] = useState("best budget smartphone 2024, ergonomic office chair");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendations([]);
    try {
      const result = await recommendProducts({ browsingHistory, searchQueries });
      setRecommendations(result.recommendedProducts);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      toast({
        title: "Error",
        description: "Could not fetch recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Card className="bg-gradient-to-br from-primary/10 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Wand2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="font-headline">AI-Powered Recommendations</CardTitle>
              <CardDescription>
                Tell us what you've been looking at, and we'll find products you'll love.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="browsingHistory" className="font-medium">
                Your Browsing History
              </label>
              <Textarea
                id="browsingHistory"
                placeholder="e.g., Visited pages for 'laptops', 'coffee makers'..."
                value={browsingHistory}
                onChange={(e) => setBrowsingHistory(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="searchQueries" className="font-medium">
                Your Search Queries
              </label>
              <Textarea
                id="searchQueries"
                placeholder="e.g., 'best wireless headphones', 'men's summer fashion'..."
                value={searchQueries}
                onChange={(e) => setSearchQueries(e.target.value)}
                rows={4}
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Thinking..." : "Get Recommendations"}
                <Wand2 className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          {(isLoading || recommendations.length > 0) && (
            <div className="mt-6">
              <h4 className="font-headline text-lg font-semibold">Here's what we found for you:</h4>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {isLoading ? (
                  <>
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-5 w-2/3" />
                  </>
                ) : (
                  recommendations.map((product, index) => (
                    <li key={index} className="text-foreground/80">{product}</li>
                  ))
                )}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
