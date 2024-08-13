import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AddTaskForm.module.css';
import { useTasks } from '../../context/TaskContext';

const AddTaskForm = ({ onClose }) => {
    const { projects, addTask } = useTasks(); // Use context to get projects and addTask
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('To Do');
    const [priority, setPriority] = useState('Low');
    const [selectedProject, setSelectedProject] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTask = {
            name: title,
            description,
            dueDate,
            status,
            priority,
            projectId: selectedProject || null, // Use null if no project is selected
        };
        addTask(newTask); // Add the task using context
        setTitle('');
        setDescription('');
        setDueDate('');
        setStatus('To Do');
        setPriority('Low');
        setSelectedProject('');
        setShowNotification(true); // Show the notification
        setTimeout(() => setShowNotification(false), 3000); // Hide it after 3 seconds
        setTimeout(onClose, 3000); // Close the form after the notification disappears
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Add Task</h2>
                {showNotification && (
                    <div className={styles.notification}>
                        Task added successfully!
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <label>
                        Task Title:
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </label>
                    <label>
                        Due Date:
                        <input
                            type="date"
                            name="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Status:
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </label>
                    <label>
                        Priority:
                        <select
                            name="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                    <label>
                        Project:
                        <select
                            name="project"
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                        >
                            <option value="">No Project</option>
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No Projects Available</option>
                            )}
                        </select>
                    </label>
                    <button type="submit">Add Task</button>
                    <button type="button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

AddTaskForm.propTypes = {
    onClose: PropTypes.func.isRequired, 
};

export default AddTaskForm;
