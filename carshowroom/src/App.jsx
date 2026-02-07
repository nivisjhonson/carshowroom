import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Models from "./pages/Model";
import ModelDetails from "./pages/Modeldetails";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import "./App.css";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/models" element={<Models />} />
        <Route path="/models/:slug" element={<ModelDetails />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );

}

