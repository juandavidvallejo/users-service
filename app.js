var express        = require("express"), 
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose       = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/users', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

// Import Models and Controllers
var models = require('./models/users')(app, mongoose);
var UsersCtrl = require('./controllers/users');

// Route
var router = express.Router();
router.get('/', function(req, res) {  
   res.send("Hello World!");
});
app.use(router);

// API routers
var users = express.Router();

users.route('/users/')
	.get(UsersCtrl.findAllUserss)
	.post(UsersCtrl.addUsers);

users.route('/users/:user')
	.get(UsersCtrl.findByUserId)
	.put(UsersCtrl.updateUsers)
	.delete(UsersCtrl.deleteUsers);

app.use('/api', users);

// Start Server
app.listen(3001, function(){
	console.log("Server runing on http://localhost:3001");
})
