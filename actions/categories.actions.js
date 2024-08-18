"use server";

import { Product } from "@models/Product";
import { Category } from "@models/Category";
import { DbConnect } from "@utils/dbConnect";

export async function createCategory(name, image) {
  await DbConnect();
  try {
    const newCategory = await Category.create({ name, image });
    await newCategory.save();
    return { response: "Category created successfully" };
  } catch (error) {
    return { message: "Error while creating category" + error };
  }
}

export async function getAllCategories() {
  await DbConnect();
  try {
    const categories = await Category.find().lean();
    return { response: categories };
  } catch (error) {
    return {
      message: "Error while fetching categories",
    };
  }
}

export async function deleteCategoryById(id) {
  await DbConnect();
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return { message: "Category not found" };
    }
    if (category.products.length > 0) {
      category.products.map((product) => {
        Product.findByIdAndUpdate(
          product,
          { $pull: { categories: id } },
          { new: true }
        ).exec();
      });
    }

    return { response: "Category deleted successfully" };
  } catch (error) {
    return { message: "Error while deleting category" + error };
  }
}

export async function getSingleCategory(id) {
  await DbConnect();
  try {
    const category = await Category.findById(id).populate('products').lean();
    if (!category) {
      return { message: "Category not found" };
    }
    return { response: category };
  } catch (error) {
    return { message: "Error while fetching category" + error };
  }
}


