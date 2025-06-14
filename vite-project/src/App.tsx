import Resultpage from "./pages/Resultpage";
import Searchpage from "./pages/Searchpage";

//temporario enquanto nao temos sistema de rotas
const trocarPagina=2; // 1 para Loginpage, 2 para Searchpage, 3 para Resultpage

function App() {
  return (
    <>
      {/* trocarPagina === 1 && <LoginPage /> */} {/* criar pagina de login */}
      {trocarPagina === 2 && <Searchpage />}
      {trocarPagina === 3 && <Resultpage />}
    </>
  );
}

export default App;
