import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentBox from '../Components/CommentBox';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios.get(`/api/projects/${id}`)
      .then(res => setProject(res.data))
      .catch(err => console.error('Error loading project:', err));
  }, [id]);

  if (!project) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{project.title}</h1>
      <p className="mt-2 text-gray-700">{project.description}</p>
      <CommentBox projectId={project._id} comments={project.comments || []} />
    </div>
  );
}
