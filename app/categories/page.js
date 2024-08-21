"use client";

import { getAllCategories, deleteCategoryById } from "@actions/categories.actions";
import Button from "@components/Button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CircleSpinner } from "react-spinners-kit";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // State for managing deletion

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const result = await getAllCategories();
        if (result.message) {
          alert(result.message);
        } else {
          setCategories(result.response);
        }
      } catch (error) {
        alert("Error fetching categories");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const result = await deleteCategoryById(id);
      if (result.response) {
        alert("Category deleted successfully!");
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== id)
        );
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Error deleting category");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="h-cover padding navbar-pad">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-outfit font-semibold">All Categories</h1>
        <Link href="/categories/create" className="w-[180px]">
          <Button style="btn-1" text="Add Category" icon="plus" type="button" />
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center w-full h-cover">
          <CircleSpinner size={40} color="#d90f0f" />
        </div>
      ) : (
        <div className="flex gap-3 flex-wrap w-full">
          {
            categories.length === 0 && (
              <div className="flex flex-col items-center justify-center text-gray-800 w-full h-fit">
              <p className="text-lg">No categories found.</p>
              <Link
                href="/categories/create"
                className="text-red underline cursor-pointer"
              >
                Create one now!
              </Link>
            </div>
            )
          }
          {categories.map((category) => (
            <div
              key={category._id}
              className="w-full md:w-[210px] lg:w-[244px] min-h-[400px] flex flex-col gap-3"
            >
              <div className="relative w-full h-[200px]">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="md:object-cover object-contain rounded-md"
                  fill
                />
              </div>
              <div className="flex gap-1 flex-col">
                <h2 className="text-2xl font-outfit font-semibold">
                  {category.name}
                </h2>
                <p className="text-gray-800 flex items-center">
                  {category?.products?.length} Products
                </p>
              </div>
              <div className="flex gap-2 flex-col md:flex-row">
                <Link
                  href={`/categories/${category._id}`}
                  className="md:w-1/2 w-full"
                >
                  <Button text="View" type="button" style="btn-3" icon="eye" />
                </Link>
                <div className="md:w-1/2 w-full">
                  <Button
                    text={
                      deletingId === category._id ? "Deleting..." : "Delete"
                    }
                    type="button"
                    style="btn-2"
                    icon="trash"
                    onclick={() => handleDelete(category._id)}
                    disabled={deletingId === category._id} // Disable button while deleting
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
