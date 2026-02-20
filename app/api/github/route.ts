import { NextResponse } from "next/server";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_USERNAME = "shahdivax"; // your github username

const CONTRIBUTIONS_QUERY = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return NextResponse.json(
            { error: "GitHub token not configured on server." },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "User-Agent": "portfolio-app",
            },
            body: JSON.stringify({ query: CONTRIBUTIONS_QUERY }),
            // Revalidate every 3 hours (10800 seconds)
            next: { revalidate: 10800 },
        });

        if (!response.ok) {
            throw new Error(`GitHub API responded with status ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
            throw new Error(data.errors[0]?.message || "GraphQL error");
        }

        const calendar =
            data?.data?.user?.contributionsCollection?.contributionCalendar;

        if (!calendar) {
            throw new Error("No contribution calendar found in response");
        }

        return NextResponse.json(calendar, {
            headers: {
                // Cache on edge for 3 hours
                "Cache-Control": "public, s-maxage=10800, stale-while-revalidate=3600",
            },
        });
    } catch (error: unknown) {
        console.error("[GitHub API] Error fetching contributions:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
