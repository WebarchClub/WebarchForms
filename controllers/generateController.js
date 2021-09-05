module.exports.generate_get = (req, res) => {
  res.render("formGeneration", {
    id: req.params.id,
  });
};
//here id is name
module.exports.generate_post = (req, res) => {
  console.log(req.files);
  // res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  // req.body.formData.forEach(function (val) {
  //   console.log(val.name);
  // });
  res.send("OK")
};
