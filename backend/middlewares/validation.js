const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

function validateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token não fornecido." });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error("Erro na validação do token:", err); 
      return res.status(401).json({ message: "Token inválido." });
    }

    req.user = decoded;
    next();
  });
}

module.exports = validateToken;
