import React, { ChangeEvent, useState } from 'react'
import FormInput from './FormInput'
import Button from './Button';

interface InputInterface {
    emailInput: string;
    nameInput: string;
    messageInput: string;
    [key: string]: string;
}

interface InputErrorInterface {
    emailInput: boolean;
    nameInput: boolean;
    messageInput: boolean;
    [key: string]: boolean;
}

export default function ContactForm() {

    const [inputValues, setInputValues] = useState<InputInterface>({ emailInput: "", nameInput: "", messageInput: "" });
    const [inputErrors, setInputErrors] = useState<InputErrorInterface>({ emailInput: false, nameInput: false, messageInput: false });

    const inputs = [{
        key: 1,
        name: "nameInput",
        label: "Name",
        placeholder: "Enter your name",
        type: "text",
        htmlFor: "name",
        errorMessage: "",
    }, {
        key: 2,
        name: "emailInput",
        label: "Email",
        placeholder: "Enter your email",
        type: "email",
        errorMessage: "Invalid email",
        htmlFor: "email"

    }]

    const textAreaData = {
        name: "messageInput",
        cols: 40,
        rows: 10,
        placeholder: "",
        label: "Message"
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {

        setInputErrors({
            ...inputErrors,
            [e.target.name]: !e.target.validity.valid
        })


        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='bg-pure-white max-w-[90%] lg:max-w-[70%] flex flex-col text-primary px-8 sm:px-16 py-8 mb-8'>

            <h2 className='font-bold py-4'>CONTACT US</h2>

            <form className='max-w-[100%] text-primary font-semibold flex flex-col'>
                {inputs.map(inputData => <FormInput {...inputData} value={inputValues[inputData.name]} error={inputErrors[inputData.name]} onChange={handleInputChange} />)}
                <div className='flex flex-col gap-2 w-[100%]'>
                    <label htmlFor='textarea font'>Message</label>
                    <textarea {...textAreaData} className='max-w-[100%] bg-white border-transparent rounded-md outline-offset-0 resize-none p-2 mb-2'>
                    </textarea>
                </div>
                <Button variant='filled' text="Send" onClick={undefined} />
            </form>
        </div>
    )
}
