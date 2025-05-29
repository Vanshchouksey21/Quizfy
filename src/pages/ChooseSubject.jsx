import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

const ChooseSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchSubjects() {
      try {
        const res = await axios.get("http://localhost:8000/api/subjects");
        setSubjects(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load subjects");
        setLoading(false);
      }
    }
    fetchSubjects();
  }, [navigate]);

  const handleSubjectClick = (subject) => {
    navigate(`/quiz/${subject.name.toLowerCase()}`);
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "90vh", padding: "3rem 1rem" }}
    >
      <h2
        className="mb-5 text-center fw-bold"
        style={{ fontFamily: "'Poppins', sans-serif", fontSize: "2.8rem", color: "#0d6efd", letterSpacing: "2px" }}
      >
        🧠 Choose Your Quiz Subject
      </h2>

      {loading ? (
        <Spinner animation="border" variant="primary" role="status" />
      ) : error ? (
        <Alert variant="danger" className="text-center w-100" style={{ maxWidth: "400px" }}>
          {error}
        </Alert>
      ) : (
        <Row className="justify-content-center w-100" style={{ maxWidth: "960px" }}>
          {subjects.map((subject, idx) => (
            <Col
              key={subject._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4 d-flex align-items-stretch"
              style={{ animation: `fadeInUp 0.5s ease forwards`, animationDelay: `${idx * 0.15}s`, opacity: 0 }}
            >
              <Card
                onClick={() => handleSubjectClick(subject)}
                className="subject-card shadow rounded-4 text-center flex-fill border-0"
                style={{
                  cursor: "pointer",
                  padding: "1.5rem 1rem",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-center">
                  <Card.Title className="fw-semibold fs-5 text-primary mb-0" style={{ userSelect: "none" }}>
                    {subject.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <style type="text/css">{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

        .subject-card:hover {
          background-color: #0d6efd;
          color: white;
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 12px 30px rgba(13, 110, 253, 0.5);
        }
        .subject-card:hover .card-title {
          color: white;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Container>
  );
};

export default ChooseSubject;
