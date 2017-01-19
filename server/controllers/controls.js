var mongoose = require('mongoose');
var User = mongoose.model('User');
// var Posts = mongoose.model('Posts');
var multiparty = require('multiparty');
var uuid = require('uuid');
var s3 = require('s3fs');
var fs = require('fs');
var app = require('express')();
var mailer = require('express-mailer');
var jade = require('jade');

// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');

// mailer.extend(app, {
//   from: 'no-reply@example.com',
//   host: 'smtp.gmail.com', // hostname
//   secureConnection: true, // use SSL
//   port: 465, // port for secure SMTP
//   transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
//   auth: {
//     user: '',
//     pass: ''
//   }
// });

// var s3Impl = new s3('', {
//     accessKeyId: '',
//     secretAccessKey: ''
// });

module.exports = {
	create: function(req, res){
      var passcode = ("a" + Math.floor(Math.random() * 10))+ (Math.floor(Math.random() * 10)) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
      var user = new User(req.body);
      console.log(req.body.birthday)
      if(user.email) {
        user.email = user.email.toLowerCase();
      }
      if(!user.confirmPasscode){
        user.confirm = "false";
        user.confirmPasscode = passcode
      }
      user.save(function(err, context) {
	    if(err) {
	      console.log('Error with registering new user');
        console.log(err)
        return res.json(err)
	    } else {
	      console.log('successfully registered a new user!');
        app.mailer.send( 'confirmEmail', {
            to: req.body.email, 
            subject: 'Friend Events Confirm Email',
            text: passcode
          }, function (err) {
            if (err) {
              console.log(err);
              return res.json({error: 'There was an error sending the confirm email'});
            } else {
              console.log("confirm email sent") 
              return res.json(user)
            }
          })
	    }
  	})
  },
  // confirmEmail: function(req, res) {
  //   User.findOne({confirmPasscode: req.body.passcode}, function(err, user) { 
  //     if(user == null) {
  //       console.log('not a stored passcode')
  //       return res.json({null: "Invalid Passcode"})
  //     } else {
  //       console.log('confirm Passcode went through!')
  //       user.confirm = "true";
  //       user.save();
  //       return res.json(user)
  //     }
  //   })
  // },
  login: function(req, res) {
    User.find({ email: req.body.emailLogin.toLowerCase()}, function(err, context) {
      if(context[0] == null){
        console.log("no email found")
        return res.json({noEmail: "No such email in database"})
      }
      if(context[0].confirm == "false") {
        console.log('user not confirmed yet!')
        return res.json({notConfirmed: "Not confirmed"})
      }
      if(context[0]) {
        // if(context[0].email == "friendevents1@gmail.com") {
        //   context[0].addAdmin();
        // }
        console.log('success finding email')
        if(context[0].validPassword(req.body.passwordLogin)) {
          return res.json({_id:context[0]._id})
        } else {
          console.log("wrong password")
          return res.json({IncorrectPassword: 'Incorrect Password'})
        }
      }
    })
  }
  // editUser: function(req, res){
  //   User.update({_id: req.params.id}, {truth1: req.body.truth1, truth2: req.body.truth2, lie: req.body.lie, work: req.body.work, school: req.body.school, gender: req.body.gender}, function(err, user) {
  //       if(err) {
  //         console.log('something went wrong updating user');
  //       } else {
  //         console.log('successfully edited a user!');
  //         return res.json(user)
  //       }
  //   })
  // },
  // getOneUser: function (req, res) {
  //   User.findOne({_id: req.params.id}, null, {sort: 'created_at'}).exec( function(err, context) {
  //     if(context) {
  //       console.log('success getting one user')
  //       return res.json(context)
  //     }
  //     else {
  //       console.log('no user yet')
  //       return res.json(context)
  //     }
  //   })
  // },
  // removeUser: function(req, res){
  //   User.remove({_id: req.params.id}, function(err, user) {
  //       if(err) {
  //         console.log(err)
  //         console.log('something went wrong removing user');
  //       } else {
  //         console.log('successfully removed an user!');
  //         return res.json(user)
  //       }
  //   })
  // },
  // uploadPic: function(req, res) {
  //   User.findOne({_id :req.body.id}, function(err, context) {
  //     if(err) {
  //       console.log(err)
  //     } else {
  //       console.log('got user for photo upload')
  //       var file = req.files.file;
  //       var stream = fs.createReadStream(file.path);
  //       var extension = file.path.substring(file.path.lastIndexOf('.'));
  //       var temp = uuid.v4()
  //       var destPath = '/eventImage/' +  temp + extension;
  //       var base = "https://s3.amazonaws.com/friendevents/";
  //       context.userPicUrl = ('https://s3.amazonaws.com/friendevents/eventImage/' + temp + extension)
  //       context.save()
  //       return s3Impl.writeFile(destPath, stream, {ContentType: file.type}).then(function(one){
  //           fs.unlink(file.path);
  //           res.send(base + destPath); 
  //       });
  //     }
  //   })
  // },
  // privateChat: function(req, res){
  //   User.findOne({_id: req.body.initId}, function(err, user1) { 
  //     User.findOne({_id: req.body.recId}, function(err, user2) { 
  //       var privateChat = new Private();
  //       privateChat._user = user1._id;
  //       privateChat._friend = user2._id;
  //       privateChat.save(function(err){
  //           if(err) {
  //             console.log(err)
  //             console.log("privateChat not saved")
  //           } else {
  //             console.log("privateChat saved")
  //             user1.privateChats.push(privateChat);
  //             user2.privateChats.push(privateChat);
  //             user1.save(function(err){
  //                  if(err) {
  //                       console.log('Error with saving user1 with privateChat');
  //                  } else {
  //                       console.log("user1 Saved with privateChat")
  //                  }
  //             })
  //             user2.save(function(err){
  //                  if(err) {
  //                       console.log('Error with saving user2 with privateChat');
  //                  } else {
  //                       console.log("user2 saved with privateChat")
  //                      return res.json(privateChat)
  //                  }
  //             })
  //         }
  //     })
    
  //   })
  // })
  // },
  // getPrivatePosts: function (req, res) {
  //   Private.findOne({_id: req.body.id}, null, {sort: 'created_at'}).populate({path: 'posts'}).exec( function(err, context) {
  //     if(context == null) {
  //       return res.json({nothing: 'nothingdata'})
  //     }
  //     if(context.block == "true"){
  //       console.log('this chat is blocked')
  //       return res.json({block: "This chat has been blocked"})
  //     }
  //     if(context) {
  //       context.pushId(req.body.userId)
  //       console.log('success getting private chat')
  //       return res.json(context)
  //     }
  //     else {
  //       console.log('no private chat yet')
  //       return res.json(context)
  //     }
  //   })
  // },
  // privatePost: function (req, res) {
  //   Private.findOne({_id : req.body._id}, function(err, privateChat) {
  //     if(privateChat == null) {
  //       return res.json({noChat: 'noChat'})
  //     }
  //     User.findOne({_id : req.body.userId}, function(err, user) { 
  //     var post = new Posts({post: req.body.post})
  //     post.userFullName = user.firstName + " " + user.lastName
  //     post._private = privateChat._id;
  //     post._user = user._id;
  //     post.save(function(err) {
  //       if(err) {
  //         console.log(err)
  //         console.log('post not saved after private chat')
  //       } else {
  //         console.log('post saved after private chat')
  //         privateChat.posts.push(post)
  //         privateChat.save(function(err) {
  //           if(err) {
  //             console.log(err)
  //             console.log('Error with saving privatechat after saving post')
  //           } else {
  //             console.log('privatechat saved after saving post')
  //             privateChat.popId(user._id)
  //             return res.json({he:"hi"})
  //           }
  //         })
  //       }
  //     })
  //   })
  //   })
  // },
  // blockUser: function (req, res) {
  //   Private.update({_id: req.body.id}, {block: "true"}).exec( function(err, context) {
  //     if(context) {
  //       console.log('success blocking private chat')
  //       return res.json(context)
  //     }
  //     else {
  //       console.log('no block of private chat')
  //       return res.json(context)
  //     }
  //   })
  // },
  // deleteChat: function (req, res) {
  //   Private.remove({_id: req.body.id}).exec( function(err, context) {
  //     if(context) {
  //       console.log('success deleting private chat')
  //       return res.json(context)
  //     }
  //     else {
  //       console.log('unsuccessful delete of private chat')
  //       return res.json(context)
  //     }
  //   })
  // },
  // // do i need to populate user and friend?
  // getChatLists: function (req, res) {
  //   Private.find({_user : req.body.id}, null, {sort: 'created_at'}).populate('_user').populate('_friend').exec( function(err, context) {
  //     if(context) {
  //       console.log('success getting user"s chatlist')
  //       return res.json(context)
  //     }
  //     else {
  //       console.log('no user"s events yet')
  //       return res.json(context)
  //     }
  //   })
  // },
  // getChatLists2: function (req, res) {
  //   Private.find({_friend : req.body.id}, null, {sort: 'created_at'}).populate('_user').populate('_friend').exec( function(err, context) {
  //     if(context) {
  //       console.log('success getting user"s chatlist2')
  //       return res.json(context)
  //     }
  //     else {
  //       console.log('no user"s events yet')
  //       return res.json(context)
  //     }
  //   })
  // },
  // privateExist: function (req, res) {
  //   Private.findOne({_friend : req.body.initId, _user: req.body.recId}).exec( function(err, context1) {
  //     if(context1) {
  //       console.log('chat already exists! first check')
  //       return res.json(context1)
  //       }
  //     else {
  //       console.log('first exist check was ok')
  //        Private.findOne({_friend : req.body.recId, _user: req.body.initId}).exec( function(err, context) {
  //         if(context) {
  //           console.log('chat already exists! second check')
  //           return res.json(context)
  //         }
  //         else {
  //           console.log('second exist check was ok')
  //           return res.json({hi: "hi"})
  //         }p
  //       })
  //     }
  //   })
  // },
  // getAllUsers: function(req, res) {
  //   User.find({}, function(err, users) { 
  //     if(err) {
  //       console.log(err)
  //       console.log('something went wrong find all users')
  //     } else {
  //       console.log('found all users')
  //       return res.json(users)
  //     }
  //   })
  // },
  // resetPassword: function(req, res) {
  //   var passcode = ("a" + Math.floor(Math.random() * 10))+ (Math.floor(Math.random() * 10)) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
  //   console.log(passcode)
  //   User.findOne({email: req.body.email.toLowerCase()}, function(err, user) { 
  //     if(user == null) {
  //       console.log('not a stored email')
  //       return res.json(err)
  //     } else {
  //       user.passcode = passcode;
  //       user.save( function(err) {
  //         if(err) {
  //           console.log("user not saved with passcode")
  //         } else {
  //         app.mailer.send( 'email', {
  //           to: req.body.email, 
  //           subject: 'Friend Events Password Reset',
  //           text: passcode
  //         }, function (err) {
  //           if (err) {
  //             console.log(err);
  //             return res.json({error: 'There was an error sending the email'});
  //           } else {
  //             console.log("reset email sent") 
  //             return res.json({passcode: 'passcode sent to email'})
  //           }
  //         })
  //         }
  //       });
  //     }
  //   })
  // },
  // finalReset: function(req, res) {
  //   var passcode = ("a" + Math.floor(Math.random() * 10))+ (Math.floor(Math.random() * 10)) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
  //   User.findOne({passcode: req.body.passcode}, function(err, user) { 
  //     if(user == null) {
  //       console.log('incorrect passcode')
  //       return res.json({null: "Invalid passcode"})
  //     } else {
  //       if(req.body.password != req.body.confirmPassword) {
  //         console.log('Password does not match confirm password')
  //         return res.json({notmatch: 'Password does not match confirm password'})
  //       } else {
  //         console.log('passcode matched')
  //         user.password = req.body.password;
  //         user.save(function(err, context) {
  //           if(err) {
  //             console.log('Error with saving new password');
  //             console.log(err)
  //             return res.json(err)
  //           } else {
  //             console.log('successfully saved new user with new password!');
  //             user.passcode = passcode;
  //             user.save(function(err, context1) {
  //             return res.json(context1)
  //             })
  //           }
  //       })
  //     }
  //   }
  //   })
  // },
};