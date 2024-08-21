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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingProductIds, setDeletingProductIds] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchProducts();
      if (result.response) {
        const reversedProducts = result.response.reverse();
        setProducts(reversedProducts);
        setFilteredProducts(reversedProducts);
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
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } else {
      alert(result.message);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
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

      <div className="mb-6 font-medium flex items-center justify-between flex-wrap gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="border rounded-md px-4 py-2 w-full md:w-[300px]"
        />
        <p className="text-gray-600">
          Showing {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </p>
      </div>

      {isLoading ? (
        <div className="h-cover flex items-center justify-center">
          <CircleSpinner size={40} color="#d90f0f" />
        </div>
      ) : (
        <div className="flex gap-2 flex-wrap w-full">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="w-full md:w-[210px] lg:w-[244px] min-h-[400px] flex flex-col gap-3"
              >
                <div className="relative w-full h-[200px]">
                  <Image
                    src={
                      product.images[0]
                        ? product.images[0]
                        : "https://via.placeholder.com/150?text=Image+Not+Found"
                    }
                    alt={product.name}
                    fill
                    className="md:object-cover object-contain rounded-md"
                  />
                </div>
                <div className="flex gap-1 flex-col">
                  <h3 className="text-2xl font-outfit font-semibold whitespace-normal">
                    {product.name}
                  </h3>
                  <p className="text-gray-800 text-lg">{product.price} $</p>
                </div>
                <div className="flex gap-2 flex-col md:flex-row">
                  <Link
                    href={`/products/${product._id}`}
                    className="md:w-1/2 w-full"
                  >
                    <Button
                      text="View"
                      type="button"
                      style="btn-3"
                      icon="eye"
                    />
                  </Link>
                  <div className="md:w-1/2 w-full">
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
