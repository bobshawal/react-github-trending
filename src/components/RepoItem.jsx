const RepoItem = ({ repo }) => (
  <div className="repo-card">
    <img src={repo.owner.avatar_url} alt="avatar" className="avatar" />
    <div>
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <p>⭐ {repo.stargazers_count} | 👤 {repo.owner.login}</p>
    </div>
  </div>
);

export default RepoItem;
