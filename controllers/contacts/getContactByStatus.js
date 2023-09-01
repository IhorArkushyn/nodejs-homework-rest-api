const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const getContactByStatus = async (req, res) => {
  const { favorite = true } = req.query;
  const result = await Contact.find(favorite);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

module.exports = getContactByStatus;
