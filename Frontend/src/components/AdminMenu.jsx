import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import { FiUsers, FiHome, FiSettings, FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function AdminMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuStyle = {
    width: collapsed ? "60px" : "220px",
    transition: "width 0.3s",
    minHeight: "100vh",
    background: "#f8f9fa",
    borderRight: "1px solid #ddd",
    paddingTop: "20px"
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  const iconStyle = { marginRight: collapsed ? 0 : "10px", fontSize: "1.2rem" };

  return (
    <div style={menuStyle} className="d-flex flex-column">
      <Button 
        variant="outline-primary" 
        size="sm" 
        className="mb-3 mx-auto"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <FiArrowRight /> : <FiArrowLeft />}
      </Button>

      <Nav className="flex-column">
        <div style={linkStyle} onClick={() => navigate("/admin/dashboard")}>
          <FiHome style={iconStyle} />
          {!collapsed && "Dashboard"}
        </div>
        <div style={linkStyle} onClick={() => navigate("/admin/users")}>
          <FiUsers style={iconStyle} />
          {!collapsed && "Gestión de Usuarios"}
        </div>
        <div style={linkStyle} onClick={() => navigate("/admin/settings")}>
          <FiSettings style={iconStyle} />
          {!collapsed && "Configuración"}
        </div>
      </Nav>
    </div>
  );
}
