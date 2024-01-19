import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from "react-redux";

const Header = () => {
  const counter_val = useSelector((state) => state.counter.counter_val);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/" className="navbar-brand fs-1 fw-bold">
          E_Commerce
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className="nav-link text-dark fs-4 me-2">
              Product List
            </Link>
            <Link to="/cart" className="nav-link text-dark fs-4 me-2">
              <i className="fas fa-shopping-cart"></i>
            </Link>

          </Nav>
          <span className='border px-2'>
            {counter_val}
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
