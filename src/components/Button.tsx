import React from "react";
import classnames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    selected?: boolean;
    variant?: 'default' | 'outline' |'start';
}
const Button: React.FC<ButtonProps> = ({ selected, variant = 'default', className, disabled, ...props }) => {
    let baseClass = "px-6 py-3 font-mono text-sm border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40";
    if (disabled) {
        baseClass += "bg-gray-600 text-gray-400 cursor-not-allowed";
    } else {
        if (variant == 'default') {
            baseClass += selected 
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                : "bg-gray-800/30 text-gray-400 border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600";
        } else if (variant == 'outline') {
            baseClass += " bg-transparent border border-gray-700 text-white hover:bg-white/10";
        } else if (variant == 'start') {
            baseClass += "bg-indigo-500/10 text-indigo-400 border-indigo-500/50 hover:bg-indigo-500/20 hover:border-indigo-400 focus:ring-indigo-500/40 active:bg-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]"
        }
    }
    return <button className={classnames(baseClass, className)} {...props} />;
};

export default Button