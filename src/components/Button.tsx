import React from "react";
import classnames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    selected?: boolean;
    variant?: 'default' | 'outline';
}
const Button: React.FC<ButtonProps> = ({ selected, variant = 'default', className, disabled, ...props }) => {
    let baseClass = "transition-all duration-200 backdrop-blur-sm px-4 py-2 rounded text-center font-bold";
    if (disabled) {
        baseClass += " bg-gray-600 text-gray-400 cursor-not-allowed";
    } else {
        if (variant == 'default') {
            baseClass += selected 
                ? " bg-gray-900 text-white shadow-lg shadow-blue-500/30" 
                : " bg-white text-black hover:bg-white/40 hover:scale-105";
        } else if (variant == 'outline') {
            baseClass += " bg-transparent border border-gray-700 text-white hover:bg-white/10";
        }
    }
    return <button className={classnames(baseClass, className)} {...props} />;
};

export default Button