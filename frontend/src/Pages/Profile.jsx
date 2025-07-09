import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/projects/${user._id}`)
        .then(res => setProjects(res.data))
        .catch(err => console.error("Error fetching projects:", err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user) {
    return (
      <p className="text-center mt-10 text-lg text-gray-600">
        Please log in to view your profile.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

      <div className="mb-8">
        <p><strong>Name:</strong>{user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">My Projects</h3>
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>You haven't posted any projects yet.</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project._id} className="p-4 border rounded shadow-sm bg-gray-50">
                <h4 className="text-xl font-bold">{project.title}</h4>
                <p className="text-gray-700">{project.description}</p>
                {project.links.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="font-semibold">Links:</p>
                    {project.links.map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline block"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                )}
                <Link
                  to={`/project/${project._id}`}
                  className="inline-block mt-3 text-indigo-600 hover:underline"
                >
                  View Project & Comments
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}



// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// export default function Profile() {
//   const { user } = useContext(AuthContext);

//   if (!user) return <p className="text-center mt-10">Please log in to view your profile.</p>;

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">My Profile</h2>
//       <p><strong>Username:</strong> {user.username}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//     </div>
//   );
// }
