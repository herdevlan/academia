// frontend/src/components/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const TOKEN_LIFETIME = 5 * 60; // 5 minutos en segundos

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [blockedTime, setBlockedTime] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(null);
  const [countdown, setCountdown] = useState(0);

  const nav = useNavigate();

  // Contador de bloqueo
  useEffect(() => {
    if (blockedTime <= 0) return;
    const interval = setInterval(() => setBlockedTime(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [blockedTime]);

  // Contador de sesión
  useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          localStorage.removeItem('token');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    setAttemptsLeft(null);

    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user, mfaRequired, tempToken } = res.data;

      if (!user || !user.role) {
        setMsg('Usuario no recibido correctamente');
        return;
      }

      if (mfaRequired) {
        sessionStorage.setItem('tempToken', tempToken);
        sessionStorage.setItem('user', JSON.stringify(user));
        nav('/mfa');
        return;
      }

      // Guardamos token y rol
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      setCountdown(TOKEN_LIFETIME); // iniciamos contador de expiración de token

      // Ruteo según rol
      if (user.role === 'administrador') nav('/admin/dashboard');
      else if (user.role === 'docente') nav('/teacher/dashboard');
      else nav('/student/dashboard');

    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data || {};
      const message = data.message || 'Error login';

      // Bloqueo por superar intentos
      if (status === 403 && data.blockedSeconds) {
        setBlockedTime(data.blockedSeconds);
        setMsg(`Usuario bloqueado temporalmente. Intenta nuevamente más tarde.`);
      } 
      // Intentos restantes
      else if (status === 401 && data.attemptsLeft !== undefined) {
        setAttemptsLeft(data.attemptsLeft);
        setMsg(`Credenciales inválidas. Te quedan ${data.attemptsLeft} intento(s) antes de que se bloquee tu usuario.`);
      } 
      else {
        setMsg(message);
      }
    }
  };

  return (
    <div className="col-12 col-lg-4 d-flex justify-content-center align-items-center p-5">
      <div className="card shadow-lg p-4 rounded-4 border-0 w-100 max-w-login">
        <h2 className="text-center fw-bold mb-4">Iniciar sesión</h2>

        {/* Mensajes */}
        {msg && <div className="alert alert-danger">{msg}</div>}
        {blockedTime > 0 && <div className="alert alert-warning">Tiempo bloqueado: {blockedTime} seg</div>}
        {countdown > 0 && <div className="alert alert-info">Sesión expira en: {countdown} seg</div>}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button className="btn btn-primary btn-lg w-100" disabled={blockedTime > 0}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
