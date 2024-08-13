import React, { useMemo, useState } from 'react';
import { useTasks } from '../../context/TaskContext'; 
import styles from './Dashboard.module.css';
import AddTaskForm from './AddTaskForm'; 
import AddProjectForm from './AddProjectForm'; 

const Dashboard = () => {
    const { tasks, projects, addTask, addProject, matchProjectId } = useTasks(); // Include addTask, addProject
    const [searchItem, setSearchItem] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [popupType, setPopupType] = useState(null);

    const filteredTasks = useMemo(
        () => tasks.filter(task =>
            task.name.toLowerCase().includes(searchItem.toLowerCase())
        ),
        [tasks, searchItem]
    );

    const taskCounts = useMemo(() => {
        return filteredTasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {});
    }, [filteredTasks]);

    const upcomingTasks = useMemo(
        () => filteredTasks
            .filter(task => new Date(task.dueDate) >= new Date())
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)),
        [filteredTasks]
    );

    const missedTasks = useMemo(
        () => filteredTasks
            .filter(task => new Date(task.dueDate) <= new Date() && task.status !== 'Completed')
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)),
        [filteredTasks]
    );

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High':
                return styles.highPriority;
            case 'Medium':
                return styles.mediumPriority;
            case 'Low':
                return styles.lowPriority;
            default:
                return '';
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'To Do':
                return styles.todoStatus;
            case 'In Progress':
                return styles.inProgressStatus;
            case 'Completed':
                return styles.completedStatus;
            default:
                return '';
        }
    };

    const handleAddButtonClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleClosePopup = () => {
        setIsDropdownVisible(false);
        setPopupType(null);
    };

    const handlePopupTypeChange = (type) => {
        setPopupType(type);
        setIsDropdownVisible(false);
    };

    const handleSaveTask = (taskData) => {
        addTask({
            ...taskData,
            id: Date.now(), // Generate a unique ID for the task
        });
        handleClosePopup();
    };

    const handleSaveProject = (projectData) => {
        addProject({
            ...projectData,
            id: Date.now(), // Generate a unique ID for the project
        });
        handleClosePopup();
    };

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.title}>Dashboard</h1>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Search tasks"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
            />

            <div className={styles.taskSummary}>
                <h2 className={styles.taskSubTitle}>Task Summary</h2>
                <p className={styles.taskDetail}>
                    <span className={styles.todoColor}>To Do</span>: {taskCounts['To Do'] || 0}
                </p>
                <p className={styles.taskDetail}>
                    <span className={styles.inProgressColor}>In Progress</span>: {taskCounts['In Progress'] || 0}
                </p>
                <p className={styles.taskDetail}>
                    <span className={styles.completedColor}>Completed</span>: {taskCounts['Completed'] || 0}
                </p>
            </div>

            <div className={styles.taskLists}>
                <div className={styles.upcomingTasks}>
                    <h2 className={styles.subTitle}>Upcoming Deadlines</h2>
                    {upcomingTasks.length > 0 ? (
                        <ul className={styles.taskList}>
                            {upcomingTasks.map((task) => (
                                <li key={task.id} className={styles.taskItem}>
                                    <div className={styles.taskWrapper}>
                                        <h3 className={styles.taskName}>{task.name}</h3>
                                        <div className={styles.priorityStatusWrapper}>
                                            <p className={`${styles.taskInfo} ${getPriorityClass(task.priority)}`}>
                                                {task.priority}
                                            </p>
                                            <p className={`${styles.taskInfo} ${getStatusClass(task.status)}`}>
                                                {task.status}
                                            </p>
                                        </div>
                                    </div>
                                    <p className={styles.taskDescription}>{task.description}</p>
                                    <p className={styles.taskProject}>Project: {matchProjectId(task.projectId)}</p>
                                    <p className={styles.taskDueDate}>Due Date: {task.dueDate}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.noTasksMessage}>Hooray!! No upcoming deadlines</p>
                    )}
                </div>

                <div className={styles.missedTasks}>
                    <h2 className={styles.subTitle}>Missed Tasks</h2>
                    {missedTasks.length > 0 ? (
                        <ul className={styles.taskList}>
                            {missedTasks.map((task) => (
                                <li key={task.id} className={styles.taskItem}>
                                    <div className={styles.taskWrapper}>
                                        <h3 className={styles.taskName}>{task.name}</h3>
                                        <div className={styles.priorityStatusWrapper}>
                                            <p className={`${styles.taskInfo} ${getPriorityClass(task.priority)}`}>
                                                {task.priority}
                                            </p>
                                            <p className={`${styles.taskInfo} ${getStatusClass(task.status)}`}>
                                                {task.status}
                                            </p>
                                        </div>
                                    </div>
                                    <p className={styles.taskDescription}>{task.description}</p>
                                    <p className={styles.taskProject}>Project: {matchProjectId(task.projectId)}</p>
                                    <p className={styles.taskDueDate}>Due Date: {task.dueDate}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.noTasksMessage}>You are up to date. No tasks have been missed</p>
                    )}
                </div>
            </div>

            <button
                className={styles.addButton}
                onClick={handleAddButtonClick}
            >
                +
            </button>

            {isDropdownVisible && (
                <div className={styles.dropdownMenu}>
                    <button className={styles.dropdownItem} onClick={() => handlePopupTypeChange('tasks')}>Add Tasks</button>
                    <button className={styles.dropdownItem} onClick={() => handlePopupTypeChange('projects')}>Add Projects</button>
                </div>
            )}

            {popupType === 'tasks' && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <AddTaskForm onSave={handleSaveTask} onClose={handleClosePopup} />  {/* Pass onSave */}
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
            
            {popupType === 'projects' && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <AddProjectForm onSave={handleSaveProject} onClose={handleClosePopup} />  {/* Pass onSave */}
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
