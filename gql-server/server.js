const express = require('express');
const cors = require('cors');
const { createGraphQLServer } = require('./gql');

const graphQLServer = createGraphQLServer();

// Create an express server and a GraphQL endpoint
const app = express();

app.use(cors());

graphQLServer.applyMiddleware({
  app,
  path: '/graphql',
  cors: false,
});

app.listen(4000, () =>
  console.log('Express GraphQL Server Now Running On localhost:4000/graphql')
);
