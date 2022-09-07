const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlparser: true});
const port = 80;

//define mongoose schema
const contactSchema = new mongoose.Schema({
        name: String,
        email: String,
        phone: String,
        address: String,
        desc: String
      });
  
  var Contact = mongoose.model('contact', contactSchema);


//EXPRESS SPECIFIC STUFF

app.use('/static', express.static('static'))// for serving ststic fil
app.use(express.urlencoded())


//PUG SPECIFIC STUFF
app.set('view engine', 'pug')//set the template engine as pug
app.set('views', path.join(__dirname, 'views'))// Set the views directory

//ENDPOINTS
app.get('/', (req,res)=>{
    const params = {}
    res.status(200).render('home.pug', params);

})

app.get('/contact', (req,res)=>{
    const params = {}
    res.status(200).render('contact.pug' ,params);
    
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})

})
//START THE SERVER
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`)
});
