import {
  retrieveToDosApi,
  updateToDosApi,
  createToDosApi,
} from "../api/TodoApiService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import moment from "moment";
function RetrieveTodo() {
  const navigate = useNavigate();

  const { id } = useParams();

  const authContext = useAuth();

  const userName = authContext.username;

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => retrieveToDo(), [id]);

  const retrieveToDo = () => {
    if (id != -1) {
      retrieveToDosApi(userName, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  };

  const onSubmit = (values) => {
    console.log + values;
    const todo = {
      id: id,
      username: userName,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };

    if (id == -1) {
      createToDosApi(userName, todo)
        .then(() => {
          navigate("/todos");
        })
        .catch((error) => console.log(error));
    } else {
      updateToDosApi(userName, id, todo)
        .then(() => {
          navigate("/todos");
        })
        .catch((error) => console.log(error));
    }
  };

  const validate = (values) => {
    let errors = {
      //   description: "Enter a valid description",
      //   targetDate: "Enter a valid targetDate",
    };
    if (values.description.length < 5) {
      errors.description = "nhap lai description di may`";
    }

    if (
      values.targetDate.length == null ||
      values.targetDate == "" ||
      !moment(values.targetDate).isValid()
    ) {
      errors.targetDate = "nhap lai targetDate di may`";
    }

    return errors;
  };

  return (
    <div className="container">
      <h2>{`enter todo details ${id}`}</h2>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />

              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                ></Field>
              </fieldset>

              <fieldset className="form-group">
                <label>Target Date</label>
                <Field
                  type="Date"
                  className="form-control"
                  name="targetDate"
                ></Field>
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RetrieveTodo;
