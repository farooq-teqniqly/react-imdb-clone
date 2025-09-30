import { useState, useEffect, useCallback, useRef } from "react";
import { Routes, Route } from "react-router-dom";
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
    const abortController = new AbortController();

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, { signal: abortController.signal });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch data: ${res.status} ${res.statusText}`
        );
      }
      const data = await res.json();
      setCoins(data);
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted");
        return;
      }
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }

    return abortController;
  }, [limit, sortBy]);

  useEffect(() => {
    fetchCoins();

    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [limit, sortBy]);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        fetchCoins();
      }, 30000); // 30 seconds
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoRefresh]);

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
      />

      <Route path="/about" element={<AboutPage></AboutPage>} />

      <Route path="/coins/:id" element={<CoinDetailsPage></CoinDetailsPage>} />

      <Route path="*" element={<NotFoundPage></NotFoundPage>} />
    </Routes>
  );
}

export default App;
