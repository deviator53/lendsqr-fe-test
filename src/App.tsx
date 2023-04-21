import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Guarantor from './pages/Guarantor';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Users from './pages/Users';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Users />} />
          <Route path="guarantors" element={<Guarantor/>} />
        </Route>
      </Routes>
     </BrowserRouter>
  );
}

export default App;
