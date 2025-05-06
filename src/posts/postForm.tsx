import { useState } from "react";
import axios from 'axios';
import { useParams, useNavigate, useLocation } from "react-router";
import type { Task } from './taskType';

export default function PostForm(props: {
    backendBaseURL: string
}) {
    const navigate = useNavigate();
    const location = useLocation();
    let { taskTitle } = useParams();
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);
    const [notes, setNotes] = useState("");

    function submitForm() {
        if (taskTitle || location.pathname == '/posts/edit') {
            // edit the task on the server
            const newTask: Task = {
                title: title,
                completed: completed,
                notes: notes
            }

            if (!taskTitle) {
                taskTitle = newTask.title;
            }

            axios.put(`${props.backendBaseURL}/todo/${taskTitle}`, newTask).then((response) => {
                console.log(response);
            }).catch(e => {
                console.error(`Failed to edit task: ${e}`);
            });
        } else {
            // create a new task on the server
            const newTask: Task = {
                title: title,
                completed: completed,
                notes: notes
            }

            axios.post(`${props.backendBaseURL}/todo`, newTask).then((response) => {
                console.log(response);
            }).catch(e => {
                console.error(`Failed to create new task: ${e}`);
            });
        }

        navigate('/');
    }

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function handleCompletedChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCompleted(event.target.checked);
    }

    function handleNotesChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNotes(event.target.value);
    }

    return (
        <div className="form-container">
            <form className='task-form' action={submitForm}>
                <div className="form-row">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" placeholder="Title" onChange={handleTitleChange} required></input>
                </div>
                <div className="form-row">
                    <label htmlFor="completed">Completed?:</label>
                    <input type="checkbox" id="completed" name="completed" checked={completed} onChange={handleCompletedChange}></input>
                </div>
                <div className="form-row">
                    <label htmlFor="notes">Notes:</label>
                    <input type="text" id="notes" name="notes" placeholder="Notes" onChange={handleNotesChange}></input>
                </div>
                <input type="submit"></input>
            </form>
        </div>
    );
}