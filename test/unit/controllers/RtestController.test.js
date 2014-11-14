/**
 * Created by user on 13/11/2014.
 */


var request = require('supertest-as-promised');


describe('RtestController', function() {

    describe('GET /rtest/open', function () {
        it('should get open access', function (done) {
            request(sails.hooks.http.app)
                .get('/rtest/open')
                .expect(200,done);
        });
    });

    describe('GET /rtest/open without login', function () {
        it('should get restricted info', function (done) {
            request(sails.hooks.http.app)
                .get('/rtest/restricted')
                .expect(403,done);
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