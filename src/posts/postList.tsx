import { useEffect, useState } from 'react';
import type { Task } from './taskType';
import axios from 'axios';
import PostDetail from './postDetail';

export default function PostList(props: {
    backendBaseURL: string
}) {
    const [tasks, setTasks] = useState<Task[]>([]);

    async function fetchTasks() {
        // fetch the list of tasks
        const tasks: Task[] = await axios.get(`${props.backendBaseURL}/todo`).then(response => response.data);

        // setTasks
        setTasks(tasks);
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const taskElements = tasks.map(task => {
        return (
            <li className="task-li" key={task!.id}>
                <PostDetail task={task} backendBaseURL={props.backendBaseURL} />
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