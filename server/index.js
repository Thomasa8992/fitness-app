var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var firebase = require('firebase');
var clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
    var config = {
        apiKey: 'AIzaSyC0aUJENU5pDKGN1Sf9wIZeID2449QJS-c',
        authDomain: 'innovate-fitness-app.firebaseapp.com',
        databaseURL: 'https://innovate-fitness-app.firebaseio.com/',
        storageBucket: 'gs://innovate-fitness-app.appspot.com'
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
        next();
    } else {
        next();
    }
});

app.route('/api/coach')
    .get(function(req, res, next) {
        firebase.database().ref('/fitness-app').once('value')
        .then((success) => {
            res.send(success.val());
        });
    });

app.route('/api/user')
    .get(function(req, res, next) {
        firebase.database().ref('/fitness-user').once('value')
        .then((success) => {
            res.send(success.val());
        });
    })
    .post(function(req, res, next) {
        console.log('inside post route');
        firebase.database().ref('/fitness-user/Joe Blowe/events').once('value')
            .then((function(success) {
                var events = success.val();
                var newEvent = req.body;

                events.push(newEvent);

                firebase.database().ref('/fitness-user/Joe Blowe').update({
                    events
                }, function() {
                    res.sendStatus(201);
                });
            }));
    })
    .delete(function(req, res, next) {
        firebase.database().ref('/fitness-user/Joe Blowe/events').once('value')
        .then((function(success) {
            var events = success.val(),
                deleteIndex;
            
            events.forEach(function(e, i) {
                if (e.title == req.body.title) {
                    deleteIndex = i;
                }
            });
        
            events.splice(deleteIndex,1);

            firebase.database().ref('/fitness-user/Joe Blowe').update({
                events
            }, function() {
                res.sendStatus(204);
            });
        }));
    })

app.route('/api/coach/:id')
    .get(function(req, res, next) {

    // var id = req.params.id
    firebase.database().ref('/fitness-app').once('value')
    .then((success) => {
        var values = success.val();
        var id = req.params.id;
            var response;
            values.forEach(function(value) {
                if (value.id === id) {
                    response = value;
                }    
            });
            if (response) {
                    res.send(response);
                } else {
                    res.sendStatus(404);
                }
        });
    })
app.route("/api/category/:type")
    // .get(function(req, res){
    //     fs.readFile(jsonPath, 'utf-8', function(err, fileContents) {
    //         if (err) {
    //             res.statusStatus(500);
    //         } else {
    //             var chunks = JSON.parse(fileContents);
    //             var type = req.params.type;
    //             var response = chunks.filter(function(chunk) {
    //                 if(chunk.type){
    //                     if (chunk.type.toLowerCase().trim() === type.toLowerCase().trim()) {
    //                         return chunk
    //                     }
    //                 }
    //             });
    //             if (response) {
    //                 res.send(response);
    //             } else {
    //                 res.sendStatus(404);
    //             }
    //         }
    //     });
    // })
    .get(function(req, res, next) {
    console.log('in fb route');

    // var id = req.params.id
    firebase.database().ref('/fitness-app').once('value')
    .then((success) => {
        var values = success.val();
        var type = req.params.type;
            var response = values.filter(function(value) {
                    if(value.type){
                        if (value.type.toLowerCase().trim() === type.toLowerCase().trim()) {
                            return value
                        }
                    }
                });
                if (response) {
                    res.send(response);
                } else {
                    res.sendStatus(404);
                }
            });
        });
app.listen(3000, function() {
    console.log('Listening on port 3000');
});