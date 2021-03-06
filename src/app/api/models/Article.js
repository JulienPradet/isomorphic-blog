var slugify = require('slug')
  , config = require('app-config')
  , Waterline = require('waterline');

var Article = Waterline.Collection.extend({
  
  // Identity is a unique name for this model and must be in lower case
  identity: 'article',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: config.models.connection,

  autoPK: true,
  autoCreatedAt: true,
  autoUpdatedAt: true,
  schema: true,

  attributes: {
    'title': {
      type: 'string',
      maxLength: 255
    },
    'slug': {
      type: 'string',
      maxLength: 255,
      index: true,
      unique: true,
      alphanumericdashed: true
    },
    'content': {
      type: 'text'
    }
  },
    // toJson method used for the front API
    toJson: function() {
      var obj = this.toObject();
      delete obj.id;
      return obj;
    },

    // Makes sure that the slug is alright with the title
    beforeValidate: function(values, cb) {
      if(!values.hasOwnProperty('slug')) {
        /* Sets the slug */
        values.slug = slugify(values.title);
      }
      cb();
    }
});

module.exports = {
  identity: 'article',
  model: Article,
  repository: function(Model) {
    return {
      getArticles: function(number, page, cb) {
        Model.find()
          .paginate({page: page, limit: number})
          .exec(cb);
      },
      getArticleBySlug: function(articleSlug) {
        Model.find()
          .paginate
      },
      getArticlesByTag: function(tagSlug, number, page) {

      }
    };
  }
};
