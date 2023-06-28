import Cardlisting from "./Components/Cardlisting";

function App() {
  return (
    <div className="App">
    <h1>CardListing</h1>
    <marquee behavior="smooth" direction="left" scrollamount="15">This is a demo website for volopay.</marquee>
    <Cardlisting />
    </div>
  );
}

export default App;
