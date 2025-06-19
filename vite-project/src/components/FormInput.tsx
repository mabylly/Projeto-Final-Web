import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export function FormInput({ 
  type, 
  name, 
  placeholder, 
  value, 
  onChange, 
  required = false,
  className = ""
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  // Determinar o tipo de input baseado no estado
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  // Verificar se é um campo de senha
  const isPasswordField = type === 'password';

  return (
    <div className="relative">
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 ${
          isPasswordField ? 'pr-12' : ''
        } ${className}`}
      />
      
      {/* Botão para mostrar/esconder senha */}
      {isPasswordField && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          title={showPassword ? 'Esconder senha' : 'Mostrar senha'}
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      )}
    </div>
  );
}