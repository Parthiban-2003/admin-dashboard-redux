import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../features/formsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

function FormsControl() {
  const { id } = useParams();
  const users = useSelector(state => state.forms.users);
  const existingUser = users.find(u => u.id === id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    skills: [],
    about: "",
    country: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (existingUser) {
      setForm({
        ...existingUser,
        skills: existingUser.skills || [], 
      });
    }
  }, [existingUser]);
  
  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckbox = e => {
    const value = e.target.value;
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(value)
        ? prev.skills.filter(s => s !== value)
        : [...prev.skills, value]
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      dispatch(updateUser(form));
    } else {
      dispatch(addUser({ ...form, id: uuid() }));
    }
    navigate("/formStore");
  };

  return (
    <div className="container mt-4">
      <h3>{id ? "Edit User" : "Add User"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required={!id}
        />

        <div className="mb-2">
          <label className="me-2">Gender:</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={form.gender === "Male"}
            onChange={handleChange}
          /> Male
          <input
            className="ms-3"
            type="radio"
            name="gender"
            value="Female"
            checked={form.gender === "Female"}
            onChange={handleChange}
          /> Female
        </div>

        <div className="mb-2">
          <label className="me-2">Skills:</label>
          <input
            type="checkbox"
            value="React"
            checked={form.skills.includes("React")}
            onChange={handleCheckbox}
          /> React
          <input
            className="ms-3"
            type="checkbox"
            value="Node"
            checked={form.skills.includes("Node")}
            onChange={handleCheckbox}
          /> Node
          <input
            className="ms-3"
            type="checkbox"
            value="Redux"
            checked={form.skills.includes("Redux")}
            onChange={handleCheckbox}
          /> Redux
        </div>

        <div className="mb-2">
          <label>Country:</label>
          <select
            className="form-select"
            name="country"
            value={form.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="India">India</option>
            <option value="UK">UK</option>
          </select>
        </div>

        <div className="mb-2">
          <label>About:</label>
          <textarea
            className="form-control"
            name="about"
            value={form.about}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="btn btn-primary">{id ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
}

export default FormsControl;
