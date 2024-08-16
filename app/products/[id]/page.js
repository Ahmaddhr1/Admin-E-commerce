"use client";

import { fetchSingleProduct, updateProduct } from "@actions/products.actions";
import Button from "@components/Button";
import Input from "@components/Input";
import { useProtectedRoute } from "@utils/protectedRoutes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CircleSpinner } from "react-spinners-kit";

const Page = ({ params }) => {
  const router = useRouter();
  const { session, renderLoader } = useProtectedRoute();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [isUpdatingLoading, setIsUpdatingLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const result = await fetchSingleProduct(id);
      if (result.response) {
        setProduct(result.response);
        setForm({
          name: result.response.name,
          price: result.response.price,
          quantity: result.response.quantity,
          description: result.response.description,
        });
      } else if (result.message) {
        alert(result.message);
      }
      setIsLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdatingLoading(true);
    const result = await updateProduct(id, form);
    if (result.response) {
      router.back();
      alert(result.response);
      setIsUpdatingLoading(false);
    } else {
      setIsUpdatingLoading(false);
    }
  };

  if (!session) {
    return renderLoader();
  }

  if (isLoading)
    return (
      <div className="flex items-center w-full justify-center mt-2">
        <CircleSpinner size={25} color="#d90f0f" />
      </div>
    );

  return (
    <div className="h-cover navbar-pad padding w-full">
      <h1 className="text-3xl font-outfit font-semibold mb-3">
        Product Details
      </h1>
      <div className="flex flex-wrap gap-4 w-full">
        <form
          className="w-full md:w-[620px] flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="font-semibold">Name</label>
            <Input
              type="text"
              value={form.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div>
            <label className="font-semibold">Price</label>
            <Input
              type="number"
              value={form.price}
              onChange={handleChange}
              name="price"
            />
          </div>
          <div>
            <label className="font-semibold">Quantity</label>
            <Input
              type="number"
              value={form.quantity}
              onChange={handleChange}
              name="quantity"
            />
          </div>
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              className="border rounded-md px-2 py-1 min-w-full min-h-[100px]"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="w-[160px]">
            {isUpdatingLoading ? (
              <div className="flex items-center justify-center md:w-[100px] w-full">
                <CircleSpinner size={30} color="#d90f0f" />
              </div>
            ) : (
              <Button
                style="btn-1"
                text="Edit"
                icon="edit"
                type="submit"
                disabled={
                  !form.name ||
                  !form.price ||
                  !form.quantity ||
                  !form.description
                }
              />
            )}
          </div>
        </form>
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="w-full h-[300px] md:h-[400px] overflow-hidden flex justify-center items-center border">
            {product?.images?.length > 0 && (
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="object-contain max-h-full"
              />
            )}
          </div>

          <div className="flex mt-4 gap-2 overflow-x-auto">
            {product?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover cursor-pointer border ${
                  currentImageIndex === index ? "border-red-500" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
