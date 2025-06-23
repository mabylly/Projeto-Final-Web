import { InputField } from "../components/InputField";
import { SelectField } from "../components/SelectField";
import { GenerateButton } from "../components/GenerateButton";
import { Globe } from "lucide-react";

interface SearchpageProps {
  topic: string;
  setTopic: (value: string) => void;
  grade: string;
  setGrade: (value: string) => void;
  onSearch: () => void; // A função que dispara a busca
  isLoading: boolean;
}

export default function Searchpage({ topic, setTopic, grade, setGrade, onSearch, isLoading }: SearchpageProps) {


  const series = [
    "1º ano (Fundamental)", "2º ano (Fundamental)", "3º ano (Fundamental)", "4º ano (Fundamental)",
    "5º ano (Fundamental)", "6º ano (Fundamental)", "7º ano (Fundamental)", "8º ano (Fundamental)", "9º ano (Fundamental)",
    "1º ano (Médio)", "2º ano (Médio)", "3º ano (Médio)"
  ];

  return (     
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Obtenha recursos para alunos sobre...
      </h2>

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
        onClick={onSearch}
        disabled={isLoading || !topic || !grade}
        >
          Gerar Recursos
      </GenerateButton>
    </main>
  );
}

