import { useState } from 'react';
import { BookMarked, BookOpen, ClipboardCheck, Lightbulb, Check }  from 'lucide-react';

import CardResult from "../components/CardResult";
import ToggleSwitch from '../components/ToggleSwitch';

import type  { Result } from '../types/result';


interface ResultsDisplayProps {
  results: Result[];
  isLoading: boolean;
  error: string | null;
}

// Um "mapa" para associar o tipo de resultado a um ícone específico.
// Esta é uma forma limpa e declarativa de escolher o ícone certo.
const iconMap: { [key: string]: React.ReactNode } = {
  definition: <BookOpen className="text-blue-500" />,
  curiosities: <Lightbulb className="text-yellow-500" />,
  multiple_choice_question: <ClipboardCheck className="text-green-500" />,
  open_ended_question: <ClipboardCheck className="text-purple-500" />,
  book_recommendation: <BookMarked className="text-indigo-500" /> // Adicionamos o novo tipo
};

export default function ResultsDisplay({ results, isLoading, error }: ResultsDisplayProps) {

  const [copiedId, setCopiedId] = useState<string | null>(null); // Estado para armazenar o ID do card copiado
  const [showAnswers, setShowAnswers] = useState(true); // Estado para controlar a exibição das respostas

  // Função para copiar conteúdo do card
  const handleCopy = (textToCopy: string, id: string) => {
  // Usamos a API nativa do navegador para copiar
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      // Se a cópia funcionar, atualizamos o estado
      setCopiedId(id);
      // E definimos um tempo para remover o feedback visual
      setTimeout(() => {
        setCopiedId(null);
      }, 2000); // O feedback some após 2 segundos
    })
    .catch(err => {
      console.error('Falha ao copiar texto: ', err);
    });
  };

  // Função para formatar o conteúdo para cópia
  const formatContentForCopy = (result: Result): string => {
    switch (result.type) {
      case 'definition':
        return result.content.text;
      case 'curiosities':
        return result.content.items.map(item => `• ${item}`).join('\n');
      case 'multiple_choice_question':
        // CORREÇÃO DE BUG: Iteramos sobre as questões para formatar o texto
        return result.content.questions.map((q, index) => {
          const optionsText = q.options.map((opt, i) => `  ${String.fromCharCode(97 + i)}) ${opt}`).join('\n');
          return `${index + 1}. ${q.question}\n${optionsText}`;
        }).join('\n\n');
      case 'open_ended_question':
        return result.content.prompts.map((p, index) => `${index + 1}. ${p.prompt}`).join('\n\n');
      case 'book_recommendation':
        return result.content.recommendations.map(rec => 
          `Título: ${rec.title}\nAutor: ${rec.author} (${rec.year})\n\nResumo: ${rec.summary}\n\nMotivo da Recomendação: ${rec.reasoning}`
        ).join('\n\n---\n\n');
      default:
        return '';
    }
  };

    // LÓGICA PARA EXIBIR ESTADOS DE CARREGAMENTO E ERRO
  if (isLoading) {
    return <div className="text-center p-8">Carregando recursos...</div>;
  }
  if (error) {
    return <div className="text-center p-8 text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="p-8">

      <div className="flex justify-end mb-6">
        <ToggleSwitch 
          label="Mostrar Respostas"
          enabled={showAnswers}
          onChange={setShowAnswers}
        />
      </div>

      <div className='space-y-6'>      
        
        {/* .map para interar sobre todos os elementos retornados */}
        {results.map((result) => (          
          <CardResult 
            key={result.id} // A KEY, usando o ID único e estável do dado
            title={result.title}
            icon={iconMap[result.type]} // Pega o ícone correspondente ao tipo
            onCopy={() => handleCopy(formatContentForCopy(result), result.id)}
            isCopied={copiedId === result.id}
          >
            {/* Lógica de renderização condicional para o conteúdo de cada card */}

            {result.type === 'definition' && (
              <p className="text-gray-700 leading-relaxed">{result.content.text}</p>
            )}

            {result.type === 'curiosities' && (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {result.content.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}

            {result.type === 'multiple_choice_question' && (
              // Usamos um div como container para todas as perguntas
              <div className="space-y-6"> 
                {/* Fazemos um loop sobre o array de 'questions' */}
                {result.content.questions.map((q, index) => (
                  // Cada pergunta é renderizada em seu próprio container
                  <div key={q.id}>
                    <p className="font-medium">{`${index + 1}. ${q.question}`}</p>
                    <ul className="space-y-2 mt-2">
                      
                      {/* Loop interno sobre as opções da pergunta 'q' */}
                      {q.options.map((option, optionIndex) => { // 1. Pegamos o 'optionIndex' aqui

                        // 2. Comparamos o ÍNDICE DA OPÇÃO com o índice da resposta correta
                        const isCorrect = optionIndex === q.correctAnswerIndex;

                        // 3. Usamos 'return' porque estamos dentro de um bloco com chaves {}
                        return (
                          <li 
                            key={option}
                            // Destaque de fundo aplicado condicionalmente
                            className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                              showAnswers && isCorrect ? 'bg-green-50' : ''
                            }`}
                          >
                            {/* Ícone de check aplicado condicionalmente */}
                            <div className="w-5 h-5">
                              {showAnswers && isCorrect && <Check className="text-green-600" size={20}/>}
                            </div>
                            
                            <input type="radio" name={q.id} id={`${q.id}-${option}`} disabled />
                            <label htmlFor={`${q.id}-${option}`} className="ml-2">{option}</label>
                          </li>
                        );
                      })}
                      
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {result.type === 'open_ended_question' && Array.isArray(result.content.prompts) && (
              <div className="space-y-6">
                {result.content.prompts.map((p, index) => (
                  <div key={p.id}>
                    <p className="font-medium text-gray-800">{`${index + 1}. ${p.prompt}`}</p>
                  </div>
                ))}
              </div>
            )}

            {result.type === 'book_recommendation' && Array.isArray(result.content.recommendations) && (
              <div className="space-y-6">
                {result.content.recommendations.map((rec) => (
                  <div key={rec.title} className="border-t pt-4 first:pt-0 first:border-t-0">
                    <h4 className="font-bold text-gray-800">{rec.title} ({rec.year})</h4>
                    <p className="text-sm text-gray-600 italic">por {rec.author}</p>
                    
                    <div className="mt-3 space-y-3">
                      <div>
                        <h5 className="font-semibold text-sm text-gray-700">Resumo</h5>
                        <p className="mt-1 text-gray-600 text-sm leading-relaxed">{rec.summary}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-gray-700">Por que ler este livro?</h5>
                        <p className="mt-1 text-gray-600 text-sm leading-relaxed">{rec.reasoning}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
          </CardResult>
        ))}
      </div>

    </div>
      
  );
} 

