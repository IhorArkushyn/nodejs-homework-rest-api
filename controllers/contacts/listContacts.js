const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const favorite = req.query.favorite === "true";

  if (favorite) {
    // const favorite = req.query.favorite === "true"; // Отримання значення параметра favorite з об'єкта req.query та перевірка, чи воно дорівнює 'true'
    const result = await Contact.find({ owner, favorite }, "", {
      skip,
      limit,
    }).populate("owner", "name email"); // Пошук контактів за власником та значенням favorite, з використанням пропуску, ліміту та популювання власника контакту

    return res.json(result); // Відправка відповіді зі списком контактів
  }

  const result = await Contact.find({ owner }, "", { skip, limit }).populate(
    "owner",
    "name email"
  ); // Пошук контактів за власником, з використанням пропуску, ліміту та популювання власника контакту
  res.json(result);
};

module.exports = listContacts;
