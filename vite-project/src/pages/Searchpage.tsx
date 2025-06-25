import { InputField } from "../components/InputField";
import { SelectField } from "../components/SelectField";
import { GenerateButton } from "../components/GenerateButton";
import { Globe } from "lucide-react";
import { series } from "../constants/index"


interface SearchpageProps {
  topic: string;
  setTopic: (value: string) => void;
  grade: string;
  setGrade: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export default function Searchpage({ topic, setTopic, grade, setGrade, onSearch, isLoading }: SearchpageProps) {

  // função 'handleSubmit' para o formulário.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Impede o recarregamento padrão da página
    onSearch(); // Chama a função de busca que veio do pai
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Obtenha recursos para alunos sobre...
      </h2>

      {/* Envolvemos tudo em um <form> com o nosso novo handler */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Literalmente qualquer coisa"
          placeholder="Digite um assunto ou tema"
          icon={<Globe size={18} className="text-yellow-500" />}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <SelectField
          label="Personalize seus recursos"
          options={series}
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Selecione uma série" 
        />

        <GenerateButton 
          // O onClick removido e o botão agora é do tipo 'submit' por padrão
          disabled={isLoading || !topic || !grade}
        >
          {/* O texto do botão muda com base em 'isLoading' */}
          {isLoading ? 'Gerando...' : 'Gerar Recursos'}
        </GenerateButton>
      </form>
    </main>
  );
}