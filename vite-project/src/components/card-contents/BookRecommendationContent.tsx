import type { Result } from '../../types/result';

interface Props {
  content: Extract<Result, { type: 'book_recommendation' }>['content'];
}

export default function BookRecommendationContent({ content }: Props) {
  return (
    <div className="space-y-6">
      {content.recommendations.map((rec) => (
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
  );
}