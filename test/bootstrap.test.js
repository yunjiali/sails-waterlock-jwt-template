/**
 * Created by user on 13/11/2014.
 */


var Sails = require('sails');
var request = require('supertest-as-promised');
var async = require('async');


before(function(done) {
    Sails.lift({
        // configuration for testing purposes
    }, function(err, sails) {
        if (err) return done(err);
        // here you can load fixtures, etc.

        //add test user
        async.series([
            //add normal user
            function(callback){
                request(sails.hooks.http.app)
                    .post('/user/create')
                    .send({username:'teststatic',password:'hellowaterlock',firstname:'test',lastname:'static',email:'teststatic@synote.com'})
                    .expect(200)
                    .end(function(err,res){
                        callback(err);
                    })
            },
            //add admin user
            function(callback) {
                request(sails.hooks.http.app)
                    .post('/user/create')
                    .send({
                        username: 'adminstatic',
                        password: 'hellowaterlockadmin',
                        firstname: 'admin',
                        lastname: 'static',
                        email: 'adminstatic@synote.com',
                        role: 'admin'
                    })
                    .expect(200)
                    .end(function (err, res) {
                        done(err, sails);
                    })
            }

        ],function(err,results){
            done(err,sails)
        });
    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    sails.lower(done);
});