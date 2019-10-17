const mongoose = require('mongoose')
// eslint-disable-next-line no-undef
console.log(process.env.MONGODB_URI)
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false)

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})
const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3
	},
	number: {
		type: String,
		unique: true,
		minlength: 8
	},
	date: Date,
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)