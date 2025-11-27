import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import MFAConfirm from "../pages/auth/MFAConfirm.jsx";
import TeacherDashboard from "../pages/teacher/TeacherDashboard.jsx";

export default function AppRouter(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/auth/register" element={<Register/>} />
        <Route path="/mfa" element={<MFAConfirm/>} />
        <Route path="/dashboard" element={<TeacherDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}
