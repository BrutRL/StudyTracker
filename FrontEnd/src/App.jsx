import "./App.css";
import Login from "./Auth/login";
import Register from "./Auth/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
