import { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import 'boxicons';

// ----------Page Routing----------
import DashboardPage from "../../pages/DashboardPage";
import TasksPage from "../../pages/TasksPage";
import ProjectsPage from "../../pages/ProjectPage";
import SettingsPage from "../../pages/SetttingsPage";
// ----------End of Page Routing----------

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const navRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setMenuOpen(false);
            setProfileMenuOpen(false);
        }
    };

    const handleLinkClick = (event) => {
        if (event.target.textContent === "Profile") {
            event.preventDefault(); // Prevent the default link behavior
            alert("Still in development"); // Show the alert
        } else {
            setMenuOpen(false);
            setProfileMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Router>
            <header className={styles.navBar} ref={navRef}>
                <nav className={styles.navContainer}>
                    <div className={styles.navLeft}>
                        <div className={styles.navLogo}>ProjectM</div>
                    </div>
                    <div className={styles.navRight}>
                        <div className={styles.hamburger} onClick={toggleMenu}>
                            <span className={styles.bar}></span>
                            <span className={styles.bar}></span>
                            <span className={styles.bar}></span>
                        </div>
                        <ul
                            className={`${styles.navBarList} ${menuOpen ? styles.showMenu : ""}`}
                        >
                            <li className={styles.navBarItem}>
                                <Link
                                    to="/"
                                    className={`${styles.navBarLink} ${location.pathname === "/" ? styles.active : ""}`}
                                    onClick={handleLinkClick}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className={styles.navBarItem}>
                                <Link
                                    to="/tasks"
                                    className={`${styles.navBarLink} ${location.pathname === "/tasks" ? styles.active : ""}`}
                                    onClick={handleLinkClick}
                                >
                                    Tasks
                                </Link>
                            </li>
                            <li className={styles.navBarItem}>
                                <Link
                                    to="/projects"
                                    className={`${styles.navBarLink} ${location.pathname === "/projects" ? styles.active : ""}`}
                                    onClick={handleLinkClick}
                                >
                                    Projects
                                </Link>
                            </li>
                            <li className={styles.navBarItem}>
                                <div className={styles.profileIcon} onClick={toggleProfileMenu}>
                                    <box-icon
                                        name='user'
                                        color={location.pathname === "/settings" ? "#a14a24" : "inherit"}
                                    ></box-icon>
                                    {profileMenuOpen && (
                                        <div className={styles.profileDropdown}>
                                            <Link to="/profile" className={styles.dropdownItem} onClick={handleLinkClick}>Profile</Link>
                                            <Link to="/settings" className={styles.dropdownItem} onClick={handleLinkClick}>Settings</Link>
                                        </div>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className={styles.mainContent}>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </main>
        </Router>
    );
};

export default Navbar;
