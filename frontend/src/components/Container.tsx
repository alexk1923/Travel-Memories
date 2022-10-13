import React from "react";

type ContainerProps = {
	children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
	return <div className='bg-black'>{children}</div>;
}
