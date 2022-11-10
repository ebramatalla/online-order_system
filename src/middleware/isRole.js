module.exports = (roles) => {
  return (req, res, next) => {
    try {
      if (roles.includes(req.user.Role)) {
        next();
      } else {
        res.send({ error: "not Allow" });
      }
    } catch (error) {
      res.send(error);
    }
  };
};
