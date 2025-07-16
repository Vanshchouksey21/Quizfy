// client/src/pages/admin/DashboardOverview.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch admin stats', err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4 fw-bold text-center">📊 Admin Dashboard Overview</h2>
      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card bg="primary" text="white" className="p-3">
            <Card.Title>Total Users</Card.Title>
            <Card.Text className="fs-3">{stats.totalUsers}</Card.Text>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card bg="success" text="white" className="p-3">
            <Card.Title>Total Subjects</Card.Title>
            <Card.Text className="fs-3">{stats.totalSubjects}</Card.Text>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card bg="info" text="white" className="p-3">
            <Card.Title>Total Questions</Card.Title>
            <Card.Text className="fs-3">{stats.totalQuestions}</Card.Text>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card bg="warning" text="dark" className="p-3">
            <Card.Title>Total Submissions</Card.Title>
            <Card.Text className="fs-3">{stats.totalScores}</Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardOverview;
