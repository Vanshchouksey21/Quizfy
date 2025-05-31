import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      const res = await axios.post('http://localhost:8000/api/send-otp', { email });
      toast.success(res.data.message);
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    try {
      const res = await axios.post('http://localhost:8000/api/verify-otp', { email, otp });
      const { userId, name, token } = res.data;

      localStorage.setItem('userId', userId);
      localStorage.setItem('name', name);
      localStorage.setItem('token', token);

      toast.success('Login successful!');
      setTimeout(() => navigate('/subject'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4 text-primary">Login with OTP</h3>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={otpSent}
            required
          />
        </div>

        {otpSent && (
          <div className="mb-3">
            <label className="form-label">Enter OTP</label>
            <input
              type="text"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP sent to your email"
              required
            />
          </div>
        )}

        <button
          className={`btn ${otpSent ? 'btn-success' : 'btn-primary'} w-100`}
          onClick={otpSent ? verifyOtp : sendOtp}
        >
          {otpSent ? 'Verify OTP' : 'Send OTP'}
        </button>

        <p className="text-center mt-3">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-decoration-none text-success">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
