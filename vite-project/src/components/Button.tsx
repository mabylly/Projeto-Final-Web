interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'link';
  className?: string;
  disabled?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  className = "",
  disabled = false
}: ButtonProps) {
  const baseClasses = "font-semibold py-3 px-4 rounded-lg transition-colors duration-200";
  
  const variants = {
    primary: "w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900",
    secondary: "w-full bg-gray-200 hover:bg-gray-300 text-gray-900",
    link: "text-yellow-600 hover:text-yellow-700 ml-2"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}