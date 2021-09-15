const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //checking user exist on db
  const emailExist = await User.findOne({ email: email });
  if (emailExist)
    return res.status(400).send("Email đã tồn tại trên hệ thống!");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({ name, email, password: hashPassword });
  try {
    const saveUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
