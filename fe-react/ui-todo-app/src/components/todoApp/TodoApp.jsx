import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./TodoApp.css";
import Welcome from "../home/Welcome";
import Login from "../login/Login";
import Error from "../error/Error";
import ListTodo from "../listTodo/ListTodo";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import AuthProvider, { useAuth } from "../security/AuthContext";
import Logout from "../Logout/Logout";
import UpDateTodo from "../upDateTodos/UpdateTodo";

const AuthenticatedRoute = ({ children }) => {
  const authContext = useAuth();
  if (authContext.isAuthenticated) {
    return children;
  }
  return <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/logout"
            element={
              <AuthenticatedRoute>
                <Logout />
              </AuthenticatedRoute>
            }
          />

          <Route
            path="/welcome/:username"
            element={
              <AuthenticatedRoute>
                <Welcome />
              </AuthenticatedRoute>
            }
          />

          <Route
            path="/todos"
            element={
              <AuthenticatedRoute>
                <ListTodo />
              </AuthenticatedRoute>
            }
          />

          <Route
            path="/todo/:id"
            element={
              <AuthenticatedRoute>
                <UpDateTodo />
              </AuthenticatedRoute>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default App;
