import { useState, useEffect } from "react";
import { createUser, updateUser } from "../../api/users.js";
import { Form, Button, Alert } from "react-bootstrap";

/* ===========================
   Validación de contraseña
=========================== */
const validatePassword = (password) => {
  const minLength = 8;
  const complexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

  if (password.length < minLength) {
    return "La contraseña debe tener al menos 8 caracteres";
  }

  if (!complexity.test(password)) {
    return "Debe incluir mayúsculas, minúsculas, números y caracteres especiales";
  }

  return null;
};

export default function RegisterForm({ user, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("estudiante");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setPassword("");
      setPasswordConfirm("");
    } else {
      setName("");
      setEmail("");
      setRole("estudiante");
      setPassword("");
      setPasswordConfirm("");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!name || !email) {
      setMsg("Por favor completa todos los campos.");
      return;
    }

    // Validaciones SOLO al crear usuario
    if (!user) {
      if (!password || !passwordConfirm) {
        setMsg("Debes ingresar y confirmar la contraseña.");
        return;
      }

      if (password !== passwordConfirm) {
        setMsg("Las contraseñas no coinciden.");
        return;
      }

      const passwordError = validatePassword(password);
      if (passwordError) {
        setMsg(passwordError);
        return;
      }
    }

    try {
      if (user) {
        await updateUser(user.id, {
          name,
          email,
          role,
          ...(password && { password }),
        });
      } else {
        await createUser({
          name,
          email,
          role,
          password,
          passwordConfirm,
        });
      }

      onSuccess();
    } catch (err) {
      setMsg(err.response?.data?.message || "Error creando/actualizando usuario");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {msg && <Alert variant="danger">{msg}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Rol</Form.Label>
        <Form.Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
          <option value="administrador">Administrador</option>
        </Form.Select>
      </Form.Group>

      {!user && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </Form.Group>
        </>
      )}

      <Button variant="success" type="submit">
        {user ? "Actualizar Usuario" : "Crear Usuario"}
      </Button>
    </Form>
  );
}



/*import { useState, useEffect } from "react";
import { createUser, updateUser } from "../../api/users.js";
import { Form, Button, Alert } from "react-bootstrap";

export default function RegisterForm({ user, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("estudiante");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    } else {
      setName("");
      setEmail("");
      setRole("estudiante");
      setPassword("");
      setPasswordConfirm("");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!name || !email || (!user && (!password || password !== passwordConfirm))) {
      setMsg("Por favor completa todos los campos correctamente.");
      return;
    }

    try {
      if (user) {
        await updateUser(user.id, { name, email, role, ...(password && { password }) });
      } else {
        await createUser({ name, email, role, password, passwordConfirm });
      }
      onSuccess();
    } catch (err) {
      setMsg(err.response?.data?.message || "Error creando/actualizando usuario");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {msg && <Alert variant="danger">{msg}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Rol</Form.Label>
        <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
          <option value="administrador">Administrador</option>
        </Form.Select>
      </Form.Group>

      {!user && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </Form.Group>
        </>
      )}

      <Button variant="success" type="submit">
        {user ? "Actualizar Usuario" : "Crear Usuario"}
      </Button>
    </Form>
  );
}



/*import { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    emailConfirm: '',
    password: '',
    passwordConfirm: ''
  });

  const [msg, setMsg] = useState('');
  const [type, setType] = useState('');
  const nav = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    setMsg('');
    setType('');

    if (form.email !== form.emailConfirm) {
      setMsg('Los correos no coinciden.');
      setType('danger');
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setMsg('Las contraseñas no coinciden.');
      setType('danger');
      return;
    }

    try {
      const res = await api.post('/auth/register', form);
      //localStorage.setItem('token', res.data.token);

      setMsg('Registro exitoso. Redirigiendo...');
      setType('success');

      setTimeout(() => nav('/auth/login'), 1200);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
      setType('danger');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a1a33', // azul marino
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <form
        onSubmit={submit}
        className="card p-4 shadow-lg"
        style={{
          width: '420px',
          borderRadius: '16px',
          background: '#ffffffee',
          backdropFilter: 'blur(4px)',
        }}
      >
        <h3 className="text-center mb-4 fw-bold" style={{ color: '#0a1a33' }}>
          Crear Cuenta
        </h3>

        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="form-control"
            placeholder="Nombre"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className="form-control"
            placeholder="correo@example.com"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar correo</label>
          <input
            name="emailConfirm"
            type="email"
            value={form.emailConfirm}
            onChange={onChange}
            className="form-control"
            placeholder="Repite tu correo"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            className="form-control"
            placeholder="Contraseña"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar contraseña</label>
          <input
            type="password"
            name="passwordConfirm"
            value={form.passwordConfirm}
            onChange={onChange}
            className="form-control"
            placeholder="Repite tu contraseña"
            required
          />
        </div>

        {msg && (
          <div className={`alert alert-${type} text-center`} role="alert">
            {msg}
          </div>
        )}

        <button
          type="submit"
          className="btn w-100 text-white"
          style={{
            backgroundColor: '#0a1a33',
            borderRadius: '12px',
            padding: '10px',
            fontWeight: '500',
          }}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
*/