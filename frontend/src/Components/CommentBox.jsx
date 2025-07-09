import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function CommentBox({ projectId, comments }) {
  const [text, setText] = useState('');
  const { user } = useContext(AuthContext);

  const handleComment = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(`/api/projects/${projectId}/comments`, {
        author: user.username,
        content: text,
      });
      setText('');
      window.location.reload(); // Simplified update
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  return (
    <div className="mt-6">
      <h4 className="font-bold mb-2">Comments</h4>
      {comments.map((c, i) => (
        <div key={i} className="border p-2 mb-2 rounded">
          <p className="text-sm text-gray-700"><strong>{c.author}</strong>:</p>
          <p>{c.content}</p>
        </div>
      ))}
      {user && (
        <div className="mt-4">
          <textarea
            rows="3"
            className="w-full p-2 border"
            placeholder="Add a comment..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded" onClick={handleComment}>
            Post
          </button>
        </div>
      )}
    </div>
  );
}
