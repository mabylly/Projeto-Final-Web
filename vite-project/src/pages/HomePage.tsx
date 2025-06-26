// src/pages/HomePage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Searchpage from './Searchpage';
import { contentService } from '../services/contentService'; // <-- Importe o novo serviço

export default function HomePage() {
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!topic || !grade) {
      alert('Por favor, preencha o tópico e a série.');
      return;
    }
    setIsLoading(true);
    setError(null);

    // Navega para a página de resultados, mostrando que está carregando
    navigate('/results', { 
      state: { 
        isLoading: true,
        results: [], 
        error: null 
      } 
    });

    try {
      // --- LÓGICA DE FETCH SIMPLIFICADA ---
      // Chamamos nosso serviço, que cuida de tudo (headers, token, etc.)
      const data = await contentService.generateContent(topic, grade);

      // Se a chamada foi bem-sucedida, navegamos para os resultados com os dados
      navigate('/results', { 
        state: { 
          isLoading: false, 
          results: data, 
          error: null 
        } 
      });

    } catch (err: any) {
      // Se deu erro, navegamos para os resultados exibindo a mensagem de erro
      navigate('/results', { 
        state: { 
          isLoading: false, 
          results: [], 
          error: err.message || 'Ocorreu um erro.' 
        } 
      });
    } finally {
      // Independentemente do resultado, o loading no HomePage acaba aqui
      setIsLoading(false);
    }
  };

  return (
    <>
      <Searchpage 
        topic={topic}
        setTopic={setTopic}
        grade={grade}
        setGrade={setGrade}
        onSearch={handleSearch}
        isLoading={isLoading}
      />
      {/* O erro agora é exibido na página de resultados, mas podemos manter aqui também se quisermos */}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </>
  );
}