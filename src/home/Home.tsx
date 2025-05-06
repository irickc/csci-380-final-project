import { Link } from 'react-router';
import './Home.css';

export default function Home() {
    return (
        <div className="home">
            <Link className="homeLink" to='/posts/create'>New Post</Link>
            <Link className="homeLink" to='/posts/edit'>Edit Post</Link>
            <Link className="homeLink" to='posts/list'>Post List</Link>
        </div>
    )
}
