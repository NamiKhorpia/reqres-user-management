import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, email } = formData;
    if (!first_name || !last_name || !email) {
      alert("All fields are required!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email format!");
      return;
    }
    const updatedUser = { id: Number(id), ...formData };
    axios
      .put(`https://reqres.in/api/users/${id}`, formData)
      .then(() => {
        alert("User updated successfully!");
        console.log("Sending updated user to UsersList:", updatedUser);
        navigate("/users", { state: { updatedUser } });
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Failed to update user!");
      });
  };

  return (
    <div className="form-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="form-buttons">
          <button type="submit" className="button edit">Update</button>
          <button type="button" className="button cancel" onClick={() => navigate("/users")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;