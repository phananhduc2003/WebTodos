import { useParams, Link } from "react-router-dom";

function Welcome() {
  const { username } = useParams();

  return (
    <div>
      <p>Welcome {username}</p>
      <div>
        manager your todo - <Link to="/todos">Go here</Link>
      </div>
      <button className="btn btn-success">Hello World</button>
    </div>
  );
}

export default Welcome;
