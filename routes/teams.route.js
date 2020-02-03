const uuid = require("uuid").v4;
const Joi = require("@hapi/joi");

const db = require("../data/db");
const { team, teams, users } = require("../schemas");

const getAll = {
  path: "/teams",
  method: "GET",
  handler: async (request, h) => {
    return await db("teams");
  },
  options: {
    description: "All Teams",
    notes: "Return the collection of teams",
    tags: ["api"], // Tag as Swagger API Resource
    response: { schema: teams }
  }
};

const getAllUsers = {
  path: "/teams/{id}/users",
  method: "GET",
  handler: async (request, h) => {
    const { id } = request.params;
    return await db("users").where({ teamId: id });
  },
  options: {
    description: "All Users from a team",
    notes: "Return the collection of users in a team",
    tags: ["api"], // Tag as Swagger API Resource
    validate: {
      params: Joi.object({
        id: Joi.string().guid({ version: "uuidv4" })
      })
    },
    response: { schema: users }
  }
};

const getOne = {
  path: "/teams/{id}",
  method: "GET",
  handler: async (request, h) => {
    const { id } = request.params;
    return await db("teams").where({ id });
  },
  options: {
    description: "One team",
    notes: "Return one team resource",
    tags: ["api"], // Tag as Swagger API Resource
    validate: {
      params: Joi.object({
        id: Joi.string().guid({ version: "uuidv4" })
      })
    },
    response: { schema: team }
  }
};

const postOne = {
  path: "/teams",
  method: "POST",
  handler: async (request, h) => {
    const id = uuid();
    const { name, logo } = request.payload;
    await db("teams").insert({ id, name, logo });
    return await db("teams")
      .where({ id })
      .first();
  },
  options: {
    description: "Create Team",
    notes: "Create a team and returns it",
    tags: ["api"], // Tag as Swagger API Resource
    validate: {
      payload: team
    },
    response: { schema: team }
  }
};

const putOne = {
  path: "/teams/{id}",
  method: ["PUT", "PATCH"],
  handler: async (request, h) => {
    const { id } = request.params;
    const { name, logo } = request.payload;
    await db("teams")
      .update({ name, logo })
      .where({ id });
    return await db("teams")
      .where({ id })
      .first();
  },
  options: {
    description: "Update Team",
    notes: "Update a team and returns it",
    tags: ["api"], // Tag as Swagger API Resource
    validate: {
      params: Joi.object({
        id: Joi.string().guid({ version: "uuidv4" })
      }),
      payload: team
    },
    response: { schema: teams }
  }
};

module.exports = [getAll, getOne, postOne, putOne, getAllUsers];
