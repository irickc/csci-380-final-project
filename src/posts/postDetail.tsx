import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import type { Task } from './taskType';
import axios from 'axios';

export default function PostDetail(props: {
    backendBaseURL: string,
    task?: Task
}) {
    const navigate = useNavigate();
    const { title } = useParams();
    const [task, setTask] = useState<Task>(undefined);

    async function fetchTask(title: string) {
        const task = await axios.get(`${props.backendBaseURL}/todo/${title}`).then(response => response.data);

        setTask(task);
    }

    async function deleteTask() {
        await axios.delete(`${props.backendBaseURL}/todo/${task?.title}`);

        navigate('/');
    }

    function viewTask() {
        navigate(`/posts/${task?.title}`);
    }

    useEffect(() => {
        if (props.task) {
            setTask(props.task);
        } else if (title) {
            fetchTask(title);
        }

        console.log(task);
    }, []);

    return (
        <div className="task-container">
            <div className="task-card">
                <div className="task-header">
                    <h2 className="task-title" onClick={viewTask}>{task?.title}</h2>
                    <Link className="edit-link" to={`/posts/edit/${task?.title}`}>Edit</Link>
                </div>
                <p>{task?.notes}</p>
                <p>{task?.completed ? "Completed" : "Not Completed"}</p>
                <button type='button' onClick={deleteTask}>Delete</button>
            </div>
        </div>
    );
}