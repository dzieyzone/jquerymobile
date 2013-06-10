// Pages Model
// Includes file dependencies
define([
  "jquery",
  "backbone",
  "underscore"
], function( $, Backbone, _) {
  // The Model constructor
  var PageModel = Backbone.Model.extend({
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
    initialize: function(props){
      //console.log(props.id);
      //this.instanceUrl = props.url;
    },
    urlRoot: "http://m.frankenman.hk/retrieve.php"
  });
  
  // Returns the Model class
  return PageModel;
});