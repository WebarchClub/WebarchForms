const Form = require("../models/form");

module.exports.view_get = async (req, res) => {
  const id = req.params.id;
  const form = await Form.findOne({ formId: id });
  console.log(form.arObj[1].mcq);
  res.render("viewForm", { form: form });
};

module.exports.view_get_2 = async (req, res) => {
  const id = req.params.id;
  const form = await Form.findOne({ formId: id });
  res.json({ form });
};
