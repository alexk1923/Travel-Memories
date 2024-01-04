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
      className={`text-body-2 min-w-fit self-center rounded-full border-4 border-white px-4 py-1.5 font-semibold text-white 
        ${variant === "filled" ? "bg-primary" : ""}`}
      onClick={props.onClick}
    >
      {text}
    </button>
  );
}
