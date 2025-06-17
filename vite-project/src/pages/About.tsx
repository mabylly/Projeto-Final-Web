// src/pages/About.tsx

import React from 'react';
// Importando ícones para as redes sociais
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

// Componente da Página Sobre
const About: React.FC = () => {
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
          <div className="text-center">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Foto de Mabylly Neres" className="w-36 h-36 rounded-full object-cover border-4 border-gray-900 mx-auto mb-4"/>
            <h3 className="text-xl font-semibold">Mabylly Neres</h3>
            <p className="text-md font-bold text-gray-800">CEO & Co-fundadora</p>
          </div>
          <div className="text-center">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704e" alt="Foto de Lucas Santos" className="w-36 h-36 rounded-full object-cover border-4 border-gray-900 mx-auto mb-4"/>
            <h3 className="text-xl font-semibold">Lucas Santos</h3>
            <p className="text-md font-bold text-gray-800">CTO & Co-fundador</p>
          </div>
          <div className="text-center">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704f" alt="Foto de Julio Farias" className="w-36 h-36 rounded-full object-cover border-4 border-gray-900 mx-auto mb-4"/>
            <h3 className="text-xl font-semibold">Julio Farias</h3>
            <p className="text-md font-bold text-gray-800">Líder de Pedagogia</p>
          </div>
        </div>
      </section>

      {/* Seção de Reconhecimentos e Parcerias */}
      <section className="w-full max-w-4xl mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 pb-2 border-b-4 border-gray-900 inline-block">
          Reconhecimentos e Parcerias
        </h2>
        <ul className="mt-4 text-lg text-gray-700 list-none space-y-2">
          <li>🏆 Prêmio Inovação em Educação 2025</li>
          <li>🌟 Destaque no "Tech for Good Summit"</li>
          <li>🤝 Parceria com a Universidade Federal de Tecnologia</li>
          <li>🚀 Acelerada pela "Educa Ventures"</li>
        </ul>
      </section>

      {/* Seção da Sede (Google Maps) */}
      <section className="w-full max-w-4xl mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 pb-2 border-b-4 border-gray-900 inline-block">
          Nossa Sede
        </h2>
        <p className="mt-4 text-lg">Estamos localizados no coração da inovação. Venha nos visitar!</p>
        <div className="mt-6 w-full border-4 border-gray-900 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.3410461876423!2d-51.4247833237887!3d-23.37599425488581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94926efbadb49639%3A0x44a361849a63b2a!2sUniversidade%20Tecnol%C3%B3gica%20Federal%20do%20Paran%C3%A1%20-%20Campus%20Apucarana!5e0!3m2!1spt-BR!2sbr!4v1718593005524!5m2!1spt-BR!2sbr"
            className="w-full h-96"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Seção de Redes Sociais */}
      <section className="w-full max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 pb-2 border-b-4 border-gray-900 inline-block">
          Conecte-se Conosco
        </h2>
        <div className="flex justify-center items-center gap-8 mt-4">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-5xl text-gray-800 hover:text-white hover:scale-110 transform transition-all duration-300"><FaLinkedin /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-5xl text-gray-800 hover:text-white hover:scale-110 transform transition-all duration-300"><FaInstagram /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-5xl text-gray-800 hover:text-white hover:scale-110 transform transition-all duration-300"><FaTwitter /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-5xl text-gray-800 hover:text-white hover:scale-110 transform transition-all duration-300"><FaFacebook /></a>
        </div>
      </section>

    </div>
  );
};

export default About;