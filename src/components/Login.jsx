import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate(); // ✅ Properly placed here

  const sendOtp = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/send-otp', { email });
      toast.success(res.data.message);
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/verify-otp', { email, otp });
       const userId = res.data.userId;
       const name = res.data.name;
    localStorage.setItem('userId', userId);
    localStorage.setItem('name', name);
      console.log(res);
      localStorage.setItem('token', res.data.token); // ✅ Save token if provided
      
      toast.success('Login successful!');
      setTimeout(() => {
        navigate('/subject'); // ✅ Redirect after success
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <ToastContainer position="top-right" />
      <h2 className="mb-4 text-center">Login with OTP</h2>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpSent}
        />
      </div>
      {otpSent && (
        <div className="mb-3">
          <label>Enter OTP</label>
          <input
            type="text"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
      )}
      {!otpSent ? (
        <button className="btn btn-primary w-100" onClick={sendOtp}>
          Send OTP
        </button>
      ) : (
        <button className="btn btn-success w-100" onClick={verifyOtp}>
          Verify OTP
        </button>
      )}
      <p className="mt-3 text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-decoration-none text-primary">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;
