var config = {}

config.someConfig = {
  test: "Test"
}

config.db = {
  connection: "mongodb://localhost:27017/timekeeper",
  schemas: [
    require('../model/schemas/user')
  ]
}

module.exports = config;
