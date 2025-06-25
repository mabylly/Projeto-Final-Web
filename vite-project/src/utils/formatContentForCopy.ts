  import type  { Result } from '../types/result';
  
  // Função para formatar o conteúdo para cópia
  export function formatContentForCopy (result: Result): string {
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