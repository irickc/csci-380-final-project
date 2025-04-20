import { useEffect, useState } from 'react';

export default function PostList(props: {
    post: {
        id: number,
        title: string,
        note: string,
        completed: boolean,
    }
}) {
    const [posts, setPosts] = useState([]);
    let postElements = [];

    function fetchPosts() {
        // fetch the list of posts
        // setPosts
    }

    useEffect(() => {
        fetchPosts();

        // create the post elements (PostDetail components)
    });

    return (
        <div className="posts-list">
            <ul>
                {postElements}
            </ul>
        </div>
    );
}