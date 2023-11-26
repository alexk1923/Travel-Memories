import React, { ChangeEvent, useState } from "react";
import openEye from "../img/open-eye.svg";
import closedEye from "../img/closed-eye.svg";

type FormInputProps = {
	label: string;
	htmlFor: string;
	type: string;
	placeholder: string;
	autoComplete?: string;
	name: string;
	errorMessage: string;
	value: string;
	pattern?: string;
	error?: boolean
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function FormInput(props: FormInputProps) {
	const { htmlFor, label, errorMessage, ...inputProps } = props;
	const [passwordVisible, setPasswordVisible] = useState(false);

	return (
		<div className='flex flex-col justify-center w-full lg:w-[100%]  gap-2 mb-2'>
			<label htmlFor={htmlFor} className='relative'>
				{label}
				{inputProps.name === "password" && (
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
				type={
					label === "password"
						? passwordVisible
							? "text"
							: "password"
						: inputProps.type
				}
				className={
					`outline-none outline-offset-0 focus-visible:outline  
							text-slate-800 placeholder:text-slate-500 bg-light-gray rounded-lg
								 w-full  p-2 peer ` + (props.value !== "" && props.error ? "outline outline-rose-600" : "focus-visible:outline-primary ")
				}
			></input>

			{props.value &&
				<span className='text-red-500 hidden peer-invalid:block text-red text-body-2'>
					{props.errorMessage}
				</span>}
		</div>
	);
}
