/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.user.attributes({
    username:{
      type:"string",
      required:true,
      unique:true
    },
    //Password is not needed here
    //password: {
    //  type: "string",
    //  required: true
    //},
    firstname:{
      type: "string",
      required: true
    },
    lastname:{
      type: "string",
      required: true
    },
    email:{
      type: "string",
      email: true,
      required: true,
      unique: true
    },
    jsonWebTokens: {
      collection: 'jwt',
      via: 'owner'
    },
    enabled:{
      type:'boolean',
      defaultsTo:true
    },
    role:{
      type:"string",
      enum:['normal','admin','teacher'],
      required:true,
      defaultsTo:"normal" //could be admin, normal
    }

  }),
  
  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
