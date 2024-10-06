// frontend/src/components/EditEmployee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  // Remove the 'employee' state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/employees/${id}`);
        setName(res.data.name);
        setEmail(res.data.email);
        setMobile(res.data.mobile);
        setDesignation(res.data.designation);
        setGender(res.data.gender);
        setCourse(res.data.course);
      } catch (err) {
        console.error('Error fetching employee data', err);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('course', course);
    if (image) formData.append('image', image);

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/employees/${id}`, formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating employee', err);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        <input type="text" placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
        <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
        <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditEmployee;
