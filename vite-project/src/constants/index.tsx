import { BookMarked, BookOpen, ClipboardCheck, Lightbulb }  from 'lucide-react';

// Series (searchpage.tsx)
export const series = [
  "1º ano (Fundamental)", "2º ano (Fundamental)", "3º ano (Fundamental)", "4º ano (Fundamental)",
  "5º ano (Fundamental)", "6º ano (Fundamental)", "7º ano (Fundamental)", "8º ano (Fundamental)", "9º ano (Fundamental)",
  "1º ano (Médio)", "2º ano (Médio)", "3º ano (Médio)"
];

// Mensagens de carregamento (Resultpage.tsx)
export const loadingMessages = [
  "Consultando os grandes pedagogos...",
  "Montando atividades criativas para você...",
  "Buscando as melhores referências...",
  "Aguarde, a mágica está acontecendo...",
  "Preparando recursos personalizados...",
  "Transformando conhecimento em aprendizado...",
  ];

// Um "mapa" para associar o tipo de resultado a um ícone específico.
// Esta é uma forma limpa e declarativa de escolher o ícone certo.
export const iconMap: { [key: string]: React.ReactNode } = {
  definition: <BookOpen className="text-blue-500" />,
  curiosities: <Lightbulb className="text-yellow-500" />,
  multiple_choice_question: <ClipboardCheck className="text-green-500" />,
  open_ended_question: <ClipboardCheck className="text-purple-500" />,
  book_recommendation: <BookMarked className="text-indigo-500" /> // Adicionamos o novo tipo
};