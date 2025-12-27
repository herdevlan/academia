//frontend/src/pages/auth/Login.jsx


import React from 'react';
import HomePanel from '../../components/HomePanel';
import LoginForm from '../../components/LoginForm';
import MathChallenge from '../../components/MathChallenge';
import './Login.css'; // Fondo animado y estilos extra

export default function Login() {
  return (
    <div className="min-vh-100 d-flex flex-column flex-lg-row bg-gradient-animation">
      <HomePanel />
      <LoginForm />
      <MathChallenge />
    </div>
  );
}







/*import React from 'react';
import HomePanel from '../../components/HomePanel';

import LoginForm from '../../components/LoginForm';
import './Login.css'; // Fondo animado y estilos extra

export default function LoginPage() {
  return (
    <div className="min-vh-100 d-flex overflow-hidden position-relative bg-gradient-animation">
      <HomePanel /> 
      <LoginForm />
    </div>
  );
}

*/