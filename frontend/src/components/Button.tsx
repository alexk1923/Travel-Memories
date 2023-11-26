import React from 'react'

type ButtonProps = {
    text: string;
    variant: string;
    onClick: any;
}


export default function Button(props: ButtonProps) {
    const { text, variant } = props;
    return (
        <button className={`min-w-fit w-[25%] border-2 border-white rounded-full px-10 py-1.5 text-body-1 font-semibold text-white
        ${variant === "filled" ? "bg-primary" : ""}`} onClick={props.onClick}>
            {text}
        </button>
    )
}
