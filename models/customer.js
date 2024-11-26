const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
  id: String,
  name: String,
  age: Number
})

const Todo = mongoose.model('Todo', customerSchema)

module.exports = Todo
