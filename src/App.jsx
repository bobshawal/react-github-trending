import { useState, useRef, useCallback } from 'react';
import { useFetchRepos } from './hooks/useFetchRepos';
import './Styles.css';
import RepoItem from './components/RepoItem';
import Navbar from './components/Navbar';

function App() {
  const [page, setPage] = useState(1);
  const { repos, loading } = useFetchRepos(page);
  const observer = useRef();

  const lastRepoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      
      // Observe the last repo item
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // Load next page
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <>
      <Navbar />
      <div className="container">
        {repos.map((repo, index) => (
          <div ref={index === repos.length - 1 ? lastRepoRef : null} key={repo.id}>
            <RepoItem repo={repo} />
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </>
  );
}

export default App
