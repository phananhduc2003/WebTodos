import { useParams, Link } from "react-router-dom";
import { retrieveHelloWorldPathVariableBean } from "../api/HelloWorldApi";
import { useState } from "react";
import { useAuth } from "../security/AuthContext";

function Welcome() {
  const { username } = useParams();

  const [message, setMessage] = useState(null);

  const authContext = useAuth();

  function callHelloWorldRestApi() {
    console.log("called");

    retrieveHelloWorldPathVariableBean("Duc", authContext.token)
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }

  function successfulResponse(response) {
    console.log(response);
    //setMessage(response.data)
    setMessage(response.data.message);
  }

  function errorResponse(error) {
    console.log(error);
  }
  return (
    <div>
      <p>Welcome {username}</p>
      <div>
        manager your todo - <Link to="/todos">Go here</Link>
      </div>
      <button className="btn btn-success" onClick={callHelloWorldRestApi}>
        Hello World
      </button>
      <div className="text-info">{message}</div>
    </div>
  );
}

export default Welcome;
