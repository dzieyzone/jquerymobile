// Page View
// =============

// Includes file dependencies
define([
  "jquery",
  "backbone",
  "underscore",
  "models/PageModel",
  'text!tpl/PageView.html',
  'text!tpl/HomeView.html'
], function( $, Backbone, _, PageModel, pageTemplate, homeTemplate ) {
  // Extends Backbone.View
  var PageView = Backbone.View.extend({
    // The View Constructor
    initialize: function() {
      //this.page.on( "added", this.render, this );
      this.render();
    },
    // Renders all of the Category models on the UI
    render: function() {
      var currentTemplate = pageTemplate;
      // Sets the view's template property
      if (this.options.page.id == 4618) {
        var currentTemplate = homeTemplate;
      }
      //console.log(this.options.page);
      this.template = _.template( currentTemplate, { 'page': this.options.page});
      // Renders the view's template inside of the current listview element
      //console.log(this.options.page.id);
      this.$el.html(this.template);
      this.$el.addClass('loaded');
      // Maintains chainability
      return this;
    },
    events: {
    //  "change" : "change",
      "click #loginButton" : "login"
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
    },
    login:function (event) {
      var self = this;
      event.preventDefault(); // Don't let this button submit the form
      $('.alert-error').hide(); // Hide any errors on a new submit
      //console.log($.myVars);
      var url = 'http://m.frankenman.hk/distributor.php?method=cookie';
      var formValues = {
        username: $('#inputUsername').val(),
        password: $('#inputPassword').val(),
        method : 'cookie'
      };
      $.ajax({
        async : false,
        url:url,
        type:'POST',
        dataType:"json",
        data: formValues,
        success:function (data) {
          if(data.error) {  // If there is an error, show the error messages
            $('.alert-error').text(data.error).show();
          }
          else {
            $('.alert-error').text('Successful').show();
            $.myVars.cookie = data.cookie;
            $.myVars.redirect = '#distributor';
            self.$el = $($.myVars.redirect);
            //console.log(data.page.page);
            self.template = _.template( pageTemplate, { 'page': data.page.page});
            // Renders the view's template inside of the current listview element
            //console.log(this.options.page.id);
            self.$el.html(self.template);
            self.$el.addClass('loaded');
            $.mobile.changePage('#distributor');
            //Backbone.router.navigate('distributor', {trigger: true});
          }
        }
      });
    }
  });

    // Returns the View class
    return PageView;

});