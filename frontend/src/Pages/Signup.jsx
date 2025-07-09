import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: ""
   
  });

  const handleChange = (e) =>

    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      setUser(res.data.user);   
         navigate('/login')
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="name"
          className="w-full p-2 border"
          onChange={handleChange}
        />

        <input
          name="username"
          type="text"
          placeholder="Username"
          className="w-full p-2 border"
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border"
          onChange={handleChange}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Create Account
        </button>
      </form>
    </div>
  );
}
