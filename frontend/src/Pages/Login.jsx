// import { useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post("/api/auth/login", { email, password });
//     login(res.data.token);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4">
//       <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
//       <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
//       <button className="btn">Login</button>
//     </form>
//   );
// }
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      setUser(res.data.user);
      navigate('/profile')
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" className="w-full p-2 border" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 border" onChange={handleChange} />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Log In</button>
      </form>
    </div>
  );
}
