const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
const {ObjectId} = require('mongodb');
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'contacts';


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',async (request, response)=>{
    const contact = await db.collection('contacts').find().toArray()
    response.render('index.ejs', { people: contact})
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

app.get('/editContact/:_id', async (req, res) => {
    const details = await db.collection('contacts').findOne({ _id: ObjectId(req.params._id) })
    res.render('edit.ejs', { person: details })
    console.log(details);
})

app.post('/addContact', (request, response) => {
    const body = request.body
    db.collection('contacts').insertOne({name: body.name, telNum: body.telNum, email: body.email})
    .then(result => {
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/editedContact', (request, response) => {
    const body = request.body
    db.collection('contacts').updateOne({_id: ObjectId(body.id)},{
        $set: {
            name: body.name,
            telNum: body.telNum,
            email: body.email
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Edited')
        response.json('Edited')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteContact', (request, response) => {
    db.collection('contacts').deleteOne({name: request.body.itemFromJS})
    .then(result => {
        console.log('Contact Deleted')
        response.json('Contact Deleted')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})