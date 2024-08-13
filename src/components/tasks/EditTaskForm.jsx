import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTasks } from '../../context/TaskContext';
import styles from './EditTaskForm.module.css'; // Ensure this matches your file structure

const EditTaskForm = ({ task, onClose }) => {
    const { projects, updateTask } = useTasks();
    const [formData, setFormData] = useState(task || {});

    useEffect(() => {
        if (task) {
            setFormData(task);
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTask(formData);
        onClose();
    };

    if (!task) return null; // Return null or some loading indicator if task is not available

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Edit Task</h2>
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label>Task Title:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Due Date:</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Status:</label>
                        <select
                            name="status"
                            value={formData.status || ''}
                            onChange={handleChange}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Priority:</label>
                        <select
                            name="priority"
                            value={formData.priority || ''}
                            onChange={handleChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Project:</label>
                        <select
                            name="projectId"
                            value={formData.projectId || ''}
                            onChange={handleChange}
                        >
                            <option value="">No Project</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className={styles.button}>
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className={`${styles.button} ${styles.close}`}
                    >
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

EditTaskForm.propTypes = {
    task: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};

export default EditTaskForm;
