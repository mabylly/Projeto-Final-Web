

// Interfaces para o conteúdo de cada tipo de card
interface DefinitionContent {
  text: string;
}

interface CuriositiesContent {
  items: string[];
}

// 1. Criamos uma interface para definir a estrutura de UMA pergunta
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

// 2. A interface do conteúdo de múltipla escolha agora contém um ARRAY de Perguntas
interface MultipleChoiceContent {
  questions: Question[];
}


interface OpenEndedQuestion {
  id: string;
  prompt: string;
}

interface OpenEndedContent {
  prompts: OpenEndedQuestion[];
}

interface BookRecommendation {
  title: string;
  author: string;
  year: number;
  summary: string;     // campo para o resumo
  reasoning: string;   // campo para a justificativa
}

interface BookRecommendationContent {
  recommendations: BookRecommendation[];
}


export type Result =
  | { id: string; type: 'definition'; title: string; content: DefinitionContent }
  | { id: string; type: 'curiosities'; title: string; content: CuriositiesContent } 
  | { id: string; type: 'multiple_choice_question'; title: string; content: MultipleChoiceContent }
  | { id: string; type: 'open_ended_question'; title: string; content: OpenEndedContent }
  | { id: string; type: 'book_recommendation'; title: string; content: BookRecommendationContent };