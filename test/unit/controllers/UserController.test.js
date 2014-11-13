/**
 * Created by Yunjia Li on 13/11/2014.
 */


var request = require('supertest');

describe('UsersController', function() {

    describe('GET /rtest', function(){
        it('should get open access', function (done) {
            request(sails.hooks.http.app)
                .get('/rtest/open')
                .expect(200,done);
        });
    });


    describe('POST /user/create', function() {

        it('should register normal user successfully', function (done) {
            console.log("test2");

            request(sails.hooks.http.app)
                .post('/user/create')
                .send({username:'test4',password:'hellowaterlock111',firstname:'test',lastname:'one',email:'test6@synote.com'})
                .expect(200)
                .end(function(err,res){
                    if (err) return done(err);
                    done();
                });
        });


        it('should register admin user successfully', function (done) {
            request(sails.hooks.http.app)
                .post('/user/create')
                .send({username: 'admin', password: 'hellowaterlock',firstname:'admin', lastname:'one',email:'admin@synote.com', role:'admin'})
                .expect(200,done);
        });
    });
});