module.exports.generate_get = (req, res) => {
  res.render("formGeneration", {
    id: req.params.id,
  });
};
module.exports.generate_post = (req, res) => {
  console.log(req.body);
};
