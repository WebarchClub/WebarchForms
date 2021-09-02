module.exports.createForm = (req, res) => {
  res.render("dashBoard", {
    id: req.params.id,
  });
};
