// Page View
// =============

// Includes file dependencies
define([
  "jquery",
  "backbone",
  "underscore",
  'text!tpl/ProductsView.html'
], function( $, Backbone, _, ProductsTemplate ) {
  // Extends Backbone.View
  var ProductsView = Backbone.View.extend({
    // The View Constructor
    initialize: function() {
      //this.page.on( "added", this.render, this );
      this.render();
    },
    // Renders all of the Category models on the UI
    render: function() {
      this.template = _.template( ProductsTemplate);
      // Renders the view's template inside of the current listview element
      //console.log('this is it');
      this.$el.html(this.template);
      this.$el.addClass('loaded');
      // Maintains chainability
      return this;
    },
    events: {
      "change" : "change",
    },

    change: function (event) {
      // Remove any existing alert message
      utils.hideAlert();

      // Apply the change to the model
      var target = event.target;
      var change = {};
      change[target.name] = target.value;
      this.model.set(change);

      // Run validation rule (if any) on changed item
      var check = this.model.validateItem(target.page_id);
      if (check.isValid === false) {
        utils.addValidationError(target.page_id, check.message);
      } else {
        utils.removeValidationError(target.page_id);
      }
    }
  });

    // Returns the View class
    return ProductsView;

});