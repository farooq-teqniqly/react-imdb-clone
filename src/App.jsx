import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}?vs_currency=usd&order=${sortBy}&per_page=${limit}&page=1&sparkline=false&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`;

    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch data: ${res.status} ${res.statusText}`
          );
        }
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit, sortBy]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            coins={coins}
            filter={filter}
            sortBy={sortBy}
            setFilter={setFilter}
            setSortBy={setSortBy}
            limit={limit}
            setLimit={setLimit}
            loading={loading}
            error={error}
          ></HomePage>
        }
      ></Route>
      <Route path="/about" element={<AboutPage></AboutPage>}></Route>
      <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
    </Routes>
  );
}

export default App;
