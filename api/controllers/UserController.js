/**
 * UserController.js 
 * 
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *                 
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').actions.user({
  //TODO: write test case
  validateUsername: function(req, res) {
    var params = req.params.all();
    User.findOne({name: params.username}).exec(function(err, user){
      if(err) {
        waterlock.logger.debug(err);
        res.serverError();
      }
      if(!user) {

        return res.ok({valid: true});
      }
      else{
        sails.log.error('Name is in use!');
        return res.ok({valid: false});
      }
    });
  },
  //TODO: write test case
  //TODO: write it up
  validateEmail: function(req, res) {
    var params = req.params.all();
    User.findOne({name: params.email}).exec(function(err, user){
      if(err) {
        waterlock.logger.debug(err);
        res.serverError();
      }
      if(!user) {

        return res.ok({valid: true});
      }
      else{
        sails.log.error('Name is in use!');
        return res.ok({valid: false});
      }
    });
  },
  // route to create user, user auth and associate them
  create: function(req, res) {
    //console.log("customsied!!!!!!");
    var params = req.params.all(),
        auth = {
          email: params.email,
          password: params.password
        },
        userObj = {
          username:params.username,
          firstname:params.firstname,
          lastname:params.lastname,
          email:params.email
        };

    User.create(userObj)
        .exec(function (err, user){
          if (err){
            waterlock.logger.debug(err);
            req.session.flash = {
              err: err
            };

            return res.send({success:false, message:err});
          }
          req.session.user = user;
          req.session.authenticated = true;
          waterlock.engine.attachAuthToUser(auth, user, function (err) {
            if (err) {
              waterlock.logger.debug(err);
              return res.send({success:false, message:err});
            }
            //user.online = true;
            user.save(function (err, user) {
              if (err) {
                sailsLog('err', err);
                return next(err);
              }

              user.action = "signed-up and logged-in.";

              User.publishCreate(user);

              waterlock.logger.debug('user login success');
              return res.send({success:true});
            });
          });
        }
    );
  },
  show:function(req,res){ //won't see unless the owner

  },
  login_fail:function(req,res){
    return res.send({success:false});
  },
  logout_fail:function(req,res){
    return res.send({success:false});
  }
});