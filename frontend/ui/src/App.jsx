import React, { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import { Employeelist } from './components/Employeelist';
import { InsertEmployee } from './components/InsertEmployee';
import UpdateEmployee from './components/UpdateEmployee'; // Import the UpdateEmployee component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/list" element={<Employeelist />} />
          <Route path="/insert" element={<InsertEmployee />} />
          <Route path="/update/:id" element={<UpdateEmployee />} /> {/* Route for updating */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
