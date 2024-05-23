import Home from "./Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyForm from "./MyForm";
import ChatBot from "./ChatBot";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/MyForm" element={<MyForm />} />
          <Route exact path="/Chatbot" element={<ChatBot />} />
        </Routes>
      </div>
    </Router>
  );
}
