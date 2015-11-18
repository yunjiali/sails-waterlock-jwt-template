sails-passport-token-template
=============================

A sails.js authentication template using waterlock and token. Perfect for authentication from REST API using mobile devices

Dependencies:
 * Sailsjs 0.11.0
 * waterlock 0.1.0
 * waterlock-local-auth 0.0.6

The template have the following functions via API
 * User registration
 * User login via Json web token (JWT)
 * A simple user role management
 * i18n (ab, en and zh currently) use sails.__()
 * A random test (rtest) controller, if you login, you can see it.
 * Init some new users and roles by using test
 * Add nodemon

Things need to do before start:
 * create mysql database "sails_jwt_template", and:
 ```grant all on sails_jwt_template.* to 'test'@'localhost' identified by 'test';```

 * if you want to do test, create database "sails_jwt_template_test", username: test, password: test
 ```grant all on sails_jwt_template_test.* to 'test'@'localhost' identified by 'test';```

 * install the dependencies by:
 ```npm install```
 But some of the dependencies may need sudo to install

 * you need to install sails -g and mocha -g if you want to test
 * set the mocha.opts under test folder to something bigger, or the test will fail because of timeout problem
 * run ```npm test``` for testing


TODOs:
* Add Redis for session storage in production enironment
* Add log support for winston
* email registration confirmation
* reset password
* Set up socket.io support
