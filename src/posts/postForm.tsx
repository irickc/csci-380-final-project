import { useState } from "react";

export default function PostForm(props: {
    post: {
        id: number,
        title: string,
        completed: boolean,
        notes: string
    }
}) {
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);
    const [notes, setNotes] = useState("");

    // set inital values if post exists
    if (props.post) {
        setTitle(props.post.title);
        setCompleted(props.post.completed);
        setNotes(props.post.notes);
    }

    function submitForm() {
        console.log("Submitting");
        // validate input
        if (props.post) {
            // create a new task on the server
            return;
        } else {
            // edit the task on the server
            return;
        }
    }

    function handleTitleChange(event) {
        setTitle(event.target.value);
        console.log(title);
    }

    function handleCompletedChange(event) {
        setCompleted(event.target.checked);
    }

    function handleNotesChange(event) {
        setNotes(event.target.value);
        console.log(notes);
    }

    return (
        <form className='post-form' action={submitForm}>
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
    );
}