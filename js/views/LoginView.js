// Page View
// =============

// Includes file dependencies
define([
  "jquery",
  "backbone",
  "underscore",
  'text!tpl/LoginView.html'
], function( $, Backbone, _, loginTemplate ) {
  var LoginView = Backbone.View.extend({
    // The View Constructor
    initialize: function() {
      console.log("Login View");
    },
    events: {
      "click #loginButton" : "login",
      "change" : "change"
    },
    render: function() {
      this.template = _.template( loginTemplate, { 'page': this.options.toJSON()});
      this.$el.html(this.template);
      return this;
    },
    login:function (event) {
      event.preventDefault(); // Don't let this button submit the form
      $('.alert-error').hide(); // Hide any errors on a new submit
      var url = '../api/login';
      console.log('Loggin in... ');
      var formValues = {
        email: $('#inputEmail').val(),
        password: $('#inputPassword').val()
      };

      $.ajax({
        url:url,
        type:'POST',
        dataType:"json",
        data: formValues,
        success:function (data) {
          console.log(["Login request details: ", data]);
          if(data.error) {  // If there is an error, show the error messages
            $('.alert-error').text(data.error.text).show();
          }
          else { // If not, send them back to the home page
            window.location.replace('#');
          }
        }
      });
    }
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
    return LoginView;

});