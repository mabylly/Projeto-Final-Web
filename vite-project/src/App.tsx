import Resultpage from "./pages/Resultpage";
import Searchpage from "./pages/Searchpage";
import About from "./pages/About";

//temporario enquanto nao temos sistema de rotas
const trocarPagina=1; // 1 para Searchpage, 2 para Resultpage, 3 para About

function App() {
  return (
    <>
      {trocarPagina === 1 && <Searchpage />}
      {trocarPagina === 2 && <Resultpage />}
      {trocarPagina === 3 && <About />}
    </>
  );
}

export default App;
