import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const getDescriptionSnippet = (descriptionHtml) => {
  if (
    typeof descriptionHtml !== "string" ||
    descriptionHtml.trim().length === 0
  ) {
    return null;
  }

  let textContent = descriptionHtml;
  if (typeof window !== "undefined" && "DOMParser" in window) {
    const parser = new DOMParser();
    textContent =
      parser.parseFromString(descriptionHtml, "text/html").body.textContent ??
      "";
  } else {
    textContent = descriptionHtml.replace(/<[^>]+>/g, " ");
  }

  const normalized = textContent.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return null;
  }

  const firstSentenceMatch = normalized.match(/[^.?!]+[.?!]/);
  const sentence = (firstSentenceMatch?.[0] ?? normalized).trim();
  return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
};

export const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const descriptionSnippet = coin
    ? getDescriptionSnippet(coin.description?.en)
    : null;

  return !loading && !error && coin ? (
    <>
      <img
        src={coin.image?.large}
        alt={coin.name}
        onError={(e) => (e.target.style.display = "none")}
      />
      <p>{descriptionSnippet || "No description available"}</p>
    </>
  ) : null;
};
