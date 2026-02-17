import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) { 
    try {
        const body = await req.json();
        const event = req.headers.get("x-github-event")
        if (event === "ping") {
            console.log("Received ping event from GitHub");
            return NextResponse.json({message:"pong"},{status:200})
        }

        //Todo 
            return NextResponse.json({message:"Event Processed"},{status:200})

        
    } catch (error) {
        console.error("Error handling GitHub webhook:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}