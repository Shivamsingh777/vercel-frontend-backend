import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="text-gray-600">{project.description.slice(0, 100)}...</p>
      <Link to={`/projects/${project._id}`} className="text-blue-500 mt-2 inline-block">View Details</Link>
    </div>
  );
}
