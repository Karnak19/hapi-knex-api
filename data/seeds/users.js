const uuid = require("uuid").v4;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomTeamId(array) {
  return array[getRandomInt(array.length)].id;
}

const teams = [
  { id: uuid(), name: "JavaScript", logo: "" },
  { id: uuid(), name: "Golang", logo: "" },
  { id: uuid(), name: "PHP", logo: "" }
];

const users = [
  {
    id: uuid(),
    firstName: "Toto",
    lastName: "Jean",
    age: "18",
    teamId: getRandomTeamId(teams)
  },
  {
    id: uuid(),
    firstName: "Tata",
    lastName: "Jane",
    age: "8",
    teamId: getRandomTeamId(teams)
  },
  {
    id: uuid(),
    firstName: "Jean",
    lastName: "Dick",
    age: "38",
    teamId: getRandomTeamId(teams)
  },
  {
    id: uuid(),
    firstName: "Nick",
    lastName: "Does",
    age: "14",
    teamId: getRandomTeamId(teams)
  },
  {
    id: uuid(),
    firstName: "John",
    lastName: "Peter",
    age: "73",
    teamId: getRandomTeamId(teams)
  },
  {
    id: uuid(),
    firstName: "Tom",
    lastName: "Mark",
    age: "68",
    teamId: getRandomTeamId(teams)
  },
  {
    id: uuid(),
    firstName: "Nigel",
    lastName: "Spencer",
    age: "26",
    teamId: getRandomTeamId(teams)
  },
  {
    id: uuid(),
    firstName: "Tom",
    lastName: "Jane",
    age: "28",
    teamId: getRandomTeamId(teams)
  },
  {
    id: uuid(),
    firstName: "Tata",
    lastName: "Hamill",
    age: "12",
    teamId: getRandomTeamId(teams)
  },
  {
    id: uuid(),
    firstName: "Titi",
    lastName: "Jack",
    age: "38",
    teamId: getRandomTeamId(teams)
  }
];

exports.seed = async knex => {
  try {
    await Promise.all([knex("users").del(), knex("teams").del()]);
    await knex("teams").insert(teams);
    await knex("users").insert(users);
  } catch (err) {}
};
