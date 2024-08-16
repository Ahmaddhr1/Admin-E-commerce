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
    return { response: products };
  } catch (error) {
    return { message: "Error while fetching Products!" };
  }
}

export async function deleteProductById(id) {
  await DbConnect();
  try {
    await Product.findByIdAndDelete(id);
    return { response: "Product deleted successfully" };
  } catch (error) {
    return { message: "Error while deleting product" };
  }
}

export async function updateProduct(id, updates) {
  await DbConnect();
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true }).lean();
    if(!updatedProduct) {
      return { message: "Product not found" };
    }
    return { response: "Product updated sucessfully" };
  } catch (error) {
    return { message: "Error while updating product" };
  }
}

export async function fetchSingleProduct(id) {
  try {
    await DbConnect();
    const product = await Product.findById(id).lean();
    if(!product) {
      return { message: "Product not found" };
    }
    return { response: product };
  }catch(e) {
    return { message: "Error while fetching product" };
  }
 

}
