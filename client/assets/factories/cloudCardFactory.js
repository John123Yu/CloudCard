 myApp.factory('cloudCardFactory', ['$filter', '$http', '$location', function ( $filter, $http, $location){

    var factory = {};

    factory.createUser = function(userInfo, callback) {
      $http.post('/user', userInfo).then(function(data){
        callback(data)
      })
    }
    factory.login = function(user, callback) {
      $http.post('/login', user).then(function(data){
        console.log("login data back")
        if(data.data.noEmail || data.data.IncorrectPassword) {
          callback(data);
        }
        else {
          callback(data)
        }
      })
    }
    // factory.editUser = function(id, userInfo, callback){
    //   $http.put('/editUser/' + id, userInfo).then(function(data){
    //     console.log("success editing new user");
    //     callback(data);
    //   })
    // }
    factory.getOneUser = function(userInfo, callback) {
      $http.post('/getOneUser', userInfo).then(function(data) {
        console.log('got one user')
        callback(data);
      })
    }
    factory.changeColors = function(colors, callback) {
      $http.post('/changeColors', colors).then(function(data) {
        console.log('colors changed')
        callback(data);
      })
    }

    factory.updateDefaultPic = function(picUrl, callback) {
      $http.post('/updateDefaultPic', picUrl).then(function(data) {
        console.log('default picture saved')
        callback(data);
      })
    }
    
    // factory.removeUser = function(id, callback){
    //   $http.delete('/removeUser/' + id).then(function(data){
    //     console.log("success removing user");
    //     callback(data);
    //   })
    // }
    
    // factory.createPrivate = function(ids, callback) {
    //   $http.post('/privateChat', ids).then(function(data) {
    //     console.log('create private chat successful')
    //     callback(data)
    //   })
    // }
    // factory.privateExist = function(ids, callback) {
    //   $http.post('/privateExist', ids).then(function(data) {
    //     console.log('private chat already exists!')
    //     callback(data)
    //   })
    // }
    // factory.getPrivatePosts = function(ids, callback) {
    //   $http.post('/getPrivatePosts/', ids).then(function(data) {
    //     console.log('got private posts')
    //     callback(data);
    //   })
    // }
    // factory.privatePost = function(postData, callback) {
    //   $http.post('/privatePost', postData).then(function(data) {
    //     console.log('private post successful')
    //     callback(data)
    //   })
    // }
    // factory.blockUser = function(chatId, callback) {
    //   $http.post('/blockUser', chatId).then(function(data) {
    //     console.log('block successful')
    //     callback(data)
    //   })
    // }
    // factory.deleteChat = function(chatId, callback) {
    //   $http.post('/deleteChat', chatId).then(function(data) {
    //     console.log('delete chat successful')
    //     callback(data)
    //   })
    // }
    // factory.getChatList = function(userId, callback) {
    //   $http.post('/getChatLists', userId).then(function(data) {
    //     console.log('got Chat Lists')
    //     callback(data);
    //   })
    // }
    // factory.getChatList2 = function(userId, callback) {
    //   $http.post('/getChatLists2', userId).then(function(data) {
    //     console.log('got Chat Lists2')
    //     callback(data);
    //   })
    // }
    // factory.getAllUsers = function(callback) {
    //   $http.get('/getAllUsers/').then(function(data) {
    //     console.log('got all users')
    //     callback(data);
    //   })
    // }
    // factory.resetPassword = function(email, callback) {
    //   $http.post('/resetPassword', email).then(function(data) {
    //     console.log('email sent for password reset')
    //     callback(data)
    //   })
    // }
    // factory.finalReset = function(password, callback) {
    //   $http.post('/finalReset', password).then(function(data) {
    //     console.log('password reset')
    //     callback(data)
    //   })
    // }
    // factory.confirmEmail = function(code, callback) {
    //   $http.post('/confirmEmail', code).then(function(data) {
    //     console.log('email confirmed')
    //     callback(data)
    //   })
    // }

    return factory;
    }]);