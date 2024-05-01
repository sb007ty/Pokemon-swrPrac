import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
const fetcher = async (...args) => {
  await delay(0);
  const res = await axios.get(args);
  return res.data;
};

const Pokemon = ({ pokemon }) => {
  // const { name } = pokemon;
  const [value, setValue] = useState(0);
  const { name } = useParams();
  // console.log(name);
  const url = "https://pokeapi.co/api/v2/pokemon/" + name;

  const { data, error, mutate } = useSWRImmutable(url, fetcher, {
    // revalidateOnMount: true,
    // dedupingInterval: 0,
  });
  console.log(data, " rerender");

  if (error) return <h1>Something went wrong!</h1>;
  if (!data) return <h1>Loading...</h1>;
  function changeName() {
    setValue(Math.random());
    // mutate(
    //   { ...data, name: "mutate-test" },
    //   {
    //     revalidate: false,
    //   }
    // );
  }
  return (
    <div className="Card">
      <button onClick={changeName}>Test Mutate -{value}</button>
      <span className="Card--id">#{data.id}</span>
      <img
        className="Card--image"
        src={data.sprites.front_default}
        alt={data.name}
      />
      <h1 className="Card--name">{data.name}</h1>
      <span className="Card--details">
        {data.types.map((poke) => poke.type.name).join(", ")}
      </span>
    </div>
  );
};
export default Pokemon;
