import React, { useState } from 'react';
import axios from 'axios';

const AddComment = ({ taskId }) => {
  const [commentData, setCommentData] = useState({
    user_id: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData({ ...commentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!taskId) {
      alert("Error: Task ID is missing");
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/tasks/${taskId}/comments`,
        commentData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Comment added successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="user_id" placeholder="User ID" onChange={handleChange} required />
      <textarea name="comment" placeholder="Your Comment" onChange={handleChange} required />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default AddComment;