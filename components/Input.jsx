"use client";

import React from "react";
const Input = ({ type, placeholder, onChange, icon="", value, name }) => {
  return (
    <div className="flex border items-center rounded-md px-2 flex-1 relative">
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        className="md:w-[300px] w-full py-3 rounded-md outline-none "
        onChange={onChange}
        step={`${name === "quantity" ? 1 : "any"}`}
        name={name}
        min={"0"}
        onKeyDown={(e) =>
          name === "quantity" && e.key === "." && e.preventDefault()
        }
      />
      {icon && (
        <i
          className={`fi fi-rr-${icon} absolute right-4 top-1/2 transform -translate-y-1/2  text-lg`}
        ></i>
      )}
    </div>
  );
};

export default Input;
