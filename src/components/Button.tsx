type ButtonProps = {
    text: string;
    type: "submit" | "button";
    onClick?: () => void;
    disabled?: boolean;
}

export function PrimaryButton({ text, type, onClick, disabled }: ButtonProps) {
    return (
        <button className="bg-blue-600 hover:bg-blue-800 px-4 py-3 rounded-md text-white min-w-40 max-w-fit" type={type} onClick={onClick} disabled={disabled}>{text}</button>
    )
}

export function SecondaryButton({ text, type, onClick, disabled }: ButtonProps) {
    return (
        <button className="bg-gray-500 hover:bg-gray-700 px-4 py-3 rounded-md text-white min-w-40 max-w-fit" type={type} onClick={onClick} disabled={disabled}>{text}</button>
    )
}