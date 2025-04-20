import { Link } from 'react-router';
import './Home.css';

export default function Home() {
    return (
        <div className="home">
            <Link to='/posts/1'>Post 1</Link>
            <Link to='/posts/create'>New Post</Link>
            <Link to='/posts/edit'>Edit Post</Link>
            <Link to='posts/list'>Post List</Link>
        </div>
    )
}
