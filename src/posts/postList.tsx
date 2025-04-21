import { useEffect, useState } from 'react';
import type { Task } from './taskType';
import axios from 'axios';
import PostDetail from './postDetail';

export default function PostList() {
    const [tasks, setTasks] = useState<Task[]>([]);

    async function fetchTasks() {
        // fetch the list of tasks
        const tasks: Task[] = await axios.get('http://localhost:3000/todo').then(response => response.data);

        // setTasks
        setTasks(tasks);
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const taskElements = tasks.map(task => {
        return (
            <li className="task-li" key={task!.id}>
                <PostDetail task={task} />
            </li>
        );
    });

    console.log(taskElements);

    return (
        <ul className='listContainer'>
            {taskElements}
        </ul>
    );
}