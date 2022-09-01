// Model is use to connect database tables through Objection ORM
const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');


const knexConnection = Knex(connection.development);
Model.knex(knexConnection);

const path = require('path');

class ReviewModel extends Model {
  static get tableName() {
    return 'review';
  }

  static get relationMappings () {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname,'./usersModel.js'),
        join: {
          from: 'review.user_id',
          to: 'users.userId'
        }
      },

      products:{
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname,'./reviewModel.js'),
        join:{
            from: 'products.productId',
            to: 'review.product_id'
        }
      },
      

    }
  }
}


// table name 'users'
module.exports = {ReviewModel};