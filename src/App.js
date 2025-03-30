import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import UsersList from "./UsersList";
import EditUser from "./EditUser";
import CreateUser from "./CreateUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;