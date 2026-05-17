import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import PasswordCheck from "./components/PasswordCheck";
import UsernameCheck from "./components/UsernameCheck";
import History from "./components/History";
import Guide from "./components/Guide";
import Chatbot from "./components/Chatbot";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/password" element={<PasswordCheck />} />
        <Route path="/username" element={<UsernameCheck />} />
        <Route path="/history" element={<History />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;