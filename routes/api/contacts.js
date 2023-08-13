const express = require("express");
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const router = express.Router();
const Joi = require("joi");
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  // phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
  // res.json({ message: "template message" });
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Contact not found");
      // return res.status(404).json({ message: "Contact not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
  // console.log(req.params);
  // const oneContact = await contacts.getContactById(contactId);
  // return console.log(oneContact);
  // res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    // console.log(error);
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
    // console.log(req.body);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json({ message: "Successfully removed contact" });
  } catch (error) {
    next(error);
  }
  // res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
