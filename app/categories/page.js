"use client"

import { getAllCategories } from "@actions/categories.actions";
import Button from "@components/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {

  const [categories, setCategories] = useState([]);

  useEffect(()=> {
    const fetchCategories = async() => {
      const result = await getAllCategories();
      if(result.message) {
        alert(result.message);
      }else {
        setCategories(result.response);
      }
    }
    fetchCategories();
  },[])

  console.log(categories)

  return (
    <div className="h-cover padding navbar-pad">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-outfit font-semibold">All Categories</h1>
        <Link href={"/categories/create"} className="w-[180px]">
          <Button
            style={"btn-1"}
            text={"Add Category"}
            icon={"plus"}
            type={"button"}
          />
        </Link>
      </div>
      {/* Categories list */}
      <div>
        <div>
      
        </div>

      </div>
    </div>
  );
};

export default page;
