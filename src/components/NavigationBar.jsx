import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        paddingTop: '0.6rem',
        paddingBottom: '0.6rem',
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center"
          style={{
            fontWeight: '700',
            fontSize: '1.6rem',
            letterSpacing: '1.2px',
            color: '#f8f9fa',
          }}
        >
          <FontAwesomeIcon icon={faQuestionCircle} size="lg" className="me-2 text-warning" />
          Quizfy
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-lg-4">
            <Nav.Link
              as={Link}
              to="/"
              className="nav-link-hover"
              style={{ fontSize: '1.05rem', fontWeight: 500 }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className="nav-link-hover"
              style={{ fontSize: '1.05rem', fontWeight: 500 }}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/leaderboard"
              className="nav-link-hover"
              style={{ fontSize: '1.05rem', fontWeight: 500 }}
            >
              Leaderboard
            </Nav.Link>
          </Nav>

          <Nav className="mt-3 mt-lg-0">
            {!token ? (
              <Nav.Link
                as={Link}
                to="/login"
                className="btn btn-outline-light rounded-pill px-4"
                style={{ fontWeight: '600' }}
              >
                Login
              </Nav.Link>
            ) : (
              <Button
                variant="outline-light"
                onClick={handleLogout}
                className="rounded-pill px-4"
                style={{ fontWeight: '600' }}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Custom Hover Styles */}
      <style type="text/css">{`
        .nav-link-hover {
          color: #f8f9fa !important;
          transition: all 0.3s ease-in-out;
        }
        .nav-link-hover:hover {
          color: #FF7F50 !important; /* Bright Orange on hover */
        }
        .btn-outline-light:hover {
          background-color: #FF7F50 !important;
          border-color: #FF7F50 !important;
          color: white !important;
        }
      `}</style>
    </Navbar>
  );
};

export default NavigationBar;
