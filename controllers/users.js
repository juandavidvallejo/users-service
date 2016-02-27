//File: controllers/users.js
var mongoose = require('mongoose');  
var Users  = mongoose.model('Users');

//GET - Return all users in the DB
exports.findAllUserss = function(req, res) {  
    Users.find(function(err, users) {
    if(err) res.send(500, err.message);

    console.log('GET /users')
        res.status(200).jsonp(users);
    });
};

//GET - Return a user with specified ID
exports.findByUserId = function (req, res) {
    Users.findOne({
        user: req.params.user
    }, function (error, response) {
        if (error || !response) {
            res.status(404).send({
                status: 401,
                message: 'not found'
            });
        } else {
            res.send({
                success: true,
                user: response
            });
        }
    });
}

//POST - Insert a new user in the DB
exports.addUsers = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var user = new Users({
        user:           req.body.user,
        first_name:     req.body.first_name,
        last_name:      req.body.last_name,
        address:        req.body.address,
        city:           req.body.city,
        neighborhood:   req.body.neighborhood,
        birthdate:      req.body.birthdate
    });

    user.save(function(err, user) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(user);
    });
};

//PUT - Update a register already exists
exports.updateUsers = function(req, res) {  
    Users.findById(req.params.id, function(err, user) {
        user.user   = req.body.petId;
        user.first_name   = req.body.first_name;
        user.last_name = req.body.last_name;
        user.address   = req.body.address;
        user.city = req.body.city;
        user.neighborhood = req.body.neighborhood;
        user.birthdate = req.body.birthdate;

        user.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(user);
        });
    });
};

//DELETE - Delete a user with specified ID
exports.deleteUsers = function(req, res) {  
    Users.findById(req.params.id, function(err, user) {
        user.remove(function(err) {
            if(err) return res.send(500, err.message);
      res.status(200);
        })
    });
};