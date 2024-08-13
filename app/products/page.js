"use client";

import React, { useEffect, useState } from "react";
import { useProtectedRoute } from "@utils/protectedRoutes.js";
import Link from "next/link";
import Button from "@components/Button";
import { fetchProducts } from "@actions/products.actions";
import Image from "next/image";
import { CircleSpinner } from "react-spinners-kit";

const page = () => {
  const { session, renderLoader } = useProtectedRoute();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const result = await fetchProducts();
      if (result.response) {
        setProducts(result.response.reverse());
      } else {
        alert(result.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);


  const handleDelete = async (id) => {
     console.log(id);
  }

  
  if (!session) {
    return renderLoader();
  }

  return (
    <div className="h-cover padding py-4 pt-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-outfit font-semibold">All Products</h1>
        <Link href={"/products/create"} className="w-[170px]">
          <Button
            style={"btn-1"}
            text={"Add Product"}
            icon={"plus"}
            type={"button"}
          />
        </Link>
      </div>
      {isLoading ? (
        <div className="h-cover flex items-center justify-center">
          <CircleSpinner size={40} color="#d90f0f" />
        </div>
      ) : (
        <div className="flex gap-3 flex-wrap mt-10 h-cover">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col p-2 w-[200px] md:w-[210px] lg:w-[244px] min-h-[300px] overflow-hidden "
              >
                <div className="relative w-full h-[250px]">
                  <Image
                    src={
                      product.images[0]
                        ? product.images[0]
                        : "https://images.app.goo.gl/pTicWNVdBch4gZGj9"
                    }
                    alt={product.name}
                    layout="fill"
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-xl font-semibold whitespace-normal">{product.name}</h3>
                  <p className="text-gray-800 text-lg">{product.price} $</p>
                  <div className="flex gap-2 mt-2 w-full">
                    <Link href={`/products/${product._id}`} className="w-1/2" >
                      <Button
                        text={"Edit"}
                        type={"button"}
                        style={"btn-3"}
                        icon={"eye"}
                      />
                    </Link>
                    <div onClick={() => handleDelete(product._id)} className="w-1/2">
                      <Button
                        text={"Delete"}
                        type={"button"}
                        style={"btn-2"}
                        icon={"trash"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="flex items-center justify-center text-gray-800 w-full">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
