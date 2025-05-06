import hapi from '@hapi/hapi';
import Task from './Task.js';
import mongoose from 'mongoose';
import path from 'path';
import * as inert from '@hapi/inert';

mongoose.connect("mongodb://127.0.0.1:27017/csci380?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.0");

let tasks = [
    new Task({ title: "submit-assignment-3", completed: false, notes: "See eCampus for details" }),
    new Task({ title: "feed-dog", completed: false, notes: "" }),
    new Task({ title: "buy-groceries", completed: false, notes:"Eggs, milk, cereal" })
];

async function seedDB() {
    for (const task of tasks) {
        await task.save();
    }
}

async function startServer() {
    const server = hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: true
        }
    });

    await server.register(inert);

    server.route([
        // create route
        {
            method: 'POST',
            path: '/todo',
            handler: async (request, h) => {
                try {
                    const { title, completed, notes } = request.payload;
                    const newTask = await Task.create({
                        title: title,
                        completed: completed,
                        notes: notes
                    });

                    const returnObject = {
                        title: newTask.title,
                        completed: newTask.completed,
                        notes: newTask.notes
                    }

                    return h.response(`Created ${JSON.stringify(returnObject)}\n`).code(201);
                } catch (err) {
                    return h.response(`Failed to create the new task: ${err}\n`).code(500);
                }
            }
        },

        // read routes
        {
            method:'GET',
            path: '/todo',
            handler: async (request, h) => {
                try {
                    const allTasks = await Task.find({}).exec();
                    const returnObject = [];
                    allTasks.map(task => {
                        returnObject.push({
                            title: task.title,
                            completed: task.completed,
                            notes: task.notes
                        });
                    });

                    const responseString = JSON.stringify(returnObject);

                    return h.response(`${responseString}\n`).code(200);
                } catch (err) {
                    return h.response(`Failed to retreive tasks: ${err}`);
                }
            }
        },

        {
            method: 'GET',
            path: '/todo/{title}',
            handler: async (request, h) => {
                try {
                    const taskTitle = request.params.title;
                    const thisTask = await Task.findOne({ title: taskTitle }).exec();

                    const returnObject = {
                        title: thisTask.title,
                        completed: thisTask.completed,
                        notes: thisTask.notes
                    }

                    if (thisTask) {
                        return h.response(JSON.stringify(returnObject) + '\n').code(200);
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
            handler: async (request, h) => {
                try {
                    const taskTitle = request.params.title;
                    const { title, completed, notes } = request.payload;
                    const thisTask = await Task.findOne({ title: taskTitle }).exec();

                    if (thisTask) {
                        thisTask.title = title;
                        thisTask.completed = completed;
                        thisTask.notes = notes;
                        await thisTask.save();

                        const returnObject = {
                            title: thisTask.title,
                            completed: thisTask.completed,
                            notes: thisTask.notes
                        }

                        return h.response(`Updated ${JSON.stringify(returnObject)}\n`).code(200);
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
            handler: async (request, h) => {
                try {
                    const taskTitle = request.params.title;
                    await Task.deleteOne({ title: taskTitle });

                    return h.response(`Success\n`).code(200);
                } catch (err) {
                    return h.response(`Failed to delete the task: ${err}\n`).code(500);
                }
            }
        },

        {
            method: '*',
            path: '/{any*}',
            handler: {
                directory: {
                    path: path.join(process.cwd(), '..', 'dist'),
                    index: true,
                    redirectToSlash: true
                }
            }
        }
    ]);

    await server.start();
    console.log(`Server running ${server.info.uri}`);
}

async function main() {
    const firstTask = await Task.findOne();
    if (!firstTask) {
        await seedDB();
    }
    startServer();
}

main();