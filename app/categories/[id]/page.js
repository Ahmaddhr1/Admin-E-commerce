"use client";

import { getSingleCategory } from "@actions/categories.actions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CircleSpinner } from "react-spinners-kit";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { usePathname } from "next/navigation";
import { UploadButton } from "@uploadthing/react";

const Page = ({ params }) => {
  const { id } = params;
  const [category, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [showProducts, setShowProducts] = useState(false);

  const pathname = usePathname();

  const endpoint =
    pathname.startsWith("/categories/") && pathname.length > 12
      ? "categoriesCreateUploader"
      : "defaultUploader";

  useEffect(() => {
    setIsLoading(true);
    const fetchCategory = async () => {
      const result = await getSingleCategory(id);
      if (result.response) {
        setCategory(result.response);
        setNewName(result.response.name);
        setPreviewImage(result.response.image);
      } else {
        alert(result.message);
      }
      setIsLoading(false);
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = () => {
    // Handle form submission here, e.g., sending updated category data to your API
    console.log("Form submitted", { name: newName, image: previewImage });
  };

  return (
    <section className="h-cover navbar-pad padding">
      {isLoading ? (
        <div className="flex items-center justify-center h-cover">
          <CircleSpinner size={40} color="#d90f0f" />
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-semibold">
            {category?.name} Collection!
          </h1>
          <p className="text-gray-800">
            {category?.products?.length} products linked to this category
          </p>
          {category?.products?.length > 0 ? (
            <span
              className="underline text-red cursor-pointer"
              onClick={() => setShowProducts(!showProducts)}
            >
              {showProducts ? "Hide Products" : "Show Products"}
            </span>
          ) : (
            <Link
              href="/categories/create"
              className="underline text-red cursor-pointer"
            >
              Create one!
            </Link>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 md:w-[400px] w-full mt-6"
          >
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Category Name
              </label>
              <Input
                type="text"
                placeholder="Category Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                name="name"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                Category Image
              </label>
              <div className="flex flex-col gap-2">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Category Preview"
                    className="w-32 h-32 object-cover rounded-md mb-2"
                  />
                )}
                <div className="border rounded-md px-2 flex flex-1">
                  <UploadButton
                    endpoint={endpoint}
                    className="mt-2 w-full ut-button:bg-red ut-button:ut-readying:bg-red-500/50 ut-button:ut-uploading:bg-red"
                    onClientUploadComplete={(res) => {
                      const imageUrl = res[0].url;
                      setPreviewImage(imageUrl);
                    }}
                    onUploadError={(error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              text="Save Changes"
              style="bg-red text-white py-2 px-4 rounded-md w-full"
            />
          </form>

          {showProducts && (
            <div className="mt-6 w-full">
              <p className="block text-gray-700 font-medium mb-4">Products</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {category?.products.map((product, index) => (
                  <div key={product._id} className="flex items-center gap-4 p-4 border rounded-md">
                    <div>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Link
                        href={`/products/${product._id}`}
                        className="block text-lg text-gray-800 hover:text-gray-600"
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
