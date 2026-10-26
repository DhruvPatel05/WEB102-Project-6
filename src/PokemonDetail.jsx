import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (loading) {
    return <p>Loading Pokémon details...</p>;
  }

  if (!pokemon) {
    return <p>Pokémon not found.</p>;
  }

  return (
     <div className="app-layout">
    <Sidebar />
    <div className="detail-page">
      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>

      <div className="detail-card">
        <div className="detail-header">
          <img
            src={
              pokemon.sprites.other["official-artwork"]
                .front_default
            }
            alt={pokemon.name}
          />

          <div>
            <p className="pokemon-number">
              #{pokemon.id.toString().padStart(3, "0")}
            </p>

            <h1>
              {pokemon.name.charAt(0).toUpperCase() +
                pokemon.name.slice(1)}
            </h1>

            <p>
              <strong>Type:</strong>{" "}
              {pokemon.types
                .map((type) => type.type.name)
                .join(", ")}
            </p>

            <p>
              <strong>Height:</strong>{" "}
              {(pokemon.height / 10).toFixed(1)} m
            </p>

            <p>
              <strong>Weight:</strong>{" "}
              {(pokemon.weight / 10).toFixed(1)} kg
            </p>

            <p>
              <strong>Base Experience:</strong>{" "}
              {pokemon.base_experience}
            </p>
          </div>
        </div>

        <div className="detail-section">
          <h2>Abilities</h2>

          <ul>
            {pokemon.abilities.map((item) => (
              <li key={item.ability.name}>
                {item.ability.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="detail-section">
          <h2>Base Stats</h2>

          <div className="stats-grid">
            {pokemon.stats.map((item) => (
              <div
                className="detail-stat"
                key={item.stat.name}
              >
                <span>{item.stat.name}</span>
                <strong>{item.base_stat}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default PokemonDetail;