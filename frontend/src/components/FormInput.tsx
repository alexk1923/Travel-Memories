import React, { ChangeEvent, useState } from "react";
import openEye from "../img/open-eye.svg";
import closedEye from "../img/closed-eye.svg";

type FormInputProps = {
	label: string;
	htmlFor: string;
	type: string;
	placeholder: string;
	autoComplete: string;
	name: string;
	id: string;
	errorMessage: string;
	value: string;
	error: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function FormInput(props: FormInputProps) {
	const { htmlFor, label, errorMessage, ...inputProps } = props;
	const [passwordVisible, setPasswordVisible] = useState(false);

	return (
		<div className='flex flex-col justify-center w-full md:w-[50%] lg:w-[60%] px-2'>
			<label htmlFor={htmlFor} className='relative'>
				{label}
				{label === "Password" && (
					<img
						src={passwordVisible ? closedEye : openEye}
						className='w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2'
						alt='display password as plain text'
						onClick={() =>
							setPasswordVisible((passwordVisible) => !passwordVisible)
						}
					/>
				)}
			</label>
			<input
				{...inputProps}
				required
				// {!pasrdVisible && type="text"}
				type={
					label === "Password"
						? passwordVisible
							? "text"
							: "password"
						: "email"
				}
				className={
					`outline-none outline-offset-0 focus-visible:outline focus-visible:outline-sky-300 
							text-slate-800 placeholder:text-slate-500 bg-slate-300 rounded-xl
								 w-full mb-3 p-2 peer` + (props.error ? "outline outline-rose-600" : "")
				}
			></input>
			<span className='text-red-500 hidden peer-invalid:block'>
				{errorMessage}
			</span>
		</div>
	);
}
