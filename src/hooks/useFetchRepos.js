import axios from 'axios';
import { useState, useEffect } from 'react';

export const useFetchRepos = (page) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      const DATE = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      try {
        const res = await axios.get(
          `https://api.github.com/search/repositories?q=created:>${DATE}&sort=stars&order=desc&page=${page}`
        );
        setRepos((prev) => [...prev, ...res.data.items]);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [page]);

  return { repos, loading };
};
