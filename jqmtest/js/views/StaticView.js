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
  var StaticView = Backbone.View.extend({
    // The View Constructor
    initialize: function() {
      //this.page.on( "added", this.render, this );
      this.render();
    },
    // Renders all of the Category models on the UI
    render: function() {
      var currentTemplate = '';

      switch (this.options.id){
        case 'home':
          currentTemplate = homeTemplate;
        break;
      }

      this.template = _.template( currentTemplate, {'page': ''});
      // Renders the view's template inside of the current listview element
      //console.log(this.options.id);
      this.$el.html(this.template);
      this.$el.addClass('loaded');
      // Maintains chainability
      return this;
    }
  });

    // Returns the View class
    return StaticView;

});