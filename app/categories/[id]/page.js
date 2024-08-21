"use client";

import { deleteCategoryById, getSingleCategory, updateCategory } from "@actions/categories.actions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CircleSpinner } from "react-spinners-kit";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { usePathname, useRouter } from "next/navigation";
import { UploadButton } from "@uploadthing/react";
import Image from "next/image";

const Page = ({ params }) => {
  const router = useRouter()
  const { id } = params;
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [form, setForm] = useState({
    name: "",
    image: null,
  });

  const pathname = usePathname();

  const endpoint =
    pathname.startsWith("/categories/") && pathname.length > 12
      ? "categoriesCreateUploader"
      : "defaultUploader";

  useEffect(() => {
    setIsLoading(true);
    const fetchCategory = async () => {
      try {
        const result = await getSingleCategory(id);
        if (result?.response) {
          setCategory(result.response);
          setForm({
            name: result.response.name || "",
            image: result.response.image || null,
          });
        } else {
          alert(result.message);
        }
      } catch (error) {
        alert("An error occurred while fetching the category.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const result = await updateCategory(id,form)
    if (result.response) {
      alert("Category updated successfully!");
      router.push("/categories")
    }else {
      alert(result.message);
    }
  };



  return (
    <section className="min-h-screen navbar-pad p-6">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <CircleSpinner size={40} color="#d90f0f" />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {category?.name} Collection
            </h1>
            <p className="text-gray-700 mt-2">
              {category?.products?.length} product{category?.products?.length !== 1 ? 's' : ''} linked to this category
            </p>
            {category?.products?.length > 0 ? (
              <span
                className="underline text-red-600 cursor-pointer mt-2 inline-block"
                onClick={() => setShowProducts(!showProducts)}
              >
                {showProducts ? "Hide Products" : "Show Products"}
              </span>
            ) : (
              <Link
                href="/products/create"
                className="underline text-red-600 mt-2 inline-block"
              >
                Create one!
              </Link>
            )}
          </div>

          <form
            className="flex flex-col md:flex-row gap-6 md:max-w-2xl w-full"
          >
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Category Name
              </label>
              <Input
                type="text"
                placeholder="Category Name"
                value={form.name}
                name="name"
                onChange={handleChange}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="image"
                className="block text-gray-700 font-medium mb-2"
              >
                Category Image
              </label>
              <div className="flex flex-col gap-2">
                {form.image || category?.image ? (
                  <Image
                    src={form.image || category?.image}
                    alt="Category Preview"
                    width={100}
                    height={100}
                    className="object-cover rounded-md mb-2"
                  />
                ) : (
                  <div className="w-[100px] h-[100px] bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="border rounded-md px-2 flex flex-1">
                  <UploadButton
                    endpoint={endpoint}
                    className="mt-2 w-full ut-button:bg-red ut-button:ut-readying:bg-red-500/50 ut-button:ut-uploading:bg-red"
                    onClientUploadComplete={(res) => {
                      const imageUrl = res[0].url;
                      setForm((prevForm) => ({
                        ...prevForm,
                        image: imageUrl,
                      }));
                    }}
                    onUploadError={(error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="mt-8 md:w-[160px] w-full">
            <Button
              onclick={handleSubmit}
              text="Save Changes"
              style="btn-1"
            />
          </div>

          {showProducts && (
            <div className="">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {category?.products.map((product, index) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-4 p-4 border rounded-md"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Link
                        href={`/products/${product._id}`}
                        className="text-lg text-gray-900 hover:text-gray-600"
                      >
                        {index + 1}. {product.name}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Page;
