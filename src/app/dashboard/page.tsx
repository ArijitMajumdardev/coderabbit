"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  getMonthlyActivity,
} from "@/modules/dashboard/actions";
import {
  GitCommit,
  GitPullRequest,
  MessageSquare,
  BookOpen,
  Car,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ContributionGraph from "@/components/dashboard/ContributionGraph";
import { Spinner } from "@/components/ui/spinner";
import {ResponsiveContainer, BarChart, XAxis, YAxis,CartesianGrid, Tooltip, Legend, Bar} from "recharts";

const statCards = [
  {
    key: "TotalRepos" as const,
    title: "Total Repos",
    icon: BookOpen,
  },
  {
    key: "totalCommits" as const,
    title: "Total Commits",
    icon: GitCommit,
  },
  {
    key: "totalPRs" as const,
    title: "Total PRs",
    icon: GitPullRequest,
  },
  {
    key: "TotalReviews" as const,
    title: "Total Reviews",
    icon: MessageSquare,
  },
];

const MainPage = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => await getDashboardStats(),
    refetchOnWindowFocus: false,
  });
  const { data: monthlyActivity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["monthly-activity"],
    queryFn: async () => await getMonthlyActivity(),
    refetchOnWindowFocus: false,
  });


  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your coding activity and AI reviews
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.key} className="w-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <p className="text-3xl font-bold">
                  {stats?.[card.key]?.toLocaleString() ?? 0}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contribution Activity </CardTitle>
          <CardDescription>Viszualizing your coding frequency over the last year</CardDescription>
        </CardHeader>
        <CardContent>
          <ContributionGraph/>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Monthly breakdown of commits, PRs and reviews (last 6 months)</CardDescription>
          </CardHeader>
          
          <CardContent>
            {
              isLoadingActivity ? (
                <div className="h-80 w-full flex justify-center items-center">
                  <Spinner />
              </div>
              ) : (
                  <div className="h-80 w-full">
                    <ResponsiveContainer width={"100%"} height={"100%"}>
                      <BarChart data={monthlyActivity || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--background)', borderColor: 'var(--border)'
                          }}
                          
                          itemStyle={{color: 'var(--foreground)'}}
                        />

                        <Legend />
                        <Bar dataKey="commits" name="Commits" fill="#3b82f6" radius={[4,4,0,0]} />
                        <Bar dataKey="prs" name="Pull Reuests" fill="#8b5cf6" radius={[4,4,0,0]} />
                        <Bar dataKey="reviews" name="AI reviews" fill="#10b981" radius={[4,4,0,0]} />

                      </BarChart>

                    </ResponsiveContainer>
                  </div>

              )
            }
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default MainPage;
