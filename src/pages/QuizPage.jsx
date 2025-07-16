import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Card, Button, Spinner, Alert, ProgressBar, Row, Col, Table,
} from 'react-bootstrap';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuizPage = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes

  // Redirect to login if no user
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await axios.get(`http://localhost:8000/api/questions/${subject}`);

        // for randomizing questions and limiting to 5
        const shuffled = res.data.sort(() => 0.5 - Math.random()).slice(0, 5);
        setQuestions(shuffled);
        setLoading(false);
      } catch (err) {
        setError('Failed to load questions');
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [subject]);

  // Countdown timer
  useEffect(() => {
    if (submitted || loading) return;
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, loading]);

  // Detect tab switch
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !submitted && !loading) {
        toast.warn("❗You switched tabs! cheater ", {
          position: "top-center",
          autoClose: 5000,
          theme: "colored",
        });
        handleSubmit();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [submitted, loading]);

  const handleOptionClick = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [current]: option,
    });
  };

  const handleNavigation = (index) => {
    setCurrent(index);
  };

  const handleSubmit = async () => {
    if (submitted) return; // prevent double submissions

    let count = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) count++;
    });
    setScore(count);
    setSubmitted(true);

    const user = localStorage.getItem('name') || 'Anonymous';
    const scoreData = { user, subject, score: count };

    try {
      await axios.post('http://localhost:8000/api/leaderboard', scoreData);
    } catch (err) {
      console.error('Error saving score:', err);
      toast.error('⚠️ Failed to save score, please try again.', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '900px' }}>
      <ToastContainer />

      <Button
        variant="outline-dark"
        className="mb-4 d-flex align-items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        Back to Subjects
      </Button>

      <h2
        className="text-center mb-4 fw-bold"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '2.5rem',
          color: '#0d6efd',
          letterSpacing: '1.5px',
        }}
      >
        📝 {subject.toUpperCase()} Quiz
      </h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center py-3">{error}</Alert>
      ) : submitted ? (
        <>
          <Alert
            variant="info"
            className="text-center fw-semibold"
            style={{ fontSize: '1.3rem' }}
          >
            ✅ Your Score: <span className="text-primary">{score}</span> / {questions.length}
          </Alert>

          {questions.map((q, idx) => {
            const selected = selectedAnswers[idx];
            const correct = q.answer;
            return (
              <Card
                key={idx}
                className="mb-4 p-3 shadow-sm border-0"
                style={{ borderRadius: '12px', backgroundColor: '#f8f9fa' }}
              >
                <h5 className="mb-3">
                  <strong>Q{idx + 1}:</strong> {q.question}
                </h5>
                <Row className="g-3">
                  {q.options.map((opt, i) => {
                    const isCorrect = opt === correct;
                    const isSelected = opt === selected;
                    const variant = isCorrect
                      ? 'success'
                      : isSelected && !isCorrect
                        ? 'danger'
                        : 'outline-secondary';

                    return (
                      <Col md={6} key={i}>
                        <Button
                          variant={variant}
                          disabled
                          className="w-100 text-start"
                          style={{ borderRadius: '8px', fontWeight: '500' }}
                        >
                          {opt} {isCorrect ? '✅' : isSelected && !isCorrect ? '❌' : ''}
                        </Button>
                      </Col>
                    );
                  })}
                </Row>
                <div className="mt-3" style={{ fontSize: '0.95rem' }}>
                  <strong>Your Answer:</strong> {selected || 'Not Answered'}<br />
                  <strong>Correct Answer:</strong> {correct}
                </div>
              </Card>
            );
          })}
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
            <ProgressBar
              now={((current + 1) / questions.length) * 100}
              className="flex-grow-1"
              style={{ height: '12px', borderRadius: '8px' }}
              animated
              striped
            />
            <div className="fw-bold text-danger" style={{ minWidth: '65px', fontSize: '1.1rem' }}>
              ⏱ {formatTime(timeLeft)}
            </div>
          </div>

          <Card className="shadow-lg p-4 mb-4" style={{ borderRadius: '12px' }}>
            <h5 className="mb-4" style={{ fontWeight: '600' }}>
              <strong>Q{current + 1}:</strong> {questions[current].question}
            </h5>
            <div className="d-flex flex-column gap-2">
              {questions[current].options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={selectedAnswers[current] === option ? 'primary' : 'outline-primary'}
                  onClick={() => handleOptionClick(option)}
                  className="text-start"
                  style={{ borderRadius: '8px', fontWeight: '500' }}
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
              <Button
                variant="outline-secondary"
                disabled={current === 0}
                onClick={() => setCurrent(current - 1)}
                style={{ minWidth: '120px' }}
              >
                ⬅️ Previous
              </Button>

              <Button
                variant="primary"
                disabled={current === questions.length - 1}
                onClick={() => setCurrent(current + 1)}
                style={{ minWidth: '120px' }}
              >
                Next ➡️
              </Button>
            </div>

            <div className="text-center mt-4">
              <Button
                variant="success"
                onClick={handleSubmit}
                size="lg"
                style={{ minWidth: '160px', fontWeight: '600' }}
                title={Object.keys(selectedAnswers).length < questions.length ? "Answer all questions before submitting" : ""}
              >
                Submit Quiz
              </Button>
            </div>
          </Card>

          <Table bordered className="text-center shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr>
                {questions.map((_, idx) => (
                  <th key={idx} style={{ padding: '8px' }}>
                    <Button
                      size="sm"
                      variant={current === idx ? 'dark' : selectedAnswers[idx] ? 'success' : 'outline-secondary'}
                      onClick={() => handleNavigation(idx)}
                      style={{ minWidth: '38px', fontWeight: '600' }}
                    >
                      {idx + 1}
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
          </Table>
        </>
      )}
    </Container>
  );
};

export default QuizPage;
