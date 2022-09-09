import "./App.css";
import CountriesDisplay from "./components/CountriesDisplay";
import Header from "./components/Header";
import Input from "./components/Input";

function App() {
  return (
    <div className="App">
      <Header />
      <Input />
      <CountriesDisplay />
    </div>
  );
}

export default App;
