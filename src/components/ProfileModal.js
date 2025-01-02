import React, { useState } from "react";
import styles from "../styles/Modal.module.scss";

const ProfileModal = ({ user, close, updateUser }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
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
  
    return (
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={close}>
            Cancel
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    );
  };

export default ProfileModal;
