import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchScores() {
      try {
        const response = await axios.get('http://localhost:8000/api/leaderboard');
        setScores(response.data);
      } catch {
        setError('Failed to load leaderboard.');
      } finally {
        setLoading(false);
      }
    }
    fetchScores();
  }, []);

  return (
    <Container className="mt-5">
      <Button variant="outline-dark" className="mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" />
        Back
      </Button>

      <h2 className="text-center mb-4">🏆 Global Leaderboard</h2>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : scores.length === 0 ? (
        <Alert variant="info" className="text-center">No scores to display yet.</Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Subject</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((entry, idx) => (
              <tr key={entry._id}>
                <td>{idx + 1}</td>
                <td>{entry.user}</td>
                <td>{entry.subject.toUpperCase()}</td>
                <td>{entry.score} / 5</td>
                <td>{new Date(entry.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Leaderboard;
