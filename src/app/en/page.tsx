'use client';
import { gql, useSuspenseQuery } from "@apollo/client";
import { FoodPage, HomePage } from "@/__generated__/graphql";
import { useRouter } from "next/navigation";

const HOME = gql`
{
  HomePage(locale: en) {
    items {
      Title
      FoodArea {
        ContentLink {
          Expanded {
            ...on FoodPage {
              Name
              Image
              Description
              Types
              ContentLink {
                Url
              }
          }
        }
      }
    }
  }
  }
}
`

export default function Home() {
  const router = useRouter();
  const {data, error}  = useSuspenseQuery(HOME);
  if (error) return `Error! ${error.message}`

  const handleSearch = (event: any) => {
    if (event.key === "Enter") {
      router.push(`/en/search?q=${event.target.value}`)
    }
  };

  return (
    <main>
      <div className="mx-auto max-w-2xl mt-5">
        <div className="relative flex items-center">
          {/* <SearchInput /> */}
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Quick Search"
            onKeyUp={(e) => handleSearch(e)}
            className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
              👀
            </kbd>
          </div>
        </div>
      </div>
      {
        (data as any).HomePage.items.map((item: HomePage) => (
          <div key={item.Title} className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{item.Title}</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {item.FoodArea?.map((food) => (
                <div key={food?.ContentLink?.Expanded?.Name} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={`https://app-ocxcfoodindw21vqprod.cms.optimizely.com${(food?.ContentLink?.Expanded as FoodPage).Image}` || ""}
                      alt={food?.ContentLink?.Expanded?.Name || ""}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={(food?.ContentLink?.Expanded as FoodPage).ContentLink.Url || ""}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {food?.ContentLink?.Expanded?.Url || ""}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{(food?.ContentLink?.Expanded as FoodPage).Types.join(" & ") || ""}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{food?.ContentLink?.Expanded?.Name || ""}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      }
    </main>
  );
}
