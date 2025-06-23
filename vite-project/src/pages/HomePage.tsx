import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Searchpage from './Searchpage';

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

    // Fazemos a requisição para a API do backend
    // Passando o tópico e a série como corpo da requisição
    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, grade }),
      });

      if (!response.ok) throw new Error('Falha ao buscar os dados da API.');
      
      const data = await response.json();

      //console.log("Resposta da API:", JSON.stringify(data, null, 2));

      // Navegamos para a página de resultados, passando os dados via 'state'
      navigate('/results', { state: { results: data } });

    //Comentario para desabilitar eslint
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro.');
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
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </>
  );
}

