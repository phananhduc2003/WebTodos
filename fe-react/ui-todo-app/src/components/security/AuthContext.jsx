import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { executeBasicAuthenticationService } from "../api/HelloWorldApi";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  // const Login = (userName, password) => {
  //   if (userName === "Duc" && password === "123") {
  //     setAuthenticated(true);
  //     setUsername(userName);
  //     return true;
  //   } else {
  //     setAuthenticated(false);
  //     setUsername(null);
  //     return false;
  //   }
  // };

  const Login = async (userName, password) => {
    const baToken = "Basic " + window.btoa(userName + ":" + password);

    try {
      const response = await executeBasicAuthenticationService(baToken);

      if (response.status == 200) {
        setAuthenticated(true);
        setUsername(userName);
        setToken(baToken);
        return true;
      } else {
        Logout();

        return false;
      }
    } catch (error) {
      Logout();
      return false;
    }
  };

  const Logout = () => {
    setAuthenticated(false);
    setUsername(null);

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, Login, Logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
