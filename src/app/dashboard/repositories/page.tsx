"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ExternalLink, Star, Search } from "lucide-react";
import { useRepositories } from "@/modules/repositories/hooks/useRepositories";
import { RepositoryListSkeleton } from "@/components/repositories/RepositoryListSkeleton";
import { useConnectRepositories } from "@/modules/repositories/hooks/useConnectRepositories";

// interface Repository {
//   id: number;
//   name: string;
//   description: string | null;
//   full_name: string;
//   html_url: string;
//   stargazers_count: number;
//   language: string | null;
//   topics: string[];
//   isConnected: boolean;
// }

const RepositoryPage = () => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    } = useRepositories();
    
    const {mutate : connectRepo} = useConnectRepositories()


  const [searchQuery, setSearchQuery] = useState("");
    const [localConnectingId, setLocalConnectingId] = useState<number|null>(null);
    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            {
                threshold:0.1
            }
        )
        
        const currentTarget = observerTarget.current
        if (currentTarget) {
            observer.observe(currentTarget)
        }
    
      return () => {
        if (currentTarget) {
            observer.unobserve(currentTarget)
        }
      }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])
    
    if (isLoading) {
         return (<div className="space-y-4 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Repositories</h1>
        <p className="text-muted-foreground">
          Manage and View all your github repositories
        </p>
             </div>
             <RepositoryListSkeleton />
      </div>)
    }

    if (isError) {
        return (
            <div className="space-y-4 w-full">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Repositories</h1>
                    <p className="text-muted-foreground">   
                        Manage and View all your github repositories
                    </p>
                </div>  
                <p className=" text-center text-muted-foreground">Failed to load repositories. Please try again.</p>
            </div>
        )
    }

  const allRepositories = data?.pages.flatMap((page) => page) || [];
  const filteredRepositories = allRepositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.full_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

    const handleConnect = (repo: typeof filteredRepositories[0]) => {
        setLocalConnectingId(repo.id)
        connectRepo({
            owner: repo.full_name.split("/")[0],
            repo: repo.name,
            githubId: repo.id
        },
            {
            onSettled: () => setLocalConnectingId(null)
        }
        )
    };
    
  return (
    <div className="space-y-4 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Repositories</h1>
        <p className="text-muted-foreground">
          Manage and View all your github repositories
        </p>
      </div>
      <div className="relative w-full">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search Repositories"
          className="pl-8 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filteredRepositories.map((repo) => {
          return (
            <Card key={repo.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{repo.name}</CardTitle>
                      <Badge variant="outline">
                        {repo.language || "Unknown"}
                      </Badge>
                      {repo.isConnected && (
                        <Badge variant="secondary">Connected</Badge>
                      )}
                    </div>
                    <CardDescription>{repo.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      onClick={() => handleConnect(repo)}
                      disabled={
                        localConnectingId === repo.id || repo.isConnected
                      }
                      variant={repo.isConnected ? "outline" : "default"}
                    >
                      {localConnectingId === repo.id
                        ? "Connecting..."
                        : repo.isConnected
                          ? "Connected"
                          : "Connect"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  {repo.stargazers_count}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div ref={observerTarget} className="py-4">
        {isFetchingNextPage && <RepositoryListSkeleton />}
              {!hasNextPage && allRepositories.length > 0 && (
                  <p className="text-center text-muted-foreground">No More Repositories</p>
        )}
      </div>
    </div>
  );
};

export default RepositoryPage;
