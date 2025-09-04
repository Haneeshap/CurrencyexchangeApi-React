
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyNewsPanel = ({ currencyCode }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${currencyCode}+inflation+central+bank&sortBy=publishedAt&language=en&apiKey=YOUR_API_KEY`
        );
        setNews(response.data.articles.slice(0, 5)); // Top 5 articles
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currencyCode]);

  return (
    <div className="news-panel">
      <h3>📰 News on {currencyCode}</h3>
      {loading ? <p>Loading...</p> : (
        <ul>
          {news.map((item, index) => (
            <li key={index}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencyNewsPanel;
