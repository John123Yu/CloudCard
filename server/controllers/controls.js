var mongoose = require('mongoose');
var User = mongoose.model('User');
var BackgroundPic = mongoose.model('BackgroundPic');
// var Posts = mongoose.model('Posts');
var multiparty = require('multiparty');
var uuid = require('uuid');
var s3 = require('s3fs');
var fs = require('fs');
var app = require('express')();
var mailer = require('express-mailer');
var jade = require('jade');
var aws = require('aws-sdk');
var BUCKET = 'cloudcard';

aws.config.loadFromPath(require('path').join(__dirname, './aws-config.json'));

// aws.config.aws_access_key_id = ''
// aws.config.aws_secret_access_key = ''
// aws.config.region = 'us-east-1'

var s9 = new aws.S3();

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

var s3Impl = new s3('cloudcard', {
    accessKeyId: '',
    secretAccessKey: ''
});

module.exports = {
	create: function(req, res){
    var user = new User(req.body);
    if(user.email) {
      user.email = user.email.toLowerCase();
      user.userName = user.userName.toLowerCase();
    }
    user.save(function(err, user) {
      if(err) {
        console.log('Error with registering new user');
        console.log(err)
        return res.json(err)
      } else {
        console.log('successfully registered a new user!');
        return res.json(user)
      }
    })
  },
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
  },
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
  getOneUser: function (req, res) {
    User.findOne({userName: req.body.id.toLowerCase()}).populate({path: 'backgroundPics'}).exec( function(err, user) {
      if(user) {
        console.log('success getting one user')
        return res.json(user)
      }
      else {
        console.log('no user yet')
        return res.json(user)
      }
    })
  },
  changeColors: function (req, res) {
    User.findOne({_id: req.body.userId},function(err, user) {
      if(user) {
        if(req.body.instagramColor) {user.instagramColor = req.body.instagramColor}
        if(req.body.linkedInColor) {user.linkedInColor = req.body.linkedInColor}
        if(req.body.facebookColor) {user.facebookColor = req.body.facebookColor}
        if(req.body.githubColor) {user.githubColor = req.body.githubColor}
        if(req.body.emailColor) {user.emailColor = req.body.emailColor}
        if(req.body.twitterColor) {user.twitterColor = req.body.twitterColor}
        if(req.body.flickrColor) {user.flickrColor = req.body.flickrColor}
        if(req.body.personalSiteColor) {user.personalSiteColor = req.body.personalSiteColor}
        if(req.body.phoneColor) {user.phoneColor = req.body.phoneColor}
        if(req.body.addressColor) {user.addressColor = req.body.addressColor}
        user.save();
        console.log('success editing colors')
        return res.json(user)
      }
      else {
        console.log('no user yet')
        return res.json(user)
      }
    })
  },
  selectIcons: function (req, res) {
    User.update({_id: req.body.userId}, { icon1: req.body.icon1, icon2: req.body.icon2, icon3: req.body.icon3, icon4: req.body.icon4, icon5: req.body.icon5, icon6: req.body.icon6, icon7: req.body.icon7, icon8: req.body.icon8, icon9: req.body.icon9, icon10: req.body.icon10 }, function(err, user) {
      if(user) {
        console.log(user)
        console.log('success editing icons')
        return res.json(user)
      }
      else {
        console.log('no user yet')
        return res.json(user)
      }
    })
  },
  updateInfo: function (req, res) {
    console.log(req.body)
    User.findOne({_id: req.body._id}).exec( function(err, user) {
      if(user) {
        user.street = req.body.street;
        user.city = req.body.city;
        user.state = req.body.state;
        user.zipcode = req.body.zipcode;
        user.latitude = req.body.lat;
        user.longitude = req.body.lon;
        user.address = "addressIcon";
        user.save();
        console.log('success updating user info')
        return res.json(user)
      }
      else {
        console.log('no user yet')
        return res.json(user)
      }
    })
  },
  updateDefaultPic: function (req, res) {
    User.update({_id: req.body._id}, {defaultBackgroundPic: req.body.backgroundPicDefault }, function(err, user) {
      if(user) {
        console.log(user)
        console.log('success updating default background')
        return res.json(user)
      }
      else {
        console.log('no user yet')
        return res.json(user)
      }
    })
  },
  // DELETE FROM USERS PICTURE ARRAY
  uploadBackgroundPic: function(req, res) {
    User.findOne({_id :req.body.id}).populate({path: 'backgroundPics', sort: 'created_at'}).exec( function(err, user) {
      if(err) {
        console.log(err)
      } else {
        if(req.files.file) {
          console.log('got user for photo upload')
          var backgroundPic = new BackgroundPic();
          backgroundPic._user = user._id
          if(req.files.file.name) {
            backgroundPic.name = req.files.file.name
          } else {
            backgroudPic.name = req.files.file.originalFilename
          }
          var file = req.files.file;
          var stream = fs.createReadStream(file.path);
          var extension = file.path.substring(file.path.lastIndexOf('.'));
          var temp = uuid.v4()
          var destPath = temp + extension;
          var base = "https://s3.amazonaws.com//";
          backgroundPic.url = ('https://s3.amazonaws.com//' + destPath)
          backgroundPic.destPath = destPath
          backgroundPic.save()
          user.backgroundPics.push(backgroundPic)
          user.defaultBackgroundPic = 'https://s3.amazonaws.com//' + destPath
          user.save();  
          

          // user.save()
          // console.log(user.backgroundPics)
          // console.log(user.backgroundPics.length)
          // console.log(user.backgroundPics[0])
          // console.log(user.backgroundPics[0].destPath)
          if(user.backgroundPics.length >= 6) {
            var params = {
              Bucket: 'cloudcard', 
              Delete: { 
                Objects: [ 
                  {
                    Key: user.backgroundPics[0].destPath 
                  }
                ],
              },
            };
            BackgroundPic.remove({_id: user.backgroundPics[0]._id}).exec(function(err, context) {
              if(context) {
                console.log(context)
              }
            })
            s9.deleteObjects(params, function(err, data) {
              if (err) {
                console.log(err, err.stack);
              } else {
                console.log(data); 
              }         
            });  
          }


          return s3Impl.writeFile(destPath, stream, {ContentType: file.type}).then(function(one){
              fs.unlink(file.path);
              res.send(base + destPath); 
          });

        }
      }
    })
  },
  shuffle: function (req, res) {
    var shuffle = []
    User.findOne({_id: req.body._id}).exec( function(err, user) {
      if(user) {
        console.log(user)
        console.log('success getting one user')
        for(var i = 0; i <= 10; i++) {
          if(eval("user.icon" + i)) {
            shuffle.push(eval("user.icon" + i))
          }
        }
        for(var i = 0; i < 20; i++) {
          var rand = Math.floor(Math.random() * shuffle.length);
          var rand2 = Math.floor(Math.random() * shuffle.length);
          var temp = shuffle[rand];
          shuffle[rand] = shuffle[rand2];
          shuffle[rand2] = temp;
        }
        for(var i = 1; i <= 10; i++) {
          eval("user.icon" + i + "= shuffle[i-1]")
          // console.log(eval("user.icon" + i + "= shuffle[i-1]"))
        }

        user.save();
        return res.json(user)
      }
      else {
        console.log('no user yet')
        return res.json(user)
      }
    })
  },
  // removeFromBucket: function (req, res) {
  //   User.findOne({_id : req.body.id}).populate({path: 'backgroundPics'}).exec( function(err, user) {
  //     if(user) {
  //       console.log('success getting one user')
  //       return res.json(user)
  //     }
  //     else {
  //       console.log('no user yet')
  //       return res.json(user)
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