const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
const mongoose = require('mongoose')

const app = express()
const PORT = 5000
mongoose.connect(
	'mongodb+srv://mongo:mongo1412@cluster0.fbwigyf.mongodb.net/Mongo?retryWrites=true&w=majority',
)

app.use(cors())
app.use(
	'/graphql',
	graphqlHTTP({
		graphiql: true,
		schema,
	}),
)

const dbConnection = mongoose.connection
dbConnection.on('error', (err) => console.log(`Connection error: ${err}`))
dbConnection.once('open', () => console.log('Connected to DB!'))

app.listen(PORT, (err) => {
	err ? console.log(err) : console.log('Server Started')
})
