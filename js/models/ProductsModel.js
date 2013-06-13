// Pages Model
// Includes file dependencies
define([
  "jquery",
  "backbone",
  "underscore"
], function( $, Backbone, _) {
  // The Model constructor
  var ProductsModel = Backbone.Model.extend({
    defaults: {
      page: {
        custom_fields: {
          mobile_content: '',
        }
      },
    },
    //url: function(){
    //  return this.instanceUrl;
    //},
    initialize: function(){},
    urlRoot: "http://m.frankenman.hk/tags.php",
  });
  
  // Returns the Model class
  return ProductsModel;
});