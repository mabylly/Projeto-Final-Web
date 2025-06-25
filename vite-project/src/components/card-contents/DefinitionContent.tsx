import type { Result } from '../../types/result';

interface Props {
  content: Extract<Result, { type: 'definition' }>['content'];
}

export default function DefinitionContent({ content }: Props) {
  return <p className="text-gray-700 leading-relaxed">{content.text}</p>;
}