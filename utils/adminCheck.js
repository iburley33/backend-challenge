const JWT = require("jsonwebtoken");

const adminCheck = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(400).json({
      errors: [
        {
          msg: "No Bearer token found",
        },
      ],
    });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid Bearer token format",
        },
      ],
    });
  }

  try {
    const secretKey = process.env.JWT_SECRET;

    let user = await JWT.verify(token, secretKey);
    if (user.role === "Admin") {
      req.user = user.email;
      next();
    } else {
      return res.status(403).json({
        message: "Access level denied",
      });
    }
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: "Token invalid",
        },
      ],
    });
  }
};

module.exports = adminCheck;
