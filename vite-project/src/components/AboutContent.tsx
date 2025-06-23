// src/components/AboutContent.tsx
import React from 'react';
import TeamMember from './TeamMember.tsx'; // Importando o novo componente

// Dados da equipe para facilitar a manutenção
const teamMembers = [
  {
    imageUrl: "https://github.com/mabylly/Projeto-Final-Web/blob/f2733a31298ee073b031b25f30e5171e24431272/vite-project/public/images/perfil%20mabylly.jpeg?raw=true",
    name: "Mabylly Neres",
    role: "CEO & Co-fundadora"
  },
  {
    imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
    name: "Lucas Santos",
    role: "CTO & Co-fundador"
  },
  {
    imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
    name: "Julio Farias",
    role: "Líder de Pedagogia"
  }
];

// Componente que renderiza todo o conteúdo da página Sobre
export default function AboutContent() {
  return (
    <div className="bg-primary-yellow-500 text-gray-900 font-sans p-5 md:p-10 flex flex-col items-center">

      {/* Seção de História */}
      <section className="w-full max-w-4xl mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-2 border-b-4 border-gray-900 inline-block">
          Nossa História
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 text-left">
          A Pedagog.ia nasceu em 2025 da visão de um grupo de estudantes apaixonados por transformar a educação. 
          Percebemos que, apesar do avanço tecnológico, muitos recursos educacionais ainda eram genéricos e pouco acessíveis para professores. 
          Nosso objetivo tornou-se claro: criar uma plataforma inteligente que gerasse materiais de estudo personalizados para ajudar na didatica de sala de aula, 
          adaptando-se ao seu nível de conhecimento e estilo de aprendizagem.
        </p>
      </section>

      {/* Seção de Missão e Valores */}
      <section className="w-full max-w-4xl mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 pb-2 border-b-4 border-gray-900 inline-block">
          Missão e Valores
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Missão</h3>
            <p className="text-base leading-relaxed text-gray-700">Democratizar o acesso a uma educação de alta qualidade e personalizada, capacitando alunos e professores com ferramentas inteligentes e eficazes.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Visão</h3>
            <p className="text-base leading-relaxed text-gray-700">Ser a principal plataforma de inteligência artificial para a educação no mundo, reconhecida por nosso impacto positivo no desenvolvimento acadêmico e pessoal de milhões de estudantes.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Valores</h3>
            <ul className="list-disc list-inside text-base leading-relaxed text-gray-700">
              <li>Inovação Contínua</li>
              <li>Foco no Aluno</li>
              <li>Acessibilidade</li>
              <li>Ética e Transparência</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Seção da Equipe */}
      <section className="w-full max-w-5xl mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 pb-2 border-b-4 border-gray-900 inline-block">
          Nossa Equipe
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Mapeando os dados da equipe para renderizar os componentes TeamMember */}
          {teamMembers.map((member) => (
            <TeamMember 
              key={member.name}
              imageUrl={member.imageUrl}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
      </section>

    </div>
  );
}