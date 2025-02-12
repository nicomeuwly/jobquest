interface InputProps {
    placeholder: string;
    type: string;
    required: boolean;
    colSpan?: number;
}

export default function InputElement({ placeholder, type, required, colSpan }: InputProps) {
    return (
        <input className={"px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 hover:bg-gray-50 " + (colSpan ? `col-span-${colSpan}` : null)} type={type} placeholder={placeholder} required={required} />
    );
}