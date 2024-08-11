import Button from "@components/Button";
import Input from "@components/Input";
import React from "react";

const CreateProduct = () => {
  return (
    <div className="h-cover padding py-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-outfit font-semibold">Add Product</h1>
        <form className="flex flex-col gap-3">
          <div className="flex md:flex-row flex-col gap-2 flex-wrap w-full">
            <Input type="text" placeholder="Product Name" />
            <Input type="number" placeholder="Price" name="price" />
            <Input type="number" placeholder="Quantity" name="quantity" />
            <Input type="file" placeholder="Product Image" />
          </div>
          <textarea
            name="description"
            className="border rounded-md px-2 py-1 min-w-full min-h-[100px]"
            placeholder="Description"
          ></textarea>
          <div className="w-[160px]">
            <Button
              style={"btn-1"}
              text={"Add"}
              icon={"multiple"}
              type={"button"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
