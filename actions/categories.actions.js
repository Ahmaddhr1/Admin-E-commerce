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
    const category = await Category.findById(id);
    if (!category) {
      return { message: "Category not found" };
    }

    // Delete all products linked to the category
    if (category.products.length > 0) {
      await Product.deleteMany({ _id: { $in: category.products } });
    }

    // Delete the category
    await Category.deleteOne({ _id: id });

    return { response: "Category and associated products deleted successfully" };
  } catch (error) {
    console.error("Error while deleting category:", error); // For debugging purposes
    return { message: "Error while deleting category: " + error.message };
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

export async function updateCategory(id,updates) {
  await DbConnect();
  try {
    const category = await Category.findByIdAndUpdate(id , updates);
    if (!category) {
      return { message: "Category not found" };
    }
    return {
      response: "Category updated successfully"
    }
  } catch (e) {
    return {
      message: "Error while updating category"
    }
  }
}


