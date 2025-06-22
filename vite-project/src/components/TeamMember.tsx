// src/components/TeamMember.tsx
import React from 'react';

// Interface para definir as propriedades que o componente receberá
interface TeamMemberProps {
  imageUrl: string;
  name: string;
  role: string;
}

// Componente para renderizar um único membro da equipe
export default function TeamMember({ imageUrl, name, role }: TeamMemberProps) {
  return (
    <div className="text-center">
      <img 
        src={imageUrl} 
        alt={`Foto de ${name}`} 
        className="w-36 h-36 rounded-full object-cover border-4 border-gray-900 mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-md font-bold text-gray-800">{role}</p>
    </div>
  );
}