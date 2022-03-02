const { trips } = require('./database')

const resolvers = {
  Query: {
    trips: () => trips,
  },

  Query: {
    flights: (tripId) => {
      return trips.find((trip) => trip.id === tripId)
    },
  },
}

module.exports = { resolvers }
