import AdminMenu from "../../components/AdminMenu";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FiUsers, FiBarChart2, FiSettings } from "react-icons/fi";

export default function AdminDashboard() {
  return (
    <div className="d-flex min-vh-100">

      {/* Sidebar fijo */}
      <div style={{ width: '250px' }}>
        <AdminMenu />
      </div>

      {/* Contenido centrado */}
      <div className="flex-grow-1 bg-light p-4 d-flex justify-content-center align-items-start">
        <Container style={{ maxWidth: '1100px' }}>
          <h2 className="mb-5 fw-bold text-center">Panel de Administración</h2>

          <Row className="g-4 justify-content-center">
            <Col xs={12} md={6} lg={4}>
              <Card className="shadow-sm h-100 text-center p-4">
                <FiUsers size={36} className="mb-3 text-primary" />
                <Card.Title>Usuarios</Card.Title>
                <Card.Text>Gestiona todos los usuarios registrados del sistema.</Card.Text>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Card className="shadow-sm h-100 text-center p-4">
                <FiBarChart2 size={36} className="mb-3 text-success" />
                <Card.Title>Estadísticas</Card.Title>
                <Card.Text>Visualiza métricas y actividad de la plataforma.</Card.Text>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Card className="shadow-sm h-100 text-center p-4">
                <FiSettings size={36} className="mb-3 text-warning" />
                <Card.Title>Configuración</Card.Title>
                <Card.Text>Administra parámetros generales del sistema.</Card.Text>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
