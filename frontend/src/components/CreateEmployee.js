// frontend/src/components/CreateEmployee.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('HR'); // Default to 'HR'
  const [gender, setGender] = useState('Male'); // Default to 'Male'
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCourse([...course, value]); // Add course
    } else {
      setCourse(course.filter((c) => c !== value)); // Remove course
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('course', course);
    formData.append('image', image);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/employees`, formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating employee', err);
    }
  };

  return (
    <div>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Mobile:</label>
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </div>

        <div>
          <label>Designation:</label>
          <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              value="Male"
              checked={gender === 'Male'}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              checked={gender === 'Female'}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
        </div>

        <div>
          <label>Course:</label>
          <label>
            <input
              type="checkbox"
              value="MCA"
              checked={course.includes('MCA')}
              onChange={handleCourseChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              value="BCA"
              checked={course.includes('BCA')}
              onChange={handleCourseChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              value="BSC"
              checked={course.includes('BSC')}
              onChange={handleCourseChange}
            />
            BSC
          </label>
        </div>

        <div>
          <label>Image Upload:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
