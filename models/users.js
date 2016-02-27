exports = module.exports = function(app, mongoose) {

  var userSchema = new mongoose.Schema({
  	user:          { type: Number },
    first_name:    { type: String },
    last_name:     { type: String },
    address:       { type: String },
    city:          { type: String },
    neighborhood:  { type: String },
    birthdate:     { type: Date },
    email:         { type: String }
  });

  mongoose.model('Users', userSchema);

};