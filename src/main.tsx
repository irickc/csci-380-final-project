import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./home/Home";
import PostDetail from "./posts/postDetail";
import PostForm from "./posts/postForm";
import PostList from "./posts/postList";
import './index.css';

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='posts'>
                <Route path=':id' element={<PostDetail />} />
                <Route path='create' element={<PostForm />} />
                <Route path='edit/:id' element={<PostForm />} />
                <Route path='list' element={<PostList />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
