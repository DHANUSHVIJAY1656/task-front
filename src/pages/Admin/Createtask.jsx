import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
  const [taskData, setTaskData] = useState({
    task_name: '',
    task_description: '',
    task_doc: '',
    assigned_to: '',
    assigned_by: '',
    deadline: '',
    project_id: '',
    priority: 'Medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/task', taskData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Task created successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="task_name" placeholder="Task Name" onChange={handleChange} required />
      <textarea name="task_description" placeholder="Task Description" onChange={handleChange} />
      <input type="text" name="task_doc" placeholder="Task Document URL" onChange={handleChange} />
      <input type="text" name="assigned_to" placeholder="Assigned To (User ID)" onChange={handleChange} required />
      <input type="text" name="assigned_by" placeholder="Assigned By (User ID)" onChange={handleChange} required />
      <input type="date" name="deadline" onChange={handleChange} required />
      <input type="text" name="project_id" placeholder="Project ID" onChange={handleChange} required />
      <select name="priority" onChange={handleChange}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;