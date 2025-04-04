const errmiddle = (err, req, res, next) => {
  console.log(err.stack);
  err.status(500).send("Error");
};

module.exports = errmiddle;
