import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data); // Inspect the API response
        setArticles(data.articles || []); // Ensure articles exist
      } catch (err) {
        setError(err.message);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News!</span>
      </h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title || "No title available"}
            description={news.description || "No description available."}
            src={news.urlToImage || "https://via.placeholder.com/150"}
            url={news.url || "#"}
          />
        ))}
      </div>
    </>
  );
};

export default NewsBoard;
