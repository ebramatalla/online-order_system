module.exports = (roles) => {
  return (req, res, next) => {
    try {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        res.send({ error: "not Allow" });
      }
    } catch (error) {
      res.send(error);
    }
  };
};
