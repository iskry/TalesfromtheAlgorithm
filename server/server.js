const apiKey = process.env.KEY;
require("dotenv").config();

// mongoDB Database connect
const mongoDB_connect = require("./config/db/connection.js");
// Apollo & GraphQL
const { typeDefs, resolvers } = require("./graphQL");
// express
const express = require("express");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const app = express();

// connect to Apollo
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
  // initialize ChatGPT after ApolloServer is ready
  initializeChatGPT();
});

// vroom_vroom-express-initialize
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// connects port
app.listen(process.env.PORT || 3001, () => {
  mongoDB_connect();
  console.log(`
    ==============================
    "Online at ${PORT}, Server is."
                __.-._
                '-._"7'
                  /'.-c
                  |  /T
                _)_/LI
    -==============================
    ===============================
    "Online at ${PORT}, Server is MEOW!!."

            /\\_/\\
            ( o o )   *team_MEOW*
           ==( I )==
             / _ \
             \/ \/
    ==============================
  `);
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});