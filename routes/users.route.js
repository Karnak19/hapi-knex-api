const uuid = require("uuid").v4;
const Joi = require("@hapi/joi");

const db = require("../data/db");
const { user, users } = require("../schemas");

const getAll = {
  path: "/users",
  method: "GET",
  handler: async (request, h) => {
    return await db("users");
  },
  options: {
    description: "All Users",
    notes: "Return the collection of users",
    tags: ["api"], // ADD THIS TAG
    response: { schema: users }
  }
};

const getOne = {
  path: "/users/{id}",
  method: "GET",
  handler: async (request, h) => {
    const { id } = request.params;
    return await db("users").where({ id });
  },
  options: {
    description: "One user",
    notes: "Return one user resource",
    tags: ["api"], // ADD THIS TAG
    validate: {
      params: Joi.object({
        id: Joi.string().guid({ version: "uuidv4" })
      })
    },
    response: { schema: user }
  }
};

const postOne = {
  path: "/users",
  method: "POST",
  handler: async (request, h) => {
    const id = uuid();
    const { firstName, lastName, age } = request.payload;
    await db("users").insert({ id, firstName, lastName, age });
    return await db("users")
      .where({ id })
      .first();
  },
  options: {
    description: "Create User",
    notes: "Create an user and returns it",
    tags: ["api"], // ADD THIS TAG,
    validate: {
      payload: users
    },
    response: { schema: user }
  }
};

const putOne = {
  path: "/users/{id}",
  method: ["PUT", "PATCH"],
  handler: async (request, h) => {
    const { id } = request.params;
    const { firstName, lastName, age } = request.payload;
    await db("users")
      .update({ firstName, lastName, age })
      .where({ id });
    return await db("users")
      .where({ id })
      .first();
  },
  options: {
    description: "Update User",
    notes: "Update an user and returns it",
    tags: ["api"], // ADD THIS TAG,
    validate: {
      params: Joi.object({
        id: Joi.string().guid({ version: "uuidv4" })
      }),
      payload: user
    },
    response: { schema: user }
  }
};

module.exports = [getAll, getOne, postOne, putOne];
