/**
 * Created by Yunjia on 15/11/2014.
 * This is 'or' policy as the last policy in a series of 'or operators'. This is a workaround as sails.js doesn't support or policy
 * It checks the session.orpolicy, if it's false, return error
 * http://stackoverflow.com/questions/18876057/sails-js-policies-is-there-an-or-operator-to-to-allow-an-action-if-one-of-a-gro
 */
