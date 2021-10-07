const Form = require("../models/form");

module.exports.view_get = async (req, res) => {
  const id = req.params.id;
  const form = await Form.findOne({ formId: id });
  res.render("viewForm", { form: form });
};
