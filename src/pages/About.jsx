import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(to right, #f8f9fc, #d5e6fb)',
        padding: '60px 0',
      }}
    >
      <Container>
        <Row className="mb-5">
          <Col>
            <h2 className="text-center fw-bold" style={{ color: '#4A6CF7' }}>
              About <span style={{ color: '#FF7F50' }}>Quizfy</span>
            </h2>
            <p className="text-center text-muted fs-5 mx-auto" style={{ maxWidth: '700px' }}>
              Quizfy is an interactive quiz platform designed to enhance your learning through fun and engaging quizzes..
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={4}>
            <Card className="shadow-lg border-0 h-100 about-card">
              <Card.Body>
                <Card.Title className="text-success fw-bold mb-3">🚀 Our Mission</Card.Title>
                <Card.Text>
                  To make learning enjoyable and accessible by offering quizzes across a wide range of technical and academic subjects.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-lg border-0 h-100 about-card">
              <Card.Body>
                <Card.Title className="text-info fw-bold mb-3">🎯 Why Quizfy?</Card.Title>
                <Card.Text>
                  Whether you're preparing for interviews, exams, or just want to test your skills, Quizfy offers a personalized quiz experience for everyone.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-lg border-0 h-100 about-card">
              <Card.Body>
                <Card.Title className="text-warning fw-bold mb-3">📚 Subjects We Cover</Card.Title>
                <Card.Text>
                  HTML, CSS, JavaScript, React, Node.js, C++, DSA, Machine Learning, and more! We’re constantly expanding our topic list.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="text-center">
            <p className="text-muted fs-6 mb-0">
              &copy; {new Date().getFullYear()} <strong>Quizfy</strong>. Empowering learning through questions.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Extra Styling */}
      <style>{`
        .about-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .about-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default About;
