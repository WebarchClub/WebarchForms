module.exports.createForm = (req, res) => {
  res.render("dashBoard", {
    email: req.params.email,
  });
};
