// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Tasklist = ({ taskId }) => {
//   const [task, setTask] = useState(null);
//   const [newComment, setNewComment] = useState('');
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!taskId || taskId.length !== 24) {
//       setError('Invalid task ID');
//       return;
//     }

//     const fetchTaskDetails = async () => {
//       try {
//         const response = await axios.get(`/api/tasks/${taskId}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setTask(response.data);
//       } catch (err) {
//         setError('Error fetching task details');
//         console.error(err);
//       }
//     };

//     fetchTaskDetails();
//   }, [taskId]);

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;
//     try {
//       const response = await axios.post(
//         `/api/tasks/${taskId}/comments`,
//         { comment: newComment },
//         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//       );
//       setTask({ ...task, comments: [...task.comments, response.data] });
//       setNewComment('');
//     } catch (err) {
//       console.error('Error adding comment:', err);
//     }
//   };

//   if (error) return <div>{error}</div>;
//   if (!task) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{task.task_name}</h1>
//       <p>{task.task_description}</p>
//       <p>Assigned To: {task.assigned_to.name}</p>
//       <p>Assigned By: {task.assigned_by.name}</p>
//       <p>Project: {task.project_id.project_name}</p>
//       <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
//       <p>Status: {task.status}</p>
//       <p>Priority: {task.priority}</p>
//       <h2>Comments</h2>
//       {task.comments.map((comment, index) => (
//         <div key={index}>
//           <p>{comment.comment}</p>
//           <p>By: {comment.user_id.name}</p>
//           <p>At: {new Date(comment.created_at).toLocaleString()}</p>
//         </div>
//       ))}
//       <div>
//         <input
//           type="text"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Add a comment..."
//         />
//         <button onClick={handleAddComment}>Submit</button>
//       </div>
//     </div>
//   );
// };

// export default Tasklist;