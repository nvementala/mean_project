var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get("/contactlist", function (req, res){
    console.log('I received a get request for contact list');
    
    db.contactlist.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });

	// person1 = {
    //     name : 'Tim',
    //     email: 'tim@email.com',
    //     number: '123456789'
    // };

    // person2 = {
    //     name : 'Emily',
    //     email: 'emily@email.com',
    //     number: '123456789'
    // };

    // person3 = {
    //     name : 'John',
    //     email: 'john@email.com',
    //     number: '123456789'
    // };

    // var contactList = [person1, person2, person3];
    // res.json(contactList);
});

app.get('/contactlist/:id', function(req, res){
    console.log("Get only: " + req.params.id);
    db.contactlist.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, doc){
        res.json(doc);
    });
});
app.post('/contactlist', function(req, res){
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc){
        res.json(doc);
    });
})

app.delete('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log('At Server: '+ id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function( err, doc){
        console.log(doc);
        res.json(doc);
    });
});


app.put('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log('Updating info for ' + req.body.name);
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new: true}, function(err, doc) {
            res.json(doc);
        })
});

// app.get("/", function(req, res){
// 	res.send("Hello from World !!!")
// });

app.listen(8080);

console.log("Server running on 8080");



// var http = require('http')

// http.createServer(function (req, res){
// 	res.writeHead(200, {'Content-Type':'text/plain'})
// 	res.end("Hello World");
// }).listen(8080);
