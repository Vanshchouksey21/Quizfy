import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{  background: 'linear-gradient(135deg, #4A6CF7, #D5E6FB)', color: '#fff', padding: '40px 0' }}>
      <Container>
        <Row className="mb-4 text-center text-md-start">
          <Col md={4}>
            <h5 className="fw-bold mb-3">Quizfy</h5>
            <p>
              Empowering learning through fun, interactive, and personalized quizzes.
            </p>
          </Col>

          <Col md={4}>
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About</a></li>
              <li><a href="/subject" className="text-white text-decoration-none">Subjects</a></li>
              <li><a href="/login" className="text-white text-decoration-none">Login</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="fw-bold mb-3">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="text-white fs-5"><FaFacebookF /></a>
              <a href="#" className="text-white fs-5"><FaTwitter /></a>
              <a href="#" className="text-white fs-5"><FaLinkedinIn /></a>
              <a href="#" className="text-white fs-5"><FaInstagram /></a>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        <Row>
          <Col className="text-center">
            <small>
              &copy; {new Date().getFullYear()} Quizfy. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
