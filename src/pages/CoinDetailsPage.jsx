import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = `${import.meta.env.VITE_API_COIN_DETAILS_URL}/${id}`;
    const abortController = new AbortController();

    const fetchCoin = async () => {
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
        setCoin(data);
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCoin();

    return () => {
      abortController.abort();
    };
  }, [id]);

  return (
    <>
      <h1>{coin ? `${coin.name} (${coin.symbol})` : "Coin Details"}</h1>

      {loading && <p>Loading...</p>}
      {error && <div className="text-danger">{error}</div>}

      {!loading && !error && coin && (
        <>
          <img
            src={coin.image?.large}
            alt={coin.name}
            onError={(e) => (e.target.style.display = "none")}
          />
          <p>
            {coin.description?.en?.split(".")[0] || "No description available"}.
          </p>
        </>
      )}
    </>
  );
};
