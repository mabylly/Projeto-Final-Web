import { useState } from "react";
import Header from "../components/Header";
import { InputField } from "../components/InputField";
import { SelectField } from "../components/SelectField";
import { GenerateButton } from "../components/GenerateButton";
import { Globe } from "lucide-react";

function Searchpage() {
  const [tema, setTema] = useState("");
  const [serie, setSerie] = useState("");

  const series = [
    "1º ano (Fundamental)", "2º ano (Fundamental)", "3º ano (Fundamental)", "4º ano (Fundamental)",
    "5º ano (Fundamental)", "6º ano (Fundamental)", "7º ano (Fundamental)", "8º ano (Fundamental)", "9º ano (Fundamental)",
    "1º ano (Médio)", "2º ano (Médio)", "3º ano (Médio)"
  ];

  return (
    <div className="min-h-screen bg-yellow-50 font-sans">
      <Header isLoggedIn={true} />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Obtenha recursos para alunos sobre...
        </h2>

        <InputField 
          label="Literalmente qualquer coisa"
          placeholder="Digite um assunto ou tema"
          icon={<Globe size={18} className="text-yellow-500" />} 
          value={tema}
          onChange={(e) => setTema(e.target.value)}
        />

        <SelectField 
          label="Personalize seus recursos"
          options={series}
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
        />

        <GenerateButton />
      </main>
    </div>
  );
}

export default Searchpage;
