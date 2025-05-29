import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBrain } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = () => {
    setLoading(true);
    setTimeout(() => {
      const token = localStorage.getItem('token'); // Get auth token
      if (token) {
        navigate('/subject'); // Redirect to subject page
      } else {
        navigate('/login'); // Redirect to login page
      }
    }, 1000); // simulate a delay for loading effect
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        height: '80vh',
        marginTop: '20px',
        background: 'linear-gradient(135deg, #4A6CF7, #D5E6FB)',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(74, 108, 247, 0.3)',
        color: '#fff',
        padding: '40px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        animation: 'fadeIn 1.5s ease-in-out',
      }}
    >
      <FaBrain size={70} className="mb-3" style={{ color: '#FF7F50' }} />
      <h1 className="mb-3" style={{ fontWeight: '700' }}>
        Welcome to Quizfy!
      </h1>
      <p className="lead mb-2" style={{ fontSize: '1.25rem' }}>
        Test your knowledge with our quizzes.
      </p>
      <p className="mb-4" style={{ fontSize: '1.1rem' }}>
        Click the button below to start the quiz.
      </p>

      <button
        onClick={handleStartQuiz}
        className="btn btn-lg"
        style={{
          backgroundColor: '#FF7F50',
          border: 'none',
          padding: '12px 30px',
          fontWeight: '600',
          color: '#fff',
          boxShadow: '0 4px 15px rgba(255, 127, 80, 0.6)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 127, 80, 0.9)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 127, 80, 0.6)';
        }}
        disabled={loading}
      >
        {loading ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            style={{ marginRight: '10px' }}
          ></span>
        ) : null}
        {loading ? 'Loading...' : 'Start Quiz'}
      </button>

      {/* Fade-in animation style */}
      <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(20px);}
          to {opacity: 1; transform: translateY(0);}
        }

        
      `}</style>
    </div>
  );
};

export default Home;
