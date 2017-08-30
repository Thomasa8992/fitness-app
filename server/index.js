var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var firebase = require('firebase');
var clientPath = path.join(__dirname, '..', 'client');
var jsonPath = path.join(__dirname, 'data.json');
app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.route('/api/coach')
//     .get(function(req, res) {
//         res.sendFile(jsonPath);
//     })

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
    // var getAll = firebase.database().ref('/fitness-app')
    // getAll.on('value',function(getInfo){
    //     res.send(getInfo.val());
    // })
    // .then((success) => {
        
    // });
});

app.route('/api/post')
    .post(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, fileContents){
            if (err) {
                res.statusStatus(500);
            } else { 
            var parsed = JSON.parse(fileContents);
            var parse = req.body
            parsed.push(parse);

            fs.writeFile(jsonPath, JSON.stringify(parsed), function(err) {
                if (err) {
                    res.send('Error writing to Json');
                }
              
                res.send('Coach Created')
            })
        }
    })
})
/*app.route('/api/delete')
    .delete(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, fileContents) {
            if (err) {
                res.statusStatus(500);
            } else {
                var parsed = JSON.parse(fileContents)
                var id = req.params.id
                var deleted = false
                var deleteIndex

                parsed.forEach(function(coach, i) {
                    if (coach.id === id) {
                        deleted = true
                        deleteIndex = i
                    }
                })
            }
        })
        if (deleted){
            parsed.splice(deleteIndex, 1);
            fs.writeFile(jsonPath, JSON.stringify(parsed), function(err) {
                if (err) {
                    res.send('Error writing to Json');
                } else {
                    res.send('Deleted');
                }
            })
        } else {
            res.send('Not Found');
        }
    })*/
app.route('/api/coach/:id')
    .get(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, fileContents) {
            if (err) {
                res.statusStatus(500);
            } else {
                var chunks = JSON.parse(fileContents);
                var id = req.params.id;
                var response;
                chunks.forEach(function(chunk) {
                    if (chunk.id === id) {
                        response = chunk;
                    }
                });
                if (response) {
                    res.send(response);
                } else {
                    res.sendStatus(404);
                }
            }
        });
    })
app.route('/api/coach/:type')
    .get(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, fileContents) {
            if (err) {
                res.statusStatus(500);
            } else {
                var chunks = JSON.parse(fileContents);
                var type = req.params.type;
                var response;
                chunks.forEach(function(chunk) {
                    if (chunk.type === type) {
                        response = chunk;
                    }
                });
                if (response) {
                    res.send(response);
                } else {
                    res.sendStatus(404);
                }
            }
        });
    })
app.route("/api/category/:type")
    .get(function(req, res){
        fs.readFile(jsonPath, 'utf-8', function(err, fileContents) {
            if (err) {
                res.statusStatus(500);
            } else {
                var chunks = JSON.parse(fileContents);
                var type = req.params.type;
                var response = chunks.filter(function(chunk) {
                    if(chunk.type){
                        if (chunk.type.toLowerCase().trim() === type.toLowerCase().trim()) {
                            return chunk
                        }
                    }
                });
                if (response) {
                    res.send(response);
                } else {
                    res.sendStatus(404);
                }
            }
        });
    })
app.listen(3000, function() {
    console.log('Listening on port 3000');
});