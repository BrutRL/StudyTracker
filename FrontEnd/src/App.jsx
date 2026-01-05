import "./App.css";
import Login from "./Auth/login";
import Register from "./Auth/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Sidebar from "./Pages/sidebar";
import ProctectedRoutes from "./Auth/protectedRoutes";
function App() {
  // branch
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProctectedRoutes>
              <Sidebar />
            </ProctectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
