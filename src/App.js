import React, { useState, useEffect } from 'react';
import './App.css';
import ImageGallery from './ImageGallery';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageGallery />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;