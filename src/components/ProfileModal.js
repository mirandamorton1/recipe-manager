import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Modal.module.scss";
import { FaRegEdit, FaTimes } from "react-icons/fa";

const ProfileModal = ({ user, close, updateUser, modalContentRef }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, name, email }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        updateUser(updatedUser);
        close();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update user");
      }
    } catch (error) {
      setError("An error occurred while updating the profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modal} >
      <div className={styles.modalContent} ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Profile</h3>
          <button className={styles.closeButton} onClick={close}>
            <FaTimes size={20} />
          </button>
        </div>

        {!isEditing ? (
          <div>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Member Since: {new Date(user.createdAt).toLocaleDateString()}</p>
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              <FaRegEdit size={20} />
            </button>
          </div>
        ) : (
          <div className={styles.editForm}>
            <label className={styles.inputLabel}>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className={styles.inputLabel}>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <div className={styles.buttonGroup}>
              <button
                className={styles.saveButton}
                onClick={handleSave}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>,
    document.body
  );
};

export default ProfileModal;
