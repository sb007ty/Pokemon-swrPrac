import React from "react";
import useSWR from "swr";
import Pokemon from "./Pokemon";
import useSWRImmutable from "swr/immutable";
import { Link } from "react-router-dom";

const url = "https://pokeapi.co/api/v2/pokemon";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function PokeMonList() {
  const { data: result, error } = useSWRImmutable(url, fetcher);

  if (error) return <h1>Something went wrong!</h1>;
  if (!result) return <h1>Loading...</h1>;

  return (
    <main className="App">
      <h1>Pokedex</h1>
      <div>
        {result.results.map((pokemon) => {
          return (
            <>
              <Link to={pokemon.name}>{pokemon.name}</Link>
              <hr />
            </>
          );
        })}
      </div>
    </main>
  );
}
export default PokeMonList;
