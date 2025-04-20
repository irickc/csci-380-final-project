import {useState} from 'react';

export default function PostDetail(props: {
    post: {
        id: number,
        title: string,
        note: string,
        completed: boolean,
    }
}) {
    const [completed, setCompleted] = useState(props.post.completed);

    function toggleCompleted() {
        setCompleted(!completed);

        // update completion on the server
        // roll back if it fails?
    }

    return (
        <div className="post-container">
            <h2 className="post-title">Title</h2>
            <p className="post-note">Notes</p>
            <button type="button" onClick={toggleCompleted}></button>
        </div>
    );
}