import { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import EditTaskForm from './EditTaskForm'; // Import the new form component
import styles from '../dashboard/AddTaskForm.module.css';

const TaskList = () => {
    const { tasks, editTask, deleteTask, matchProjectId } = useTasks();
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState("");

    const handleEditTask = (task) => {
        setEditingTask(task);
    };

    const handleDeleteTask = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            deleteTask(id);
        }
    };

    const filteredTask = tasks.filter((task) =>
        task.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className={styles.taskListContainer}>
            <div className={styles.taskListWrapper}>
                <h1>Tasks List</h1>
                <input
                    type="text"
                    placeholder="Search tasks"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className={styles.searchInput}
                />
                <ul className={styles.taskList}>
                    {filteredTask.map((task) => (
                        <li key={task.id} className={styles.taskItem}>
                            <h2>{task.name}</h2>
                            <p>{task.description}</p>
                            <p>Due Date: {task.dueDate}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Status: {task.status}</p>
                            <p>Project: {matchProjectId(task.projectId)}</p>
                            <button
                                onClick={() => handleEditTask(task)}
                                className={styles.editButton}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className={styles.deleteButton}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                {editingTask && (
                    <EditTaskForm
                        task={editingTask}
                        onClose={() => setEditingTask(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default TaskList;
