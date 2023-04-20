import React from "react";

export default function Button({
  children,
  margin = "m-1",
  onClick = () => {},
  type = "button",
  styling = "",
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ${margin} ${styling}`}
    >
      {children}
    </button>
  );
}
