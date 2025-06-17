
import Header from "../components/Header";
import ResultsDisplay from "../components/ResultsDisplay";

const recursoSearch="Ciclo da agua";
const serieSearch="6º ano";



function Resultpage() {
  return (  
    <>
    <Header isLoggedIn={true} />
    <main>
      <div id="title">
        <h1>Recursos para: {recursoSearch} - {serieSearch}</h1>
      </div>

      <ResultsDisplay/>      
    </main>
    </>
  );
} 

export default Resultpage;