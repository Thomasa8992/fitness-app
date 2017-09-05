var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var firebase = require('firebase');
var clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.route('/api/coach')
.get(function(res, res, next) {
    console.log('in fb route');

    var config = {
        apiKey: 'AIzaSyC0aUJENU5pDKGN1Sf9wIZeID2449QJS-c',
        authDomain: 'innovate-fitness-app.firebaseapp.com',
        databaseURL: 'https://innovate-fitness-app.firebaseio.com/',
        storageBucket: 'gs://innovate-fitness-app.appspot.com'
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    
    firebase.database().ref('/fitness-app').once('value')
    .then((success) => {
        res.send(success.val());
    });
});

app.route('/api/user')
.get(function(res, res, next) {
    console.log('in fb route');

    var config = {
        apiKey: 'AIzaSyC0aUJENU5pDKGN1Sf9wIZeID2449QJS-c',
        authDomain: 'innovate-fitness-app.firebaseapp.com',
        databaseURL: 'https://innovate-fitness-app.firebaseio.com/',
        storageBucket: 'gs://innovate-fitness-app.appspot.com'
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    
    firebase.database().ref('/fitness-user').once('value')
    .then((success) => {
        res.send(success.val());
    });
});

app.route('/api/coach/:id')
    .get(function(req, res, next) {
    console.log('in fb route');

    var config = {
        apiKey: 'AIzaSyC0aUJENU5pDKGN1Sf9wIZeID2449QJS-c',
        authDomain: 'innovate-fitness-app.firebaseapp.com',
        databaseURL: 'https://innovate-fitness-app.firebaseio.com/',
        storageBucket: 'gs://innovate-fitness-app.appspot.com'
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
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

    var config = {
        apiKey: 'AIzaSyC0aUJENU5pDKGN1Sf9wIZeID2449QJS-c',
        authDomain: 'innovate-fitness-app.firebaseapp.com',
        databaseURL: 'https://innovate-fitness-app.firebaseio.com/',
        storageBucket: 'gs://innovate-fitness-app.appspot.com'
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
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