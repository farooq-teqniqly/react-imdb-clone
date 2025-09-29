import { useState, useEffect, useCallback, useRef } from "react";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CoinDetailsPage } from "./pages/CoinDetailsPage";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const intervalRef = useRef(null);

  const fetchCoins = useCallback(async () => {
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}?vs_currency=usd&order=${sortBy}&per_page=${limit}&page=1&sparkline=false&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`;

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
  }, [limit, sortBy]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        fetchCoins();
      }, 30000); // 30 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRefresh, fetchCoins]);

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
            autoRefresh={autoRefresh}
            setAutoRefresh={setAutoRefresh}
          ></HomePage>
        }
      ></Route>

      <Route path="/about" element={<AboutPage></AboutPage>}></Route>

      <Route
        path="/coins/:id"
        element={<CoinDetailsPage></CoinDetailsPage>}
      ></Route>

      <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
    </Routes>
  );
}

export default App;
