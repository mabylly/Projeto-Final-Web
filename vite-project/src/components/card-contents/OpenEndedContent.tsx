import type { Result } from '../../types/result';

interface Props {
  content: Extract<Result, { type: 'open_ended_question' }>['content'];
}

export default function OpenEndedContent({ content }: Props) {
  return (
    <div className="space-y-6">
      {content.prompts.map((p, index) => (
        <div key={p.id}>
          <p className="font-medium text-gray-800">{`${index + 1}. ${p.prompt}`}</p>
        </div>
      ))}
    </div>
  );
}