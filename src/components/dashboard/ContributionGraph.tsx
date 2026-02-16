"use client";
import { getContributionStats } from "@/modules/dashboard/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityCalendar } from "react-activity-calendar";

const ContributionGraph = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["contribution-stats"],
    queryFn: async () => await getContributionStats(),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="w-full flex flex-col justify-center items-center p-8">
        <div className="text-muted-foreground animate-pulse">
          Loading contribution data...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full flex flex-col justify-center items-center p-8">
        <div className="text-muted-foreground">
          No contribution data available.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <div className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">
                  {data.totalContributions}
              </span>{" "}
              contributions in the last year
          </div>
          <div className="w-full overflow-x-auto">
              <div className="flex justify-center min-w-max px-4">
                  <ActivityCalendar
                      data={data.contributions}
                      colorScheme="dark"
                      blockSize={10}
                      blockMargin={4}
                      fontSize={14}
                      showWeekdayLabels
                      showMonthLabels
                      theme={
                          {
                              light: ['hsl(0, 0%, 92%)', 'hsl(142, 71%, 45%)'],
                              dark: ['#161b22', 'hsl(142, 71%, 45%)']
                          }
                      }
                  />
              </div>
          </div>
    </div>
  );
};

export default ContributionGraph;
