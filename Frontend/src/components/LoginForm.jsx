

// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('http://localhost:4000/api/auth/login', { email, password });
      if (res.data.mfaRequired) {
        sessionStorage.setItem('tempToken', res.data.tempToken);
        nav('/mfa');
        return;
      }
      localStorage.setItem('token', res.data.token);
      nav('/dashboard');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error login');
    }
  };

  return (
    <div className="col-12 col-lg-4 d-flex justify-content-center align-items-center p-5">
      <div className="card shadow-lg p-4 rounded-4 border-0 w-100 max-w-login" style={{ background: '#ffffffee' }}>
        <h2 className="text-center fw-bold mb-4">Iniciar sesión</h2>
        {msg && <div className="alert alert-danger">{msg}</div>}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contraseña</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 rounded-3 mb-3">
            Ingresar
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="/forgot-password" className="text-decoration-none small">¿Olvidaste tu contraseña?</a>
        </div>

        <div className="text-center mt-4">
          <p className="small">¿No tienes cuenta?</p>
          <button
            onClick={() => nav('/auth/register')}
            className="btn btn-outline-primary w-100 btn-lg rounded-3"
          >
            Registrarse como estudiante
          </button>
        </div>
      </div>
    </div>
  );
}
