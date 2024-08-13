import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import EditProjectForm from './EditProjectForm'; // Adjust path as needed
import styles from './ProjectList.module.css';

const ProjectList = () => {
    const { projects, deleteProject, deleteTasksByProject } = useTasks();
    const [editingProject, setEditingProject] = useState(null);

    const handleEditProject = (project) => {
        setEditingProject(project);
    };

    const handleDeleteProject = (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            deleteTasksByProject(id);
            deleteProject(id);
        }
    };

    const closeEditForm = () => {
        setEditingProject(null);
    };

    return (
        <div className={styles.projectListContainer}>
            <div className={styles.projectList}>
                <h1 className={styles.projectHeader}>Projects List</h1>
                <ul className={styles.projects}>
                    {projects.map((project) => (
                        <li key={project.id} className={styles.projectItem}>
                            <h2 className={styles.projectName}>{project.name}</h2>
                            <p className={styles.projectDescription}>
                                {project.description}
                            </p>
                            <button
                                onClick={() => handleEditProject(project)}
                                className={`${styles.projectButton} ${styles.editButton}`}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteProject(project.id)}
                                className={`${styles.projectButton} ${styles.deleteButton}`}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {editingProject && (
                <EditProjectForm
                    project={editingProject}
                    onClose={closeEditForm}
                />
            )}
        </div>
    );
};

export default ProjectList;
