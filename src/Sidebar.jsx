import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>⚡ PokéDash</h2>

      <nav>
        <Link to="/">🏠 Dashboard</Link>
        <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
          📊 Data Source
        </a>
      </nav>

      <div className="sidebar-info">
        <p>WEB102</p>
        <span>Data Dashboard</span>
      </div>
    </aside>
  );
}

export default Sidebar;