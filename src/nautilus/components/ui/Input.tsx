import type { IconType } from "react-icons"


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string
    placeholder: string
    icon: IconType,
    error: string | undefined
}

export const Input = ({ id, placeholder, icon: Icon, error, ...props }: InputProps) => {
    return <div className="flex flex-col gap-1">
        <div className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-6 md:size-8" />
            <input {...props} id={id} placeholder={placeholder} className={`md:text-xl w-full p-3 pl-10 md:p-5 md:pl-14 border-3 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 ${error ? "border-red-400" : ''}`} />
        </div>
        <p className="text-red-600 md:text-lg">{error}</p>
    </div>
}