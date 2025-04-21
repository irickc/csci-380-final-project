import { Link } from 'react-router';
import './Home.css';

export default function Home() {
    return (
        <div className="home">
            <Link to='/posts/create'>New Post</Link>
            <Link to='/posts/create/submit-assignment3'>Edit Post</Link>
            <Link to='posts/list'>Post List</Link>
        </div>
    )
}
