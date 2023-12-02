import React from "react";

type ButtonProps = {
  text: string;
  variant: string;
  onClick: any;
};

export default function Button(props: ButtonProps) {
  const { text, variant } = props;
  return (
    <button
      className={`text-body-1 min-w-fit rounded-full border-2 border-white px-10 py-1.5 font-semibold text-white 
        ${variant === "filled" ? "bg-primary" : ""}`}
      onClick={props.onClick}
    >
      {text}
    </button>
  );
}
