import getData from "@/services/products";
import Image from "next/image";
import Link from "next/link";

type DetailProductPageProps = { params: { slug: string } };

const DetailProductPage = async ({ params }: DetailProductPageProps) => {
  const products = await getData(`${process.env.NEXTAUTH_URL}/api/product`);
  console.log(products);

  if (!params.slug) {
    return (
      <div className="text-white">
        <h1>Product Page</h1>
        <div className="grid grid-cols-3">
          {products.data.map((product) => {
            return (
              <div key={product.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 my-6">
                <Link href={`/product/detail/${product.id}`}>
                  <Image width={500} height={500} className="p-8 w-full h-96 rounded-t-lg" src={product.image} alt="product image" />
                </Link>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                  </a>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">Rp.{product.price}</span>
                    <a
                      href="#"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const [category, gender, id] = params.slug;

  return (
    <div>
      <h1>Detail Product Page</h1>
      <h2>Category: {category}</h2>
      <h2>Gender: {gender}</h2>
      <h2>ID: {id}</h2>
    </div>
  );
};

export default DetailProductPage;
