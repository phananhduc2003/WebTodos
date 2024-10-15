import { updateToDosApi } from '../api/TodoApiService';
import { useParams } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';
import { useEffect, useState } from 'react';
function UpDateTodo() {
    const { id } = useParams();

    const authContext = useAuth();

    const userName = authContext.username;

    const [description, setDescription] = useState('');

    useEffect(() => updateTodo(), [id]);
    const updateTodo = () => {
        updateToDosApi(userName, id).then((response) => setDescription(response.data.description));
    };

    return (
        <div className="container">
            <h2>{`enter todo details ${id}`}</h2>
            <h2>{description}</h2>
        </div>
    );
}

export default UpDateTodo;
