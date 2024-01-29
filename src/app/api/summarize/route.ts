import { sleep } from "@/lib/util";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic'

type SummaryResult = {
    id: string;
    success: {
        result: string;
    },
    status: string;
}

const endpoint = "https://cg.optimizely.com/ai/api/summarize";
const aiSingleKey = `epi-single ${process.env.OPTI_AI_KEY}`;

async function fetchFromEndpoint(url: string, method: string, body?: any) {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Turnstile-Version': '2',
            'Authorization': aiSingleKey
        },
        body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const question = searchParams.get('q');
    const locale = searchParams.get('l');
    const summaryArgs = {
        "haystack": {
            "query": `query findFoodAI($search: String) {   FoodPage(limit: 5, locale: ${locale}, where: {     _or: [       {         Name: {           match: $search           boost: 5         }       },       {         _fulltext: {           match: $search          }       },     ]   }, orderBy: {     _ranking: SEMANTIC   }) {     items {       Name       Types       Image       ContentLink {         Url       }       Description       _score     }     facets {       Types {         name         count       }     }     total   } }`,
            "single_key": `${process.env.OPTI_GRAPH_KEY}`,
            "source_type": "optimizely-graph"
        },
        "needle": `${question}`,
        "method": "search"
    };

    const { id } = await fetchFromEndpoint(endpoint, 'POST', summaryArgs);

    let data: SummaryResult = {
        id: "",
        success: {
            result: ""
        },
        status: "running"
    };

    while (data.status === "running") {
        await sleep(1000);
        data = await fetchFromEndpoint(`${endpoint}/${id}`, 'GET') as SummaryResult;
    }

    return Response.json(data.success.result);
}