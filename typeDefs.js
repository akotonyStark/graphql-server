const { gql } = require('apollo-server')

const typeDefs = gql`
  type Trip {
    id: Int
    name: String
    planet: String
    flights: [Flight]
  }

  type Flight {
    name: String
    departureTime: String
    longitude: String
    latitude: String
    image: String
  }

  type Query {
    trips: [Trip]
    flights: [Flight]
  }
`

module.exports = { typeDefs }
