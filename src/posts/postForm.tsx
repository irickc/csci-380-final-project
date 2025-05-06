import React, { useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router";
import type { Task } from './taskType';

export default function PostForm() {
    const navigate = useNavigate();
    const { taskTitle } = useParams();
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);
    const [notes, setNotes] = useState("");

    function submitForm() {
        if (taskTitle) {
            // edit the task on the server
            const newTask: Task = {
                title: title,
                completed: completed,
                notes: notes
            }

            axios.put(`http://localhost:3000/todo/${taskTitle}`, newTask).then((response) => {
                console.log(response);
            }).catch(e => {
                console.error(`Failed to create new post: ${e}`);
            });
        } else {
            // create a new task on the server
            const newTask: Task = {
                title: title,
                completed: completed,
                notes: notes
            }

            axios.post('http://localhost:3000/todo', newTask).then((response) => {
                console.log(response);
            }).catch(e => {
                console.error(`Failed to create new post: ${e}`);
            });
        }

        navigate('/');
    }

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
        console.log(title);
    }

    function handleCompletedChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCompleted(event.target.checked);
    }

    function handleNotesChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNotes(event.target.value);
        console.log(notes);
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