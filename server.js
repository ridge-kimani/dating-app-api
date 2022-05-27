import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'

//App Config
const app = express()
app.use(express.json())
app.use(Cors())
const port = process.env.PORT || 8001

const connection_url = 'mongodb+srv://ridge_kimani:test_password@cluster0.4pgqilg.mongodb.net/?retryWrites=true&w=majority'

const isObject = (val) => {
	return val.constructor.name === "Object"
}

const isArray = (val) => {
	return val.constructor.name === "Array"
}

mongoose.connect(connection_url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => {
	if (err) console.log(err)
	else console.log("success")
})

app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))
//Listener

app.post('/dating/cards', (req, res) => {
	const dbCard = req.body
	
	Cards.create(dbCard, (err, data) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(201).send(data)
		}
	})
})

app.get('/dating/cards', (req, res) => {
	Cards.find((err, data) => {
		if(err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(data)
		}
	})
})
app.listen(port, () => console.log(`Listening on localhost: ${port}`))
