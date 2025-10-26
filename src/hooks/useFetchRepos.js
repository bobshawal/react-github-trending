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
      const res = await fetch(
        `https://api.github.com/search/repositories?q=created:>${DATE}&sort=stars&order=desc&page=${page}`
      );
      const data = await res.json();
      setRepos((prev) => [...prev, ...data.items]);
      setLoading(false);
    };
    fetchRepos();
  }, [page]);

  return { repos, loading };
};
