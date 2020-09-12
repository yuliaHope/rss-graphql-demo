/**
 * This module creates Apollo-Server using resolvers, dataSources and schemas
 * collected across different domains in the project.
 */
const { ApolloServer, gql } = require('apollo-server-express');

const playgroundConfig = {
  settings: {
    'request.credentials': 'same-origin',
  },
};

// GraphQL schema
const schema = gql(`
    type Mutation {
        removeCourse(id: Int!): [Course]
    },

    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },

    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

const coursesData = [
  {
    id: 1,
    title: 'The Complete Node.js Developer Course',
    author: 'Andrew Mead, Rob Percival',
    description:
      'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs/',
  },
  {
    id: 2,
    title: 'Node.js, Express & MongoDB Dev to Deployment',
    author: 'Brad Traversy',
    description:
      'Learn by example building & deploying real-world Node.js applications from absolute scratch',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/',
  },
  {
    id: 3,
    title: 'JS: Understanding The Weird Parts',
    author: 'Anthony Alicea',
    description:
      'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
    topic: 'JavaScript',
    url: 'https://codingthesmartway.com/courses/understand-javascript/',
  },
];

// reslovers
const getCourse = function (parent, args) {
  const id = args.id;
  return coursesData.filter((course) => {
    return course.id == id;
  })[0];
};

const getCourses = function (parent, args) {
  if (args.topic) {
    const topic = args.topic;
    return coursesData.filter((course) => course.topic === topic);
  } else {
    return coursesData;
  }
};

const removeCourse = function (parent, args) {
  if (args.id) {
    const id = args.id;
    const filteredData = coursesData.filter((course) => course.id !== id);
    return filteredData;
  } else {
    return coursesData;
  }
};

const resolvers = {
  Query: {
    course: getCourse,
    courses: getCourses,
  },
  Mutation: {
    removeCourse: removeCourse,
  },
};

module.exports = {
  createGraphQLServer: (options = {}) =>
    new ApolloServer({
      typeDefs: schema,
      resolvers,
      playground: playgroundConfig,
      ...options,
    }),
};
