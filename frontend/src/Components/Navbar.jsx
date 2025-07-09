import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">DevConnect</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/profile">{user.username}</Link>
            <Link to="/projects">Projects</Link>
            <Link to="signup"><button onClick={logout}>Logout</button></Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
