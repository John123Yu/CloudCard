var mongoose = require('mongoose');
var user = require('../controllers/controls.js');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// var multiparty = require('multiparty');

// { uploadDir: './imagesPath' }

module.exports = function(app) {

app.post('/user',function(req, res){
  user.create(req, res)
});

app.post('/login', function(req, res) {
  user.login(req, res)
});

// app.put('/editUser/:id',function(req, res){
//   user.editUser(req,res)
// });

app.post('/getOneUser', function(req, res) {
  user.getOneUser(req, res)
})

app.post('/changeColors', function(req, res) {
  user.changeColors(req, res)
})

app.post('/updateDefaultPic', function(req, res) {
  user.updateDefaultPic(req, res)
})

app.post('/uploadBackgroundPic/', multipartMiddleware, function(req, res) {
  user.uploadBackgroundPic(req, res)
})

// app.delete('/removeUser/:id',function(req, res){
//   user.removeUser(req,res)
// });

// app.post('/uploadPic/', multipartMiddleware, function(req, res) {
//   user.uploadPic(req, res)
// })

// app.post('/privateChat/', function(req, res) {
//   user.privateChat(req, res)
// })

// app.post('/privateExist/', function(req, res) {
//   user.privateExist(req, res)
// })

// app.post('/getPrivatePosts/', function(req, res) {
//   user.getPrivatePosts(req, res)
// })

// app.post('/privatePost/', function(req, res) {
//   user.privatePost(req, res)
// })

// app.post('/blockUser/', function(req, res) {
//   user.blockUser(req, res)
// })

// app.post('/deleteChat/', function(req, res) {
//   user.deleteChat(req, res)
// })

// app.post('/getChatLists/', function(req, res) {
//   user.getChatLists(req, res)
// })

// app.post('/getChatLists2/', function(req, res) {
//   user.getChatLists2(req, res)
// })

// app.get('/getAllUsers', function(req, res) {
//   user.getAllUsers(req, res)
// })

// app.post('/resetPassword', function(req, res) {
//   user.resetPassword(req, res)
// })

// app.post('/finalReset', function(req, res) {
//   user.finalReset(req, res)
// })

// app.post('/confirmEmail/', function(req, res) {
//   user.confirmEmail(req, res)
// })

}