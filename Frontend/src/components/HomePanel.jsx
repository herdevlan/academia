

// src/components/HomePanel.jsx
import React from 'react';
import '../pages/auth/Login.css';

export default function HomePanel() {
  return (
    <div className="col-12 col-lg-4 d-flex flex-column justify-content-center text-white p-5 left-panel elegant-panel">
      <h1 className="display-3 fw-bold mb-3">VicOps</h1>
      <p className="lead mb-4">Plataforma de diagnóstico académico y rutas de aprendizaje personalizadas.</p>

      <div className="p-4 bg-dark bg-opacity-20 rounded-4 shadow-lg">
        <h3 className="fw-semibold mb-3">Bienvenido</h3>
        <p className="mb-4">
          Accede a evaluaciones diagnósticas y rutas de aprendizaje adaptadas a tus necesidades.
        </p>

        <ul className="mt-3 list-unstyled elegant-list">
          <li className="mb-2">Evaluaciones rápidas con retroalimentación inmediata.</li>
          <li className="mb-2">Rutas de aprendizaje personalizadas según tu desempeño.</li>
          <li className="mb-2">Seguimiento continuo de tu progreso académico.</li>
          <li>Contenido especializado en matemáticas y lógica.</li>
        </ul>
      </div>
    </div>
  );
}
