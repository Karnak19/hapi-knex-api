const Joi = require("@hapi/joi");

const user = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(20),
  lastName: Joi.string().min(3),
  age: Joi.number()
    .min(18)
    .required(),
  teamId: Joi.string().guid({ version: "uuidv4" })
});

const users = Joi.array().items(user);

const team = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20),
  logo: Joi.string().min(3)
});

const teams = Joi.array().items(team);

module.exports = {
  user,
  users,
  team,
  teams
};
