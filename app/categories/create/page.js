"use client";

import { createCategory } from "@actions/categories.actions";
import Button from "@components/Button";
import Input from "@components/Input";
import { UploadButton } from "@uploadthing/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createCategory(form.name ,form.image);
    if (result.response) {
      alert("Category created successfully!");
      router.push('/categories');
    }else {
      alert(result.message);
    }
  };

  const endpoint =
    pathname === "/categories/create"
      ? "categoriesCreateUploader"
      : "defaultUploader";

  return (
    <div className="h-cover padding navbar-pad">
      <h1 className="text-3xl font-outfit font-semibold mb-4">Create Category</h1>
      <form className="flex gap-2 md:flex-row flex-col">
        <div className="md:w-[400px] w-full">
          <Input
            type={"text"}
            placeholder={"Name"}
            value={form.name}
            name="name"
            onChange={(e) => {
              setForm((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        </div>
        <div className="md:w-[400px] w-full">
          <UploadButton
            endpoint={endpoint}
            className="ut-button:bg-transparent ut-button:ut-readying:bg-red-500/50 ut-button:ut-uploading:bg-red ut-button:text-red ut-button:border border-red"
            onClientUploadComplete={(res) => {
              setForm((prev) => ({
                ...prev,
                image: res[0].url,
              }));
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <div className="flex justify-end mt-4 md:mt-0"></div>
      </form>
      <div className="mt-3 md:w-[200px]">
      <Button
        type={"submit"}
        style={"btn-1"}
        icon={"plus"}
        onclick={handleSubmit}
        text={"Create"}
        disabled={!form.name ||!form.image}
      />
      </div>
    </div>
  );
};

export default page;
