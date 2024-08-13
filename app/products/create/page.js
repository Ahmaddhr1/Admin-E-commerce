"use client";

import Button from "@components/Button";
import Input from "@components/Input";
import { UploadButton } from "@utils/uploadthing";
import React, { useState } from "react";
import {createProduct} from "@actions/products.actions"
import { useProtectedRoute } from "@utils/protectedRoutes";
import { CircleSpinner } from "react-spinners-kit";

const CreateProduct = () => {
  const { session, renderLoader } = useProtectedRoute();
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    images: [],
  });

  // Handle input change for text, number, and textarea fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.quantity || !form.images || !form.description) {
      alert("All fields are required");
      return;
    }
    try {
      setIsLoading(true);
      const result = await createProduct(form.name, form.price, form.description, form.images, form.quantity);
      if (result.message) {
        alert(result.message);
      } else {
        alert(result.response);
      }
      setIsLoading(false);
    }catch(e) {
      alert(e.message);
    }
  };
  
  if (!session) {
    return renderLoader();
  }

  return (
    <div className="h-cover padding py-4 z-1">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-outfit font-semibold">Add Product</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex md:flex-row flex-col gap-2 flex-wrap w-full">
            <Input
              type="text"
              placeholder="Product Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Price"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
            <div className="border rounded-md px-2 flex flex-1">
              <UploadButton
                endpoint="imageUploader"
                className="mt-2 w-full ut-button:bg-red ut-button:ut-readying:bg-red-500/50 ut-button:ut-uploading:bg-red"
                onClientUploadComplete={(res) => {
                  const imageUrls = res.map((file) => file.url);
                  setForm((prevForm) => ({
                    ...prevForm,
                    images: [...prevForm.images, ...imageUrls],
                  }));
                }}
                onUploadError={(error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          </div>
          <textarea
            name="description"
            className="border rounded-md px-2 py-1 min-w-full min-h-[100px]"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
          <div className="w-[160px]">
            {
              isLoading? (
                <div className="flex items-center justify-center md:w-[100px] w-full"><CircleSpinner size={30} color="#d90f0f" /></div>
              ) : (
                <Button
                  style={"btn-1"}
                  text={"Add"}
                  icon={"multiple"}
                  type={"submit"}
                />
              )
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
