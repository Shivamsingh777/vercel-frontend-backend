import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    links: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects.');
      })
      .finally(() => setLoading(false));
  };

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    const newProject = {
      title: formData.title,
      description: formData.description,
      links: formData.links.split(',').map(link => link.trim())
    };

    try {
      await axios.post('http://localhost:5000/api/projects', newProject);
      setFormData({ title: '', description: '', links: '' });
      fetchProjects();
    } catch (err) {
      console.error('Error posting project:', err);
      alert('Failed to add project.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Projects</h1>

      {/* Add Project Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-4 mb-8 space-y-4"
      >
        <h2 className="text-xl font-semibold">Add New Project</h2>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="links"
          value={formData.links}
          onChange={handleChange}
          placeholder="Links (comma-separated)"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Project
        </button>
      </form>

      {/* Project List */}
      {loading ? (
        <p className="text-center text-gray-600">Loading projects...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

// Reusable Project Card
function ProjectCard({ project }) {
  return (
    <div className="bg-white p-4 shadow rounded hover:shadow-md transition">
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-700">{project.description}</p>

      {project.links?.length > 0 && (
        <ul className="mt-2 list-disc ml-5 text-blue-600">
          {project.links.map((link, i) => (
            <li key={i}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}

      <Link
        to={`/project/${project._id}`}
        className="inline-block mt-3 text-indigo-600 hover:underline"
      >
        View Project & Comments
      </Link>
    </div>
  );
}
