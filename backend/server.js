import hapi from '@hapi/hapi';

let tasks = [
    { id: 1, title: "submit-assignment-3", completed: false, notes: "See eCampus for details" },
    { id: 2, title: "feed-dog", completed: false, notes: "" },
    { id: 3, title: "buy-groceries", completed: false, notes:"Eggs, milk, cereal" }
];

async function startServer() {
    const server = hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ["http://127.0.0.1:5173"]
            }
        }
    });

    server.route([
        // create route
        {
            method: 'POST',
            path: '/todo',
            handler: (request, h) => {
                try {
                    const { title, completed, notes } = request.payload;
                    let cleanedTitle = title.replaceAll(' ', '-');
                    cleanedTitle = cleanedTitle.toLowerCase();
                    const newTask = {
                        id: tasks.length + 1,
                        title: cleanedTitle,
                        completed: completed,
                        notes: notes
                    }

                    tasks.push(newTask);
                    return h.response(`Created ${JSON.stringify(newTask)}\n`).code(201);
                } catch (err) {
                    return h.response(`Failed to create the new task: ${err}\n`).code(500);
                }
            }
        },

        // read routes
        {
            method:'GET',
            path: '/todo',
            handler: (request, h) => {
                try {
                    const responseString = JSON.stringify(tasks);

                    return h.response(`${responseString}\n`).code(200);
                } catch (err) {
                    return h.response(`Failed to retreive tasks: ${err}`);
                }
            }
        },

        {
            method: 'GET',
            path: '/todo/{title}',
            handler: (request, h) => {
                try {
                    const taskTitle = request.params.title;
                    const task = tasks.find(task => task.title === taskTitle);

                    if (task) {
                        return h.response(JSON.stringify(task) + '\n').code(200);
                    } else {
                        return h.response("No task with that title was found\n").code(404);
                    }
                } catch (err) {
                    return h.response(`Failed to get the task: ${err}\n`).code(500);
                }
            }
        },

        // update route
        {
            method: 'PUT',
            path: '/todo/{title}',
            handler: (request, h) => {
                try {
                    const taskTitle = request.params.title;
                    const { title, completed, notes } = request.payload;
                    const task = tasks.find(task => task.title === taskTitle);

                    if (task) {
                        task.title = title;
                        task.completed = completed;
                        task.notes = notes;

                        return h.response(`Updated ${JSON.stringify(task)}\n`).code(200);
                    } else {
                        return h.response("No task with that title was found\n").code(404);
                    }
                } catch (err) {
                    return h.response(`Failed to update the task: ${err}\n`).code(500);
                }
            }
        },

        // delete route
        {
            method: 'DELETE',
            path: '/todo/{title}',
            handler: (request, h) => {
                try {
                    const taskTitle = request.params.title;
                    const taskIndex = tasks.findIndex(task => task.title === taskTitle);
                    const task = tasks.find(task => task.title === taskTitle);

                    if (task) {
                        tasks.splice(taskIndex, 1);
                        return h.response(`Deleted ${JSON.stringify(task)}\n`).code(200);
                    } else {
                        return h.response("No task with that title was found\n").code(404);
                    }
                } catch (err) {
                    return h.response(`Failed to delete the task: ${err}\n`).code(500);
                }
            }
        }
    ]);

    await server.start();
    console.log(`Server running ${server.info.uri}`);
}

startServer();