const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'contacts';
    
   

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        // db.createCollection("counters");
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',async (request, response)=>{
    const contact = await db.collection('contacts').find().toArray()
    // const itemsLeft = await db.collection('contacts').countDocuments({completed: false})
    // response.render('index.ejs', { contacts: todoItems, left: itemsLeft })
    response.render('index.ejs', { person: contact })
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

app.get('/editContact', async (req, res) => {
    const contact = await db.collection('contacts').find({ _id: req.body.itemFromJS })
    // const contact = await db.collection('contacts').find({ name: req.body.telNum })
    // res.render('index.ejs', { editForm: contact })
    console.log(contact);
})

app.post('/addContact', (request, response) => {
    const body = request.body
    db.collection('contacts').insertOne({name: body.name, telNum: body.telNum, email: body.email})
    .then(result => {
        console.log(request.body)
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/jh', (request, response) => {
    // db.collection('contacts').updateOne({thing: request.body.itemFromJS},{
    //     $set: {
    //         completed: true
    //       }
    // },{
    //     sort: {_id: -1},
    //     upsert: false
    // })
    // .then(result => {
    //     console.log('Marked Complete')
    //     response.json('Marked Complete')
    // })
    // .catch(error => console.error(error))
    console.log(request.body.contactEdit);

})

app.put('/markUnComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteContact', (request, response) => {
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})