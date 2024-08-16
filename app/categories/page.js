"use client";

import { getAllCategories } from "@actions/categories.actions";
import Button from "@components/Button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CircleSpinner } from "react-spinners-kit";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const result = await getAllCategories();
      if (result.message) {
        alert(result.message);
      } else {
        setCategories(result.response);
      }
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <div className="h-cover padding navbar-pad">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-outfit font-semibold">All Categories</h1>
        <Link href="/categories/create" className="w-[180px]">
          <Button
            style="btn-1"
            text="Add Category"
            icon="plus"
            type="button"
          />
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center w-full h-cover">
          <CircleSpinner size={40} color="#d90f0f" />
        </div>
      ) : (
        <div className="flex gap-3 flex-wrap w-full">
          {categories.map((category) => (
            <div key={category._id} className="mb-5 w-1/4 min-h-[500px]">
              <div className="relative w-full h-[300px]">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="object-cover rounded-md"
                  fill
                />
              </div>
              <h2 className="text-2xl font-outfit font-semibold mt-2">
                {category.name}
              </h2>
              <Link href={`/categories/${category._id}`} className="w-1/2">
                <Button
                  text="Edit"
                  type="button"
                  style="btn-3"
                  icon="eye"
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
