import { useContext } from "react";
import { AuthContext } from "../security/AuthContext";

function Footer() {
  const authContext = useContext(AuthContext);

  return (
    <footer className="footer">
      <div className="container">
        Footer
        <hr />
      </div>
    </footer>
  );
}

export default Footer;
