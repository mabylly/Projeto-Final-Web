import Resultpage from "./pages/Resultpage";
import Searchpage from "./pages/Searchpage";
import About from "./pages/About";

//temporario enquanto nao temos sistema de rotas
const trocarPagina=1; // 1 para Searchpage, 2 para Resultpage

function App() {
  return (
    <>
      {trocarPagina === 3 && <Searchpage />}
      {trocarPagina === 2 && <Resultpage />}
      {trocarPagina === 1 && <About />}
    </>
  );
}

export default App;
