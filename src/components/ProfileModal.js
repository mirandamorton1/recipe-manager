import React from 'react';
import styles from '../styles/Modal.module.scss';

const ProfileModal = ({ user, close }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default ProfileModal;
