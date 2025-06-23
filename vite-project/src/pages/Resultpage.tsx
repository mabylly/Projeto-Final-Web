
import { useLocation, Link } from 'react-router-dom';
import ResultsDisplay from "../components/ResultsDisplay";

export default function Resultpage() {
  const location = useLocation();

  // Pegamos os dados do 'state' da rota.
  // Se o usuário chegar aqui sem dados (ex: digitando a URL direto), 'results' será undefined.
  const { results } = location.state || { results: [] };

    // Verificação para caso o usuário acesse a página diretamente
  if (!results || results.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Nenhum resultado para exibir.</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Voltar para a página de busca
        </Link>
      </div>
    );
  }

  return (    
    <ResultsDisplay 
      results={results}
      isLoading={false}
      error={null}
    />
  );
}
