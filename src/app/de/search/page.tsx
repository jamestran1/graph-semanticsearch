'use client'
import { Suspense, useEffect, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { FoodPage } from '@/__generated__/graphql';
import { useSearchParams } from 'next/navigation';

type SummaryResult = {
    id: string;
    success: {
        result: string;
    },
    status: string;
}

interface FoodProps {
    search: string;

}

const FIRST_VALUE = "___first_value___";

const searchQuery = gql`
    query findFoodAI($search: String, $locale: [Locales]) {
    FoodPage(limit: 5, locale: $locale, where: {
        _or: [
        {
            Name: {
            match: $search
            boost: 5
            }
        },
        {
            _fulltext: {
            match: $search 
            }
        },
        ]
    }, orderBy: {
        _ranking: SEMANTIC
    }) {
        items {
        Name
        Types
        Image
        ContentLink {
            Url
        }
        Description
        _score
        }
        facets {
        Types {
            name
            count
        }
        }
        total
    }
    }
`

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function summarize(question: string) {
    const endpoint = "https://cg.optimizely.com/ai/api/summarize";
    const aiSingleKey = "epi-single tFTCBoAPzxkpnVJmbjVfLSAqnMySsr5QZ5csXCIEYcmqNAhA";
    const summaryArgs = {
        "haystack": {
            "query": "query findFoodAI($search: String) {   FoodPage(limit: 5, locale: [de], where: {     _or: [       {         Name: {           match: $search           boost: 5         }       },       {         _fulltext: {           match: $search          }       },     ]   }, orderBy: {     _ranking: SEMANTIC   }) {     items {       Name       Types       Image       ContentLink {         Url       }       Description       _score     }     facets {       Types {         name         count       }     }     total   } }",
            "single_key": "FN2KsYsUIKkqahBfJOiILcRUykgXoY0VFomMgVHjM1IMiSyg",
            "source_type": "optimizely-graph"
        },
        "needle": `${question}`,
        "method": "search"
    };
    const summaryResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Turnstile-Version': '2',
            'Authorization': aiSingleKey
        },
        body: JSON.stringify(summaryArgs)
    });
    const { id } = await summaryResponse.json();
    let data: SummaryResult = {
        id: "",
        success: {
            result: ""
        },
        status: "running"
    };
    while (data.status === "running") {
        await sleep(1000);
        const summaryResult = await fetch(`${endpoint}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Turnstile-Version': '2',
                'Authorization': aiSingleKey
            }
        });
        data = await summaryResult.json() as SummaryResult;
    }

    return data.success.result;
}

function FoodQuery({ search }: FoodProps) {
    const { data, error } = useSuspenseQuery(searchQuery, { variables: { search: search, locale: ["de"] } });
    if (search === FIRST_VALUE || search === "") return <div></div>;
    if (error) return <div></div>
    const response = data as any
    return (
        <ul
            role="list"
            className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
        >
            {response.FoodPage?.items?.map((foodPage: FoodPage) => (
                <li key={foodPage.Name} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                    <div className="flex min-w-0 gap-x-4">
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`https://app-ocxcfoodindw21vqprod.cms.optimizely.com${foodPage.Image}`} alt="" />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                <a href={foodPage.ContentLink.Url}>
                                    <span className="absolute inset-x-0 -top-px bottom-0" />
                                    {foodPage.Name}
                                </a>
                            </p>
                            <div className="mt-1 flex text-xs leading-5 text-gray-500 text-wrap" dangerouslySetInnerHTML={{ __html: foodPage.Description }}>
                            </div>
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-4">
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{foodPage.Types.join(' & ')}</p>
                        </div>
                        <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default function Search() {
    const searchParams = useSearchParams();
    const search = searchParams.get('q')
    const [question, setQuestion] = useState(search || FIRST_VALUE);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (search !== "" && search != FIRST_VALUE) {
            setQuestion(search);
            setIsLoading(true);
            summarize(search).then((result) => {
                setMessage(result);
                setIsLoading(false);
            });

        }
    }, [])



    const handleSearch = async (event: any) => {
        if (event.code === "Enter") {
            setIsLoading(true);
            setMessage(await summarize(question));
            setIsLoading(false)
        }
    };
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl p-5">
                <div className="relative mt-2 flex items-cente">
                    {/* <SearchInput /> */}
                    <input
                        type="text"
                        name="search"
                        id="search"
                        onKeyUp={(e) => handleSearch(e)}
                        onChange={(e) => setQuestion(e.target.value)}
                        value={question === FIRST_VALUE ? "" : question ?? ""}
                        className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                        <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                            👀
                        </kbd>
                    </div>
                </div>
            </div>
            <div>
                <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="border-b border-gray-200 pb-10">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Suchergebnis: {question !== FIRST_VALUE ? question : ""}</h1>
                        <div className={classNames(isLoading ? 'visible' : 'invisible', 'border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600')} />
                        <p className={classNames(!isLoading ? 'visible' : 'invisible', 'text-base text-gray-500')}>
                            {message}
                        </p>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <FoodQuery search={question} />
                    </Suspense>
                </main>
            </div>
        </div>
    )
}