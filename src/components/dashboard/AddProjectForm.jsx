import { useState } from 'react';
import PropTypes from 'prop-types'; 
import styles from './AddProjectForm.module.css';

const AddProjectForm = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        assignee: '',
        category: '', 
    });
    const [showNotification, setShowNotification] = useState(false); // State for notification

    const availableCategories = [
        'Private',
        'Office',
        'Others',
        'Extra',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setFormData({
            name: '',
            description: '',
            assignee: '',
            category: '',
        });
        setShowNotification(true); // Show notification
        setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
        setTimeout(onClose, 3000); // Close form after notification
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Add Project</h2>
                {showNotification && (
                    <div className={styles.notification}>
                        Project added successfully!
                    </div>
                )}
                <form onSubmit={handleSubmit} className={styles.projectFormContainer}>
                    <label>
                        Project Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Project Name"
                            required
                            className={styles.projectInput}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className={styles.projectTextarea}
                        ></textarea>
                    </label>
                    <label>
                        Assignee:
                        <input
                            type="text"
                            name="assignee"
                            value={formData.assignee}
                            onChange={handleChange}
                            placeholder="Assignee"
                            className={styles.projectInput}
                        />
                    </label>
                    <label>
                        Categories/Tags:
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={styles.projectSelect}
                        >
                            <option value="">Select a category</option>
                            {availableCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit" className={styles.saveButton}>
                        Add Project
                    </button>
                    <button type="button" onClick={onClose} className={styles.closeButton}>
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

AddProjectForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default AddProjectForm;
