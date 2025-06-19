interface GenerateButtonProps {
  children: React.ReactNode; 
  onClick?: () => void; 
  disabled?: boolean; 
  className?: string; 
}

export function GenerateButton({ 
  children, 
  onClick, 
  disabled = false,
  className = ""
}: GenerateButtonProps) {
  const baseClasses = "w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md transition-all";
  
  return (
    <button 
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
