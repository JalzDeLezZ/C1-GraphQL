"use strict";

require('dotenv').config();
const { makeExecutableSchema } = require("graphql-tools");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { readFileSync } = require("fs");
const { join } = require("path");
const resolvers = require("./lib/resolvers.js");

const app = express();
const port = process.env.PORT || 3000;

// define schema
const typeDefs = readFileSync(
  join(__dirname, "lib", "schema.graphql"),
  "utf-8"
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  "/api",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api`);
});

//  =======================================================================0

// Settings resolvers
// const resolvers = {hello: () => {  return "Hello World";}};

// execute query in the terminal
/* graphql({
    schema: schema,
    source: "{ cheers }",
    rootValue: resolvers,
  })
    .then((data) => console.log(data))
    .catch((err) => console.log(err)); */
