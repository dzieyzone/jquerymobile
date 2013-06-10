// Page Collection
// ===================
// Includes file dependencies
define([
  "jquery",
  "backbone",
  "underscore",
  "models/PageModel"
], function( $, Backbone, _, PageModel ) {
  // Extends Backbone.Router
  var PageCollection = Backbone.Collection.extend({
    url: "http://www.insitesocial.com.hk",
    model: PageModel,
    // Overriding the Backbone.sync method (the Backbone.fetch method calls the sync method when trying to fetch data)
    sync: function( method, model, options ) {
      // Instantiates an empty array
      var categories = [],

      // Stores the this context in the self variable
      self = this,
      // Creates a jQuery Deferred Object
      deferred = $.Deferred();
      // Uses a setTimeout to mimic a real world application that retrieves data asynchronously
      setTimeout( function() {
        // Filters the above sample JSON data to return an array of only the correct category type
        categories = _.filter( self.jsonArray, function( row ) {
          return row.category === self.type;
        });

        // Calls the options.success method and passes an array of objects (Internally saves these objects as models to the current collection)
        options.success( categories );
        // Triggers the custom `added` method (which the Category View listens for)
        self.trigger( "added" );
        // Resolves the deferred object (this triggers the changePage method inside of the Category Router)
        deferred.resolve();
      }, 1000);
      // Returns the deferred object
      return deferred;
    }
  });
    // Returns the Model class
    return PageCollection;
});