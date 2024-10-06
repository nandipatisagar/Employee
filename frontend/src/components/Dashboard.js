// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/employees`);
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/employees/${id}`);
    setEmployees(employees.filter((employee) => employee._id !== id));
  };

  return (
    <div>
      <h2>Employee List</h2>
      <Link to="/create-employee">Create Employee</Link>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} - {employee.designation}
            <Link to={`/edit-employee/${employee._id}`}>Edit</Link>
            <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
