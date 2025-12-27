//frontend/src/routes/AppRouter.jsx


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import MFAConfirm from "../pages/auth/MFAConfirm.jsx";
import TeacherDashboard from "../pages/teacher/TeacherDashboard.jsx";
import AdminUsers from "../pages/admin/AdminUsers.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AutoLogout from '../components/AutoLogout.jsx';

export default function AppRouter(){
  return (
    <BrowserRouter>
    <AutoLogout />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/auth/register" element={<Register/>} />
        <Route path="/mfa" element={<MFAConfirm/>} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard/>} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
