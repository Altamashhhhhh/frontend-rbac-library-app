
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/Home.css"
import Navbar from './Navbar';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>WELCOME TO THE HOME PAGE</h1>
      <Navbar/>
     
    </div>
  );
};

export default Home;
