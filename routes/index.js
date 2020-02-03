const users = require("./users.route");
const teams = require("./teams.route");

module.exports = [...users, ...teams];
