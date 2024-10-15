import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const authContext = useAuth();

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (authContext.Login(userName, password)) {
      navigate(`/welcome/${userName}`);
    } else {
      console.log("fair success");
    }
  };

  return (
    <div className="LoginForm">
      <div>
        <label>User Name:</label>
        <input type="text" name="username" onChange={handleUserName} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" onChange={handlePassword} />
      </div>
      <div>
        <button type="button" name="login" onClick={handleSubmit}>
          login
        </button>
      </div>
    </div>
  );
}

export default Login;
