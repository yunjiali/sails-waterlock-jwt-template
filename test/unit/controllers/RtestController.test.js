/**
 * Created by user on 13/11/2014.
 */


var request = require('supertest-as-promised');
var async = require('async');


describe('RtestController', function() {

    describe('GET /rtest/open', function () {
        it('should get open access', function (done) {
            request(sails.hooks.http.app)
                .get('/rtest/open')
                .expect(200,done);
        });
    });

    describe('GET /rtest/restricted', function () {
        it('should get restricted info without login', function (done) {
            request(sails.hooks.http.app)
                .get('/rtest/restricted')
                .expect(403,done);
        });
    });

    describe('GET /rtest/admin ', function () {
        beforeEach(function(done){
            request(sails.hooks.http.app)
                .post('/auth/logout')
                .expect(200, done);
        });

        it('should not get access if not logged in', function (done) {
            request(sails.hooks.http.app)
                .get('/rtest/admin')
                .expect(403,done)
        });

        it('should not get access as normal user', function (done) {
            var agent = request.agent(sails.hooks.http.app);
            async.waterfall([
                function(callback){
                    agent
                        .post('/auth/login')
                        .send({email: 'teststatic@synote.com', password: 'hellowaterlock'})
                        .expect(200)
                        .end(function(err, res){
                            var resObj = JSON.parse(res.text);
                            //console.log(resObj);
                            resObj.should.have.property("token");
                            callback(null, resObj.token);
                        })
                },
                function(token, callback){
                    agent
                        .get('/rtest/admin?access_token='+token)
                        .expect(403)
                        .end(function(err, res2){
                            callback();
                        });
                }
            ],function(err, results){
                done();
            });
        });

        it('should get access as admin', function (done) {
            var agent = request.agent(sails.hooks.http.app);
            async.waterfall([
                function(callback){
                    agent
                        .post('/auth/login')
                        .send({email: 'adminstatic@synote.com', password: 'hellowaterlockadmin'})
                        .expect(200)
                        .end(function(err, res){
                            var resObj = JSON.parse(res.text);
                            //console.log(resObj);
                            resObj.should.have.property("token");
                            callback(null, resObj.token);
                        })
                },
                function(token, callback){
                    agent
                        .get('/rtest/admin?access_token='+token)
                        .expect(200)
                        .end(function(err, res2){
                            callback();
                        });
                }
            ],function(err, results){
                done();
            });
        });
    });

    //
    /*describe('GET /rtest/restricted', function () {
        it('should get open access', function () {
            request(sails.hooks.http.app)
                .get('/rtest/open')
                .expect(200);
        });
    });*/
});