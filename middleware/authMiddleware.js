const protect = (req, res, next) => {
  const { user } = req.session;
  console.log(
    "🚀 ~ file: authMiddleware.js ~ line 3 ~ protect ~ req",
    req.session
  );
  console.log("🚀 ~ file: authMiddleware.js ~ line 3 ~ protect ~ user", user);

  if (!user) {
    return res
      .status(401)
      .json({ status: "fail", message: "unauthorized user" });
  }

  req.user = user;

  next();
};

module.exports = protect;
