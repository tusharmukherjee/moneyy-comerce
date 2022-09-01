// Model is use to connect database tables through Objection ORM
const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');


const knexConnection = Knex(connection.development);
Model.knex(knexConnection);

const path = require('path');

class UsersModel extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings () {
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname,'./productsModel.js'),
        join: {
          from: 'users.userId',
          to: 'products.user_id'
        }
      },

      review:{
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname,'./reviewModel.js'),
        join:{
            from: 'users.userId',
            to: 'review.user_id'
        }
      },
      

    }
  }
}


// table name 'users'
module.exports = {UsersModel};