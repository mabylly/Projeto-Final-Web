import type { Result } from '../../types/result';
import { Check } from 'lucide-react';

interface Props {
  content: Extract<Result, { type: 'multiple_choice_question' }>['content'];
  showAnswers: boolean;
}

export default function MultipleChoiceContent({ content, showAnswers }: Props) {
  return (
    <div className="space-y-6"> 
      {content.questions.map((q, index) => (
        <div key={q.id}>
          <p className="font-medium">{`${index + 1}. ${q.question}`}</p>
          <ul className="space-y-2 mt-2">
            {q.options.map((option, optionIndex) => {
              const isCorrect = optionIndex === q.correctAnswerIndex;
              return (
                <li 
                  key={option}
                  className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                    showAnswers && isCorrect ? 'bg-green-50' : ''
                  }`}
                >
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
  );
}