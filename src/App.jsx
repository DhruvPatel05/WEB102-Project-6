import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";
import "./App.css";
import Sidebar from "./Sidebar";
import Charts from "./Charts";

function Dashboard() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=50"
        );

        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (item) => {
            const response = await fetch(item.url);
            return await response.json();
          })
        );

        setPokemon(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      typeFilter === "all" ||
      item.types.some((type) => type.type.name === typeFilter);

    return matchesSearch && matchesType;
  });

  const averageHeight =
    pokemon.length > 0
      ? (
        pokemon.reduce((total, item) => total + item.height, 0) /
pokemon.length / 10
        ).toFixed(1)
      : 0;

  const averageWeight =
    pokemon.length > 0
      ? (
        pokemon.reduce((total, item) => total + item.weight, 0) /
pokemon.length / 10
        ).toFixed(1)
      : 0;

  const types = [
    ...new Set(
      pokemon.flatMap((item) =>
        item.types.map((type) => type.type.name)
      )
    ),
  ].sort();

  return (
    <div className="app-layout">
    <Sidebar />
    <div className="dashboard">
      <header>
        <h1>⚡ Pokémon Data Dashboard</h1>
        <p>Explore Pokémon statistics, types, height, and weight.</p>
      </header>

      <div className="stats">
        <div className="stat-card">
          <h2>{pokemon.length}</h2>
          <p>Total Pokémon</p>
        </div>

        <div className="stat-card">
          <h2>{averageHeight}</h2>
         <p>Average Height (m)</p>
        </div>

        <div className="stat-card">
          <h2>{averageWeight}</h2>
          <p>Average Weight (kg)</p>
        </div>
      </div>
      {!loading && <Charts pokemon={pokemon} />}

      <div className="filters">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
        >
          <option value="all">All Types</option>

          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="loading">Loading Pokémon...</p>
      ) : (
        <div className="pokemon-list">
          <div className="list-header">
            <span>Pokémon</span>
            <span>Type</span>
            <span>Height (m)</span>
            <span>Weight (kg)</span>
          </div>

          {filteredPokemon.map((item) => (
            <div className="pokemon-row" key={item.id}>
              <div className="pokemon-name">
              <img
                src={item.sprites.front_default}
                alt={item.name}
              />

              <Link to={`/pokemon/${item.id}`}>
                {item.name}
              </Link>
            </div>

              <span>
                {item.types
                  .map((type) => type.type.name)
                  .join(", ")}
              </span>

             <span>{(item.height / 10).toFixed(1)} m</span>
            <span>{(item.weight / 10).toFixed(1)} kg</span>
            </div>
          ))}

          {filteredPokemon.length === 0 && (
            <p className="no-results">No Pokémon found.</p>
          )}
        </div>
      )}
    </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
    </Routes>
  );
}

export default App;