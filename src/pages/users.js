import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/UsersPage.module.scss";

const UsersPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include", 
        });

        if (res.ok) {
          setIsAuthenticated(true);
          fetchUsers(); 
        } else {
          setIsAuthenticated(false);
          router.push("/login"); 
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        router.push("/login");
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    checkAuth();
  }, [router]);

  const handleStatusChange = async (userId, currentStatus) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id
              ? { ...user, isActive: updatedUser.isActive }
              : user
          )
        );
      } else {
        setError("Failed to update user status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      setError("An error occurred while updating the status.");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setIsAuthenticated(false);
        router.push("/login"); // Redirect to login page after logout
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return null; 
  }

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>
      <button
        onClick={handleLogout}
        className={styles.editButton}
      >
        Logout
      </button>
      {users.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Member Since</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>{user.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => handleStatusChange(user.id, user.isActive)}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersPage;
