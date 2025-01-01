import React from 'react';
import styles from '../styles/Sidebar.module.scss';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  if (!isOpen) return null; 

  return (
    <div className={styles.sidebar}>
      <button className={styles.closeButton} onClick={toggleSidebar}>
        Close
      </button>
      <ul className={styles.sidebarMenu}>
        <li>Profile</li>
        <li>My Favorites</li>
        <li>New Recipe</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
