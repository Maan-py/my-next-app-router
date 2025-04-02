import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

// const data = [
//   {
//     id: 1,
//     title: "Sepatu Baru",
//     price: 1000000,
//     image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0d641577-64b4-4963-92d5-2054a2f6de58/AIR+MAX+DN8+AMD.png",
//   },
//   {
//     id: 2,
//     title: "Sepatu Adidas",
//     price: 10000002,
//     image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d130fcfa-7169-4172-8955-bf39cc544527/NIKE+VOMERO+18.png",
//   },
//   {
//     id: 3,
//     title: "Nike Dunk Low",
//     price: 1909000,
//     image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4eae23a9-b240-4a53-98c7-d5502fe3f7dc/NIKE+DUNK+LOW+NN.png",
//   },
// ];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    // const detailProduct = data.find((item) => item.id === Number(id));
    const detailProduct = await retrieveDataById("products", id);

    if (detailProduct) {
      return NextResponse.json({
        status: 200,
        message: "success",
        data: detailProduct,
      });
    }
    return NextResponse.json({
      status: 404,
      message: "Not found",
      data: {},
    });
  }

  const products = await retrieveData("products");

  return NextResponse.json({
    status: 200,
    message: "success",
    data: products,
  });
}
