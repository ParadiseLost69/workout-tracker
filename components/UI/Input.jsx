import React from "react";

export default function Input({
  type = "text",
  placeholder = "placeholder",
  id,
  name,
  label = "label",
  value = "",
  onChange,
  maxLength,
  minLength,
  max,
  min,
  mb = "mb-0",
}) {
  return (
    <div className="flex flex-col w-80 my-2">
      <label className="text-xl mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className={`px-4 py-3 ${mb} text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`}
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        // If theses exist then add them to the input
        // Lengths
        maxLength={maxLength && maxLength}
        minLength={minLength && minLength}
        // Numbers
        max={max && max}
        min={min && min}
      />
    </div>
  );
}
