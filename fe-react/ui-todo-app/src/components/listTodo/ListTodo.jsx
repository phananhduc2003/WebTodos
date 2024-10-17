import {
  deleteToDosApi,
  retrieveAllToDosForUsernameApi,
} from "../api/TodoApiService";
import { useAuth } from "../security/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ListTodo() {
  const navigate = useNavigate();

  const authContext = useAuth();
  const userName = authContext.username;

  const [todos, setTodos] = useState([]);
  const [message, setrMessage] = useState("");

  useEffect(() => refreshTodos(), []);

  const refreshTodos = () => {
    retrieveAllToDosForUsernameApi(userName)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  };

  const deleteTodo = (id) => {
    deleteToDosApi(userName, id)
      .then(setrMessage(`Delete of todo with ${id} successful`))
      .then(() => refreshTodos());
  };

  const updateTodo = (id) => {
    console.log("click " + id);
    navigate(`/todo/${id}`);
  };

  const addNewTodo = () => {
    navigate("/todo/-1");
  };

  // const todos = [
  //   { id: 1, description: "A", done: false, targetDate: targetDate },
  //   { id: 2, description: "B", done: false, targetDate: targetDate },

  //   { id: 3, description: "C", done: false, targetDate: targetDate },
  // ];

  return (
    <div className="container">
      <h1>Things You Want To Do!</h1>
      {message && <div className="alert alert-success">{message}</div>}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>UpDate</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                {/* <td>{todo.done.toString()}</td> */}
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      updateTodo(todo.id);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button className="btn btn-success m-4" onClick={addNewTodo}>
            Add new todo
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListTodo;
