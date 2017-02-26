var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var path = require('path')

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstName : {
  	type: String,
  	required: [true, 'First name is required'],
  	minlength: [2, 'First name must be at least 2 characters'],
  	trim: true
  },
  lastName : {
  	type: String,
  	required: [true, 'Last name is required'],
  	minlength: [2, 'Last name must be at least 2 characters'],
  	trim: true
  },
  userName : {
    type: String,
    required: [true, 'Username is required'],
    minlength: [2, 'Username must be at least 2 characters'],
    trim: true,
    unique: true
  },
  description : {
    type: String,
    minlength: [10],
    maxlength: [180]
  },
  email : {
  	type: String,
  	validate: {
  		validator: function(email) {
  		var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  		return emailRegex.test(email)
  		},
  		message: 'Not a valid email'
  	},
	required: [true, "Email is required"],
	unique: true
  },
  defaultBackgroundPic: String,
  age: Number,
  emailColor: String,
  twitter: String,
  twitterColor: String,
  linkedIn: String,
  linkedInColor: String,
  instagram: String,
  instagramColor: String,
  facebook: String,
  facebookColor: String,
  github: String,
  githubColor: String,
  personalSite: String,
  personalSiteColor: String,
  flickr: String,
  flickrColor: String,
  phone: String,
  phoneColor: String,
  street: String,
  city: String,
  state:String,
  zipcode:String,
  address: String,
  addressColor: String,
  latitude: Number,
  longitude: Number,
  icon1: String,
  icon2: String,
  icon3: String,
  icon4: String,
  icon5: String,
  icon6: String,
  icon7: String,
  icon8: String,
  icon9: String,
  icon10: String,
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: function( value ) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
      },
      message: "Password failed validation, you must have at least 1 number, uppercase and special character"
    }
  },
  // birthday: {
  // 	type: Date,
  // 	required: [true, 'Birthday is required']
  // },
  created_at: { type : Date, default: Date.now },
  occupation: {
    type: String
  },
  education: {
    type: String
  },
  // Photo: { data: },
  posts: [{type: Schema.Types.ObjectId, ref: 'Posts'}],
  admin: String,
  passcode:{type: String, default: "9382730"},
  confirm: String,
  confirmPasscode: String,
  backgroundPics:  [{type: Schema.Types.ObjectId, ref: 'BackgroundPic'}]
 });
userSchema.methods.generateHash = function(password) {
	if(password.length > 32) {
		return password
	} else {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
	}
}
userSchema.pre('save', function(done) {
	this.password = this.generateHash(this.password);
	done();
})
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

mongoose.model('User', userSchema);

var backgroundPicSchema = new mongoose.Schema({
  name: String,
  destPath: String,
  url: String,
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  created_at: { type : Date, default: Date.now },
});
mongoose.model('BackgroundPic', backgroundPicSchema);