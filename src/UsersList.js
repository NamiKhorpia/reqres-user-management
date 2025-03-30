import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// Global fetch for both pages once per app load
let initialUsers = [];
let hasFetched = false;
let fetchError = null;
const fetchInitialUsers = async () => {
  if (!hasFetched) {
    try {
      const [page1, page2] = await Promise.all([
        axios.get("https://reqres.in/api/users?page=1"),
        axios.get("https://reqres.in/api/users?page=2"),
      ]);
      initialUsers = [...page1.data.data, ...page2.data.data];
      console.log("Initial fetch:", initialUsers);
      hasFetched = true;
    } catch (error) {
      console.error("Error fetching initial users:", error);
      initialUsers = [];
      fetchError = "Failed to load users. Please refresh.";
    }
  }
  return initialUsers;
};
fetchInitialUsers();

const UsersList = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });
  const [page, setPage] = useState(1);
  const [totalPages] = useState(2);
  const [isLoading, setIsLoading] = useState(!hasFetched);
  const [error, setError] = useState(fetchError);
  const navigate = useNavigate();
  const location = useLocation();
  const usersPerPage = 6;

  // Sync users with localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Initialize users and check token
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    if (hasFetched && users.length === 0 && !fetchError) {
      setUsers(initialUsers);
      localStorage.setItem("users", JSON.stringify(initialUsers));
    }
    setIsLoading(false);
  }, [navigate]);

  // Handle updates from EditUser or CreateUser
  useEffect(() => {
    if (isLoading) return;
    const updatedUser = location.state?.updatedUser;
    if (updatedUser) {
      console.log("Received updated user:", updatedUser);
      setUsers((prevUsers) => {
        const exists = prevUsers.some((user) => user.id === updatedUser.id);
        const newUsers = exists
          ? prevUsers.map((user) => (user.id === updatedUser.id ? { ...user, ...updatedUser } : user))
          : [...prevUsers, updatedUser];
        console.log("New users state after update:", newUsers);
        return newUsers;
      });
      window.history.replaceState({}, document.title, "/users");
    }
  }, [location.state, isLoading]);

  const handleEdit = (user) => {
    if (isLoading) return;
    navigate(`/edit-user/${user.id}`, { state: { user } });
  };

  const handleDelete = (userId) => {
    if (isLoading) return;
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`https://reqres.in/api/users/${userId}`)
        .then(() => {
          alert("User deleted successfully!");
          setUsers((prevUsers) => {
            const newUsers = prevUsers.filter((user) => user.id !== userId);
            console.log("New users state after delete:", newUsers);
            return newUsers;
          });
        })
        .catch(() => alert("Failed to delete user!"));
    }
  };

  const handleCreate = () => {
    if (isLoading) return;
    navigate("/create-user");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("users");
    navigate("/");
  };

  const paginatedUsers = users.slice((page - 1) * usersPerPage, page * usersPerPage);

  return (
    <div className="container">
      <div className="header">
        <h2>Users List</h2>
        <div>
          <button className="button create" onClick={handleCreate}>Create User</button>
          <button className="button logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      {isLoading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div>
          {paginatedUsers.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={user.first_name} width="50" />
              <div>
                <p>
                  {user.first_name} {user.last_name}
                </p>
                <p>{user.email}</p>
              </div>
              <button className="button edit" onClick={() => handleEdit(user)}>Edit</button>
              <button className="button delete" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          ))}
          <div className="pagination">
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages || users.length <= page * usersPerPage}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;