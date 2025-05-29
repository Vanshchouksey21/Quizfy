import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/signup', formData);
      toast.success(res.data.message);
      setFormData({ name: '', email: '', mobile: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Mobile</label>
          <input type="text" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} required />
        </div>
        <button className="btn btn-success" type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignupForm;
