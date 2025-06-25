import type { Result } from '../../types/result';

interface Props {
  content: Extract<Result, { type: 'curiosities' }>['content'];
}

export default function CuriositiesContent({ content }: Props) {
  return (
    <ul className="list-disc list-inside space-y-2 text-gray-700">
      {content.items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}