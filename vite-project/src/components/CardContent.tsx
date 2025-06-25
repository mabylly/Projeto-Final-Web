
import type { Result } from "../types/result";
import DefinitionContent from "./card-contents/DefinitionContent";
import CuriositiesContent from "./card-contents/CuriositiesContent";
import MultipleChoiceContent from "./card-contents/MultipleChoiceContent";
import OpenEndedContent from "./card-contents/OpenEndedContent";
import BookRecommendationContent from "./card-contents/BookRecommendationContent";

interface Props {
  result: Result;
  showAnswers: boolean;
}

export default function CardContent({ result, showAnswers }: Props) {
  switch (result.type) {
    case 'definition':
      return <DefinitionContent content={result.content} />;
    case 'curiosities':
      return <CuriositiesContent content={result.content} />;
    case 'multiple_choice_question':
      return <MultipleChoiceContent content={result.content} showAnswers={showAnswers} />;
    case 'open_ended_question':
      return <OpenEndedContent content={result.content} />;
    case 'book_recommendation':
      return <BookRecommendationContent content={result.content} />;
    default:
      return null;
  }
}