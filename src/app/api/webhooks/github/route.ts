import { reviewPullReuest } from "@/modules/ai/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = req.headers.get("x-github-event");
    if (event === "ping") {
      console.log("Received ping event from GitHub");
      return NextResponse.json({ message: "pong" }, { status: 200 });
    }

    if (event === "pull_request") {
      const action = body.action;
      const repo = body.repository.full_name;
      const prNumber = body.number;

      const [owner, repoName] = repo.split("/");

      if (action === "opened" || action === "synchronize") {
        reviewPullReuest(owner, repoName, prNumber)
          .then(() => console.log(`Review completed for ${repo} #${prNumber}`))
          .catch((error) =>
            console.log(`Review failed for ${repo} #${prNumber}:`, error),
          );
      }
    }

    //Todo
    return NextResponse.json({ message: "Event Processed" }, { status: 200 });
  } catch (error) {
    console.error("Error handling GitHub webhook:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
