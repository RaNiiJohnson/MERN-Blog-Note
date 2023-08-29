const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  picture: {
    type: String,
    default: "/uploads/profil/random-user.png",
  },
  followers: {
    type: [String],
  },
  following: {
    type: [String],
  },
  likes: {
    type: [String],
  },
});
// static signup
UserSchema.statics.signup = async function (name, email, password) {
  if (!name) {
    throw Error("no-name");
  }
  if (!email) {
    throw Error("no-email");
  }

  if (!password) {
    throw Error("no-password");
  }

  if (password.length < 6) {
    throw Error("min-password");
  }

  if (!validator.isEmail(email)) {
    throw Error("invalid-email");
  }

  const emailExiste = await this.findOne({ email });

  if (emailExiste) {
    throw Error("email-exist-yet");
  }

  const nameExiste = await this.findOne({ name });

  if (nameExiste) {
    throw Error("name-exist-yet");
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });

  return user;
};

//login static
UserSchema.statics.login = async function (name, email, password) {
  if (!email) {
    throw Error("no-email");
  }

  if (!password) {
    throw Error("no-password");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("where-is-your-email");
  }

  const pass = await bcrypt.compare(password, user.password);

  if (!pass) {
    throw Error("mdp-false");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
