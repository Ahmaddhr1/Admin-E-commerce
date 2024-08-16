"use client";

import React, { useEffect, useState } from "react";
import { useProtectedRoute } from "@utils/protectedRoutes.js";
import Link from "next/link";
import Button from "@components/Button";
import { deleteProductById, fetchProducts } from "@actions/products.actions";
import Image from "next/image";
import { CircleSpinner } from "react-spinners-kit";

const Page = () => {
  const { session, renderLoader } = useProtectedRoute();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingProductIds, setDeletingProductIds] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
    setDeletingProductIds((prev) => ({ ...prev, [id]: true }));
    const result = await deleteProductById(id);
    setDeletingProductIds((prev) => ({ ...prev, [id]: false }));

    if (result.response) {
      alert(result.response);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } else {
      alert(result.message);
    }
  };

  if (!session) {
    return renderLoader();
  }

  return (
    <div className="h-cover padding py-4 navbar-pad">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-outfit font-semibold">All Products</h1>
        <Link href="/products/create" className="w-[170px]">
          <Button style="btn-1" text="Add Product" icon="plus" type="button" />
        </Link>
      </div>

      {isLoading ? (
        <div className="h-cover flex items-center justify-center">
          <CircleSpinner size={40} color="#d90f0f" />
        </div>
      ) : (
        <div className="flex gap-3 flex-wrap h-cover">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="flex flex-col p-2 w-full md:w-[210px] lg:w-[244px] min-h-[300px] overflow-hidden"
              >
                <div className="relative w-full h-[250px]">
                  <Image
                    src={
                      product.images[0]
                        ? product.images[0]
                        : "https://via.placeholder.com/150?text=Image+Not+Found"
                    }
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-xl font-semibold whitespace-normal">
                    {product.name}
                  </h3>
                  <p className="text-gray-800 text-lg">{product.price} $</p>
                  <div className="flex gap-2 mt-2 w-full">
                    <Link href={`/products/${product._id}`} className="w-1/2">
                      <Button
                        text="Edit"
                        type="button"
                        style="btn-3"
                        icon="eye"
                      />
                    </Link>
                    <div className="w-1/2">
                      {deletingProductIds[product._id] ? (
                        <div className="flex items-center w-full justify-center mt-2">
                          <CircleSpinner size={25} color="#d90f0f" />
                        </div>
                      ) : (
                        <div onClick={() => handleDelete(product._id)}>
                          <Button
                            text="Delete"
                            type="button"
                            style="btn-2"
                            icon="trash"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-800 w-full h-fit">
              <p className="text-lg">No products found.</p>
              <Link
                href="/products/create"
                className="text-red underline cursor-pointer"
              >
                Create one now!
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
