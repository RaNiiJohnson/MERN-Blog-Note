module.exports.signUpErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  if (err.message.includes("no-name")) errors.name = "Votre prenom ou name";

  if (err.message.includes("no-email"))
    errors.email = "Merci de taper votre email";

  if (err.message.includes("no-name")) errors.name = "Votre prenom ou name";

  if (err.message.includes("no-password"))
    errors.password = "Entrer votre mot de passe ici";

  if (err.message.includes("invalid-email")) errors.email = "Email incorrect";

  if (err.message.includes("min-password"))
    errors.password = "le mot de passe doit faire 6 caractère minimum";

  if (err.message.includes("name-exist-yet"))
    errors.name = "Pseudo incorrect ou déjà pris";

  if (err.message.includes("email-exist-yet"))
    errors.email = "Cet email est déjà enregistré";

  return errors;
};

module.exports.loginErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("name"))
    errors.email = "verifier bien votre email avant de connecter";

  if (err.message.includes("no-email"))
    errors.email = "Votre e-mail pour se connecter";

  if (err.message.includes("no-password"))
    errors.password = "Entrer votre mot de passe ici";

  if (err.message.includes("where-is-your-email"))
    errors.email = "Email inconnu";

  if (err.message.includes("mdp-false"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};
