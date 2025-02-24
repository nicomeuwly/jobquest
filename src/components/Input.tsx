"use client";
import { useState } from "react";

type InputProps = {
    placeholder: string;
    type: string;
    required: boolean;
    colSpan?: number;
    value?: string | number;
    name?: string;
}

export default function InputElement({ placeholder, type, required, colSpan, value, name }: InputProps) {
    const [inputValue, setInputValue] = useState(value || "");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className={"relative" + (colSpan ? ` col-span-${colSpan}` : "")}>
            <input type={type} id="floating_outlined" className={"block px-4 py-3 w-full bg-transparent rounded-lg border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:bg-gray-50 " + (inputValue ? "text-black" : "text-gray-500")} placeholder=" " name={name} required={required} value={inputValue} onChange={handleChange}/>
            <label htmlFor="floating_outlined" className={"absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:bg-white peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 " + (inputValue ? "bg-white" : "")}>{placeholder}</label>
        </div>
    );
}