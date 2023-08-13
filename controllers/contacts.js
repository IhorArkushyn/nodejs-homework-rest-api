const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);

  // res.json({ message: "template message" });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};
const addContact = async (req, res) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  // console.log(error);
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
  // console.log(req.body);
};
const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json({ message: "Successfully removed contact" });

  // res.json({ message: "template message" });
};

const updateContact = async (req, res) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
