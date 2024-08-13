import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTasks } from '../../context/TaskContext';
import styles from './EditProjectForm.module.css'; // Ensure this matches your file structure

const EditProjectForm = ({ project, onClose }) => {
    const { updateProject } = useTasks();
    const [formData, setFormData] = useState(project || {});

    useEffect(() => {
        if (project) {
            setFormData(project);
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProject(formData);
        onClose();
    };

    if (!project) return null; // Return null or some loading indicator if project is not available

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Edit Project</h2>
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label>Project Name:</label>
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
                        <label>Assignee:</label>
                        <input
                            type="text"
                            name="assignee"
                            value={formData.assignee || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Category:</label>
                        <select
                            name="category"
                            value={formData.category || ''}
                            onChange={handleChange}
                        >
                            <option value="">Select a category</option>
                            <option value="Private">Private</option>
                            <option value="Office">Office</option>
                            <option value="Others">Others</option>
                            <option value="Extra">Extra</option>
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

EditProjectForm.propTypes = {
    project: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};

export default EditProjectForm;
