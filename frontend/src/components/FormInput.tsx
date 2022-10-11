import React from "react";

type FormInputProps = {
	label: string;
	htmlFor: string;
	type: string;
	placeholder: string;
	autoComplete: string;
	name: string;
	id: string;
	errorMessage: string;
};

export default function FormInput(props: FormInputProps) {
	const { htmlFor, label, errorMessage, ...inputProps } = props;
	return (
		<div className='flex flex-col justify-center w-full lg:w-[60%] px-2'>
			<label htmlFor={htmlFor}>{label}</label>
			<input
				{...inputProps}
				required
				// type={props.type}

				// placeholder={props.placeholder}
				// autoComplete={props.autoComplete}
				// name={props.name}
				// id={props.id}
				className='outline-none focus-visible:outline focus-visible:outline-offset-0 focus-visible:outline-sky-300 
									text-slate-800 placeholder:text-slate-500 bg-slate-300 rounded-xl
								 w-full mb-3 p-2 peer'
			></input>
			<span className='text-red-500 hidden peer-invalid:block'>
				{errorMessage}
			</span>
		</div>
	);
}
