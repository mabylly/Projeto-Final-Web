import Header from "../components/Header";

const recursoSearch= "Matemática"; // Exemplo de recurso pesquisado

function Searchpage() {
  return (  
    <>
    <Header isLoggedIn={true} />
    <main>
      <div id="title">
        <h1>Recursos para: {recursoSearch}</h1>
      </div>
    </main>
    </>
  );
} 

export default Searchpage;