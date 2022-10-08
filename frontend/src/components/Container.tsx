import React from "react";

type ContainerProps = {
	children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
	return (
		<div className='bg-rose-500 h-screen h-100 flex flex-col items-center'>
			{children}
		</div>
	);
}
