import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.email) {
      alert("All fields are required!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Invalid email format!");
      return;
    }
    axios
      .post("https://reqres.in/api/users", formData)
      .then((response) => {
        const newUser = {
          ...formData,
          id: Date.now(), // Mock ID
          avatar: "https://reqres.in/img/faces/1-image.jpg", // Default avatar
        };
        alert("User created successfully!");
        navigate("/users", { state: { updatedUser: newUser } });
      })
      .catch(() => alert("Failed to create user!"));
  };

  return (
    <div className="form-container">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        <label>Last Name:</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        <div className="form-buttons">
          <button type="submit" className="button create">Create</button>
          <button type="button" className="button cancel" onClick={() => navigate("/users")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;