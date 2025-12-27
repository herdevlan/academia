import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../api/users.js";
import { Modal, Button, Badge, Row, Col, Container } from "react-bootstrap";
import { FiUsers, FiPlus, FiEdit, FiTrash2, FiShield } from "react-icons/fi";
import RegisterForm from "../auth/Register.jsx";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    await deleteUser(id);
    loadUsers();
  };

  const roleColor = (role) => (role?.toLowerCase() === "admin" ? "danger" : "primary");

  // Función para formatear el ID en USR-0001
  const formatUserId = (id) => `USR-${String(id).padStart(4, "0")}`;

  return (
    <div className="container-fluid bg-light min-vh-100 py-5 d-flex justify-content-center">
      <Container style={{ maxWidth: "1200px" }}>
        {/* HEADER */}
        <Row className="mb-4 align-items-center">
          <Col>
            <div className="d-flex align-items-center gap-3">
              <FiUsers size={40} className="text-primary" />
              <div>
                <h2 className="fw-bold mb-0 text-center text-md-start">Gestión de Usuarios</h2>
                <small className="text-muted text-center text-md-start">
                  Administración general del sistema
                </small>
              </div>
            </div>
          </Col>

          <Col xs="auto" className="mt-3 mt-md-0 d-flex justify-content-center justify-content-md-end">
            <Button
              variant="primary"
              size="lg"
              className="d-flex align-items-center gap-2"
              onClick={() => setShowModal(true)}
            >
              <FiPlus />
              Crear usuario
            </Button>
          </Col>
        </Row>

        {/* CARD PRINCIPAL */}
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4 p-md-5">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "80px" }}>#</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th style={{ width: "150px" }}>Rol</th>
                    <th style={{ width: "160px" }} className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="text-muted">{formatUserId(u.id)}</td>
                      <td className="fw-semibold">{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <Badge
                          bg={roleColor(u.role)}
                          className="px-3 py-2 d-inline-flex align-items-center gap-1"
                        >
                          <FiShield />
                          {u.role}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => {
                              setEditingUser(u);
                              setShowModal(true);
                            }}
                          >
                            <FiEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(u.id)}
                          >
                            <FiTrash2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {users.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted">
                        No hay usuarios registrados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MODAL */}
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
            setEditingUser(null);
          }}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{editingUser ? "Editar usuario" : "Nuevo usuario"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterForm
              user={editingUser}
              onSuccess={() => {
                setShowModal(false);
                setEditingUser(null);
                loadUsers();
              }}
            />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
