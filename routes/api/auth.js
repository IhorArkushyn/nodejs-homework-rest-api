const express = require("express");

const ctrl = require("../../controllers/auth/auth");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/users");

const router = express.Router();

// const { validateBody } = require("../../middlewares");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.registerSchema), ctrl.login);

module.exports = router;
