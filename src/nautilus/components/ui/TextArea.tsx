import type { IconType } from "react-icons"


interface TextAreaProps {
    id: string
    placeholder: string
    icon: IconType
}

export const TextArea = ({ id, placeholder, icon: Icon, ...props }: TextAreaProps) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="relative group">
                {/* Ajustamos el top y el left para que coincida con el padding del input */}
                <Icon className="absolute left-3 md:left-5 top-3.5 md:top-5.5 text-gray-400 size-6 md:size-8 pointer-events-none" />
                
                <textarea 
                    {...props} 
                    id={id} 
                    placeholder={placeholder} 
                    className="w-full p-3 pl-11 md:p-5 md:pl-16 text-base md:text-xl border-3 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors min-h-30" 
                />
            </div>
        </div>
    );
};