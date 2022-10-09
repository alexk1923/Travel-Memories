import React from "react";

type ContainerProps = {
	children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
	return (
		<div className='bg-slate-800 h-screen flex flex-col items-center'>
			{children}
		</div>
	);
}
