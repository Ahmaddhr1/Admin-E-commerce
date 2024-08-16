"use server";

// import { Product } from "@models/Product";
import { Category } from "@models/Category";
import { DbConnect } from "@utils/dbConnect";

export async function createCategory (name, image) {
  await DbConnect();
  try {
    const newCategory =await Category.create({ name, image });
    await newCategory.save();
    return { response: "Category created successfully" };
  } catch (error) {
    return { message: "Error while creating category" +error};
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
