const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const { ObjectID } = require("bson");
const { signUpErrors, loginErrors } = require("../utils/errorsUtils");

const maxAge = 3 * 24 * 60 * 60;
const createoken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};
// , { expiresIn: "1h" }
module.exports.getUser = async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  User.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Id unknown :" + err);
  }).select("-password");
};

module.exports.getCurrentUser = async (req, res) => {
  res.status(200).send(req.user);
};

module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    const token = createoken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(201).json({ name, email, token });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let name = await User.findOne({ email });
    name = name.name;
    const user = await User.login(name, email, password);
    const token = createoken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });

    res.status(201).json({ name, email, token });
  } catch (err) {
    const errors = loginErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.follow = async (req, res) => {
  if (
    ObjectID.isValid(req.params.id) ||
    ObjectID.isValid(req.body.idToFollow)
  ) {
    await User.findByIdAndUpdate(
      { _id: ObjectID(req.params.id) },
      {
        $addToSet: {
          following: req.body.idToFollow,
        },
      },
      { upsertedId: true }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
    await User.findByIdAndUpdate(
      { _id: ObjectID(req.body.idToFollow) },
      {
        $addToSet: {
          followers: req.params.id,
        },
      },
      { upsertedId: true }
    );
  } else {
    res.status(500).json({ error: "not a valid doc id" });
  }
};

module.exports.unfollow = async (req, res) => {
  if (
    ObjectID.isValid(req.params.id) ||
    ObjectID.isValid(req.body.idToUnfollow)
  ) {
    await User.findByIdAndUpdate(
      { _id: ObjectID(req.params.id) },
      {
        $pull: {
          following: req.body.idToUnfollow,
        },
      },
      { upsertedId: true }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
    await User.findByIdAndUpdate(
      { _id: ObjectID(req.body.idToUnfollow) },
      {
        $pull: {
          followers: req.params.id,
        },
      },
      { upsertedId: true }
    );
  } else {
    res.status(500).json({ error: "not a valid doc id" });
  }
};
