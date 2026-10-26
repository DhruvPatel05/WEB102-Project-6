import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";

function Charts({ pokemon }) {
  // Count how many Pokemon belong to each type
  const typeCounts = {};

  pokemon.forEach((item) => {
    item.types.forEach((type) => {
      const typeName = type.type.name;

      typeCounts[typeName] = (typeCounts[typeName] || 0) + 1;
    });
  });

  const typeData = Object.entries(typeCounts).map(
    ([type, count]) => ({
      type,
      count,
    })
  );

  // Height and weight data for scatter chart
  const sizeData = pokemon.map((item) => ({
    name: item.name,
    height: item.height / 10,
    weight: item.weight / 10,
  }));

  return (
    <div className="charts-section">
      <div className="chart-card">
        <h2>Pokémon by Type</h2>
        <p>Number of Pokémon belonging to each type.</p>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={typeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h2>Height vs. Weight</h2>
        <p>
          Relationship between Pokémon height and weight.
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              dataKey="height"
              name="Height"
              unit=" m"
            />

            <YAxis
              type="number"
              dataKey="weight"
              name="Weight"
              unit=" kg"
            />

            <Tooltip cursor={{ strokeDasharray: "3 3" }} />

            <Scatter
              name="Pokémon"
              data={sizeData}
              fill="#2563eb"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;