import DetailFoodComponent from "@/components/food";

export default async function DetailFoodPage({ params }: { params: { slug: string } }) {
    return <DetailFoodComponent slug={params.slug} locale="de" />
}