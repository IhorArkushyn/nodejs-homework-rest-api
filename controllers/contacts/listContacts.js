const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const favorite = req.query.favorite === "true";

  if (favorite) {
    const result = await Contact.find({ owner, favorite }, "", {
      skip,
      limit,
    }).populate("owner", "name email");

    return res.json(result);
  }

  const result = await Contact.find({ owner }, "", { skip, limit }).populate(
    "owner",
    "name email"
  );
  res.json(result);
};

module.exports = listContacts;
