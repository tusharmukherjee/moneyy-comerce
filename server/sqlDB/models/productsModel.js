// Model is use to connect database tables through Objection ORM
const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');


const knexConnection = Knex(connection.development);
Model.knex(knexConnection);

const path = require('path');

class ProductsModel extends Model {
  static get tableName() {
    return 'products';
  }

  static get relationMappings () {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname,'./usersModel.js'),
        join: {
          from: 'products.user_id',
          to: 'users.userId'
        }
      },

      review:{
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname,'./reviewModel.js'),
        join:{
            from: 'review.product_id',
            to: 'products.productId'
        }
      },
      

    }
  }
}


// table name 'users'
module.exports = {ProductsModel};