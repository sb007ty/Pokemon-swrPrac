import logo from "./logo.svg";
import "./App.css";
import PokemonList from "./components/PokeMonList";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Link to={"poke"}>Go To Poke List</Link>
      <Outlet />
    </div>
  );
}

export default App;
