
const express = require("express");

const {
  register,
  login,
  getMe,
} = require("../controllers/UserController");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Current authenticated user
router.get("/me", getMe);

module.exports = router;

