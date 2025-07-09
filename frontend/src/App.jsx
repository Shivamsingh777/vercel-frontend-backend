import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Projects from './Pages/Projects';
import ProjectDetail from './Pages/ProjectDetail';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
