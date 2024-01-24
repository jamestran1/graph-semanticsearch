import { getClient } from "@/lib/client";
import { gql } from "@apollo/client"

const foodPageQuery = gql`
query DetailQuery($slug: String) {
  FoodPage(where: {
    ContentLink: {
      Url: {
        endsWith: $slug
      }
    }
  }) {
    items {
      Name
      Types
      Image
      ContentLink {
        Url
      }
      Description
    }
  }
}
`

export default async function DetailFoodPage({ params }: { params: { slug: string } }) {
    const { data, loading, error } = await getClient().query({ query: foodPageQuery, variables: { slug: params.slug + "/" } });
    if (loading) return <div>Loading...</div>
    if (error) return `Error! ${error.message}`
    const foodPage = data.FoodPage.items[0]
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    <div className="flex flex-col-reverse">

                        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <div className="grid grid-cols-4 gap-6">
                                <div className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4">
                                    <>
                                        <span className="sr-only">{foodPage.Name}</span>
                                        <span className="absolute inset-0 overflow-hidden rounded-md">
                                            <img src={`https://app-ocxcfoodindw21vqprod.cms.optimizely.com${foodPage.Image}`} alt="" className="h-full w-full object-cover object-center" />
                                        </span>
                                        <span
                                            className='ring-indigo-500 pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                            aria-hidden="true"
                                        />
                                    </>
                                </div>
                            </div>
                        </div>
                        <div className="aspect-h-1 aspect-w-1 w-full">
                            <img
                                src={`https://app-ocxcfoodindw21vqprod.cms.optimizely.com${foodPage.Image}`}
                                alt={foodPage.Name}
                                className="h-full w-full object-cover object-center sm:rounded-lg"
                            />
                        </div>
                    </div>
                    {/* Product info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{foodPage.Name}</h1>
                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <div
                                className="space-y-6 text-base text-gray-700"
                                dangerouslySetInnerHTML={{ __html: foodPage.Description }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}