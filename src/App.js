import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import View from "./pages/View";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container } from "react-bootstrap";
import AppNavbar from "./components/AppNavbar";

function App() {
  return (
    <Router>
      <Container fluid>
        <AppNavbar />
        <ToastContainer position="bottom-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/update/:id" element={<EditItem />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Container>
    </Router>
  );
}
export default App;
