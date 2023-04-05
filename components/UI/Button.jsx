import React from "react";

export default function Button({ children, margin = "m-1" }) {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ${margin}`}
    >
      {children}
    </button>
  );
}
