const { ApolloServer, gql } = require('apollo-server-express')
const { createConnection } = require('typeorm')
const express = require('express')
const session = require('express-session')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  })

  let retries = 3
  while (retries) {
    try {
      await createConnection()
      break
    } catch (err) {
      console.log(err)
      retries -= 1
      console.log(`retries left: ${retries}`)
      // wait 5 seconds
      await new Promise((res) => setTimeout(res, 5000))
    }
  }

  const app = express()

  app.use(
    session({
      secret: 'augustine',
      resave: false,
      saveUninitialized: false,
    })
  )

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: 'http://localhost:3001',
    },
  }) // app is from an existing express app

  // The `listen` method launches a web server.
  app.listen({ port: 3000 }, () =>
    console.log(`🚀 Server ready at http://localhost:3000/graphql`)
  )
}
startServer()
