/* eslint-disable @typescript-eslint/no-explicit-any */
import getData from "@/services/products";
import Image from "next/image";

export default async function DetailProductPage(props: any) {
  const { params } = props;
  const { data } = await getData(`${process.env.NEXTAUTH_URL}/api/product/?id=${params.id}`);

  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700">
        <Image width={500} height={500} src={data.image} alt="" className="w-full h-96 object-cover aspect-square col-span-2" />
        <div className="bg-white p-4 px-6 text-black">
          <h3>{data.title}</h3>
          <h3>Harga : {data.price}</h3>
        </div>
      </div>
    </div>
  );
}
