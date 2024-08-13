import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const addProject = (project) => {
        setProjects([...projects, project]);
    };

    const updateTask = (updatedTask) => {
        setTasks(tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        ));
    };

    const updateProject = (updatedProject) => {
        setProjects(projects.map(project =>
            project.id === updatedProject.id ? updatedProject : project
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const deleteTasksByProject = (projectId) => {
        setTasks(tasks.filter(task => task.projectId !== projectId));
    };

    const matchProjectId = (projectId) => {
        const project = projects.find(p => p.id === projectId);
        return project ? project.name : 'No Project';
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            projects,
            addTask,
            addProject,
            updateTask,
            updateProject,
            deleteTask,
            deleteTasksByProject,
            matchProjectId
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
