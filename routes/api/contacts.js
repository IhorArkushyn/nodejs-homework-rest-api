const express = require("express");
// const { validateBody } = require("../../middlewares");
// const shemas = require("../../schemas/contacts");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

// router.post("/", validateBody(shemas.addSchema), ctrl.addContact);

// router.delete("/:contactId", ctrl.removeContact);

// router.put("/:contactId", validateBody(shemas.addSchema), ctrl.updateContact);

module.exports = router;
