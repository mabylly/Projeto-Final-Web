// src/pages/About.tsx
import Header from '../components/Header'; 
import AboutContent from '../components/AboutContent'; // 1. Importe o novo componente de conteúdo

// Componente da Página Sobre (agora muito mais limpo)
export default function About() {
  return (
    <>
      {/* O Header continua aqui, controlando a navegação da página */}
      <Header />

      {/* 2. Renderize o componente AboutContent que agora contém toda a estrutura da página */}
      <AboutContent />
    </>
  );
};