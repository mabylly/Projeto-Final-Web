

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

// --- FIM DA MUDANÇA ---

interface OpenEndedContent {
  prompt: string;
}

interface VideoLinksContent {
  videos: { id: string; title: string; url: string; platform: string }[];
}


// A União Discriminada continua a mesma, mas agora ela aponta
// para a nossa nova e correta interface MultipleChoiceContent.
export type Result =
  | { id: string; type: 'definition'; title: string; content: DefinitionContent }
  | { id: string; type: 'curiosities'; title: string; content: CuriositiesContent }
  | { id: string; type: 'multiple_choice_question'; title: string; content: MultipleChoiceContent }
  | { id: string; type: 'open_ended_question'; title: string; content: OpenEndedContent }
  | { id: string; type: 'video_links'; title: string; content: VideoLinksContent };