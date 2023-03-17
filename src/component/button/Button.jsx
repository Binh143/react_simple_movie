import React from "react";
import { Navigate } from "react-router-dom";

const Button = ({
  onClick,
  className = "",
  children,
  type = "button",
  bgColor = "primary",
  widthFull = false,
  ...props
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary": {
      bgClassName = "bg-primary";
      break;
    }
    case "secondary": {
      bgClassName = "bg-secondary";
      break;
    }
    default:
      console.log("Error button");
      break;
  }
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`py-3 px-6 rounded-lg ${bgClassName} ${
          widthFull ? "w-full" : ""
        } mt-auto ${className}`}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
