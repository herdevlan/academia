// frontend/src/components/AutoLogout.jsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const INACTIVITY_LIMIT = 3 * 1000; // 3 segundos para prueba extrema

export default function AutoLogout() {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const logout = () => {
    console.log('Sesión cerrada por inactividad');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/auth/login', { replace: true });
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];

    // Cada interacción reinicia el temporizador
    const handleActivity = () => resetTimer();

    // Escuchamos eventos en todo el documento
    events.forEach(event => document.addEventListener(event, handleActivity));

    // Iniciamos temporizador
    resetTimer();

    return () => {
      events.forEach(event => document.removeEventListener(event, handleActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return null;
}
