"use server";

import { Category } from "@models/Category";
import { Product } from "@models/Product";
import { DbConnect } from "@utils/dbConnect";

export async function createProduct(
  name,
  price,
  description,
  images,
  quantity,
  category
) {
  await DbConnect();

  const newProduct = new Product({
    name,
    price,
    description,
    images,
    quantity,
    category,
  });

  const categoryM = await Category.findById(category);
  if (categoryM) {
    categoryM?.products?.push(newProduct._id);
    await categoryM.save();
  }

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
    const product = await Product.findById(id);
    if (!product) {
      return { message: "Product not found" };
    }

    const category = await Category.findById(product.category);
    if (category) {
      category.products = category.products.filter(
        (productId) => !productId.equals(product._id)
      );
      await category.save();
    }
    await Product.findByIdAndDelete(id);
    return { response: "Product deleted successfully" };
  } catch (error) {
    return { message: "Error while deleting product" };
  }
}

export async function updateProduct(id, updates) {
  await DbConnect();
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    }).lean();
    if (!updatedProduct) {
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
    const product = await Product.findById(id)
      .populate("category", "name")
      .lean();
    if (!product) {
      return { message: "Product not found" };
    }
    return { response: product };
  } catch (e) {
    return { message: "Error while fetching product" };
  }
}
