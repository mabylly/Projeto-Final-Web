import Resultpage from "./pages/Resultpage";
import Searchpage from "./pages/Searchpage";

//temporario enquanto nao temos sistema de rotas
const trocarPagina=2; // 1 para Searchpage, 2 para Resultpage

function App() {
  return (
    <>
      {trocarPagina === 1 && <Searchpage />}
      {trocarPagina === 2 && <Resultpage />}
    </>
  );
}

export default App;
