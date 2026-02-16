"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import { getRepositories } from "@/modules/github/lib/github";


export const fetchRepositories = async (page:number , perPage:number) => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    const githubRepos = await getRepositories(page, perPage)
    const dbRepos = await prisma.repository.findMany({
        where: {
            userId: session.user.id
        }
    })

    const connectedRepoIds = new Set(dbRepos.map((repo) => repo.githubId))
    
    return githubRepos.map((repo) => ({
        ...repo, isConnected: connectedRepoIds.has(BigInt(repo.id)) 
    }))

}