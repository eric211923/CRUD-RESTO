import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import View from "./pages/View";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Container fluid>
        <Header />
        <ToastContainer position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/update/:id" element={<AddItem />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Container>
    </Router>
  );
}
export default App;
