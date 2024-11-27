require('dotenv').config()
const prompt = require('prompt-sync')()
console.log(`Welcome to the CRM!`)
console.log(`What would you like to do?
`)
console.log(
  `1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. quit`
)
const userChoice = prompt('what is your choice?')

const mongoose = require('mongoose')
const Todo = require('./models/customer')
const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  //console.log('connected to DB')
  await runQueries()
  await mongoose.disconnect()
  //console.log('dis DB')
  process.exit()
}
const checkInput = async () => {
  if (userChoice === '3') {
    console.log('Below is a list of customers:')
    findTodos()
    const idInput = prompt(
      'Copy and paste the id of the customer you would like to update here:'
    )
    const newName = prompt('What is the customers new name?')
    const newAge = prompt('What is the customers new age?')
    const updatedTodo = await Todo.findByIdAndUpdate(
      idInput,
      { name: newName },
      { age: newAge }
    )
  } else if (userChoice === '2') {
    //findTodos()
    const todos = await Todo.find({})
    console.log('All customers:', todos)
  } else if (userChoice === '5') {
    mongoose.connection.close()
  } else if (userChoice === '1') {
    // createTodo()
    const todoData = {
      name: 'Zainab',
      age: 21
    }
    const todo = await Todo.create(todoData)
    console.log('new todo ', todo)
  } else if (userChoice === '4') {
    const idToRemove = prompt('Enter the customer id you want to remove: ')
    const removedTodo = await Todo.findByIdAndDelete(idToRemove)
  }
}
const runQueries = async () => {
  await checkInput()
}

connect()
