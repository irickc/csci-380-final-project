import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./home/Home";
import PostDetail from "./posts/postDetail";
import PostForm from "./posts/postForm";
import PostList from "./posts/postList";
import './index.css';

const root = document.getElementById("root");
const backendBaseURL = "http://localhost:3000";

ReactDOM.createRoot(root!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='posts'>
                <Route path=':title' element={<PostDetail backendBaseURL={backendBaseURL}/>} />
                <Route path='create' element={<PostForm backendBaseURL={backendBaseURL}/>} />
                <Route path='edit/:taskTitle?' element={<PostForm backendBaseURL={backendBaseURL}/>} />
                <Route path='list' element={<PostList backendBaseURL={backendBaseURL}/>} />
            </Route>
        </Routes>
    </BrowserRouter>
);
