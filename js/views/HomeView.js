// Page View
// =============

// Includes file dependencies
define([
  "jquery",
  "backbone",
  "underscore",
  'text!tpl/HomeView.html',
], function( $, Backbone, _, homeTemplate ) {
  // Extends Backbone.View
  var HomeView = Backbone.View.extend({
    // The View Constructor
    initialize: function() {
      //this.page.on( "added", this.render, this );
      this.render();
    },
    // Renders all of the Category models on the UI
    render: function() {
      this.template = _.template( homeTemplate, {'page': ''});
      this.$el.html(this.template);
      this.$el.addClass('loaded');
      return this;
    }
  });

    // Returns the View class
    return HomeView;

});