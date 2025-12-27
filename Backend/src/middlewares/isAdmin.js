//Backend/src/middlewares/isAdmin.js
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "No autenticado",
    });
  }

  // 🔥 CORRECCIÓN CLAVE
  if (req.user.role !== "administrador") {
    return res.status(403).json({
      message: "Acceso denegado: solo administradores",
    });
  }

  next();
};
