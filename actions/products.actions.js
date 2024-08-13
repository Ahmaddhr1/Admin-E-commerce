"use server";

import { Product } from "@models/Product";
import { DbConnect } from "@utils/dbConnect";

export async function createProduct(
  name,
  price,
  description,
  images,
  quantity
) {
  await DbConnect();

  const newProduct = new Product({
    name,
    price,
    description,
    images,
    quantity,
  });

  return newProduct
    .save()
    .then(() => ({ response: "Product created successfully" }))
    .catch(() => ({ message: "Error while creating product" }));
}

export async function fetchProducts() {
  try {
    await DbConnect();

    const products = await Product.find({}).lean();
    return { response: products }; // Return plain objects
  } catch (error) {
    return { message: "Error while fetching Products!" };
  }
}

