import React from "react";

function Input({placeholder, handleChange}) {

  return (
    <input
      className=""
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default Input;
