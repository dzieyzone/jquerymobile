require.config( {
  paths: {
    "jquery": "libs/jquery-1.9.1.min",
    "jquerymobile": "libs/jquery.mobile-1.3.1.min",
    "underscore": "libs/lodash.compat.min",
    "backbone": "libs/backbone-min"
  },
  shim: {
    "backbone": {
      "deps": [ "underscore", "jquery" ],
      "exports": "Backbone"
    }
  }
});

require([
  "jquery",
  "backbone",
  "routers/mobileRouter",
], function( $, Backbone, Mobile ) {
  $(document).on("mobileinit",
    function() {
      $.support.cors = true;
      $.mobile.allowCrossDomainPages = true;
      $.mobile.linkBindingEnabled = false;
      $.mobile.hashListeningEnabled = false;
      $.mobile.page.prototype.options.domCache = true;
    }
  );

  $(document).delegate('.ui-navbar ul li > a', 'click', function() {
    var parentPage = $(this).closest('div[data-role="page"]');
    //console.log(parentPage.attr('id'));
    //search the navbar to deactivate the active button
    $(this).closest('.ui-navbar').find('a').removeClass('ui-btn-active');

    //change the active tab
    $(this).addClass('ui-btn-active');

    //hide the siblings
    if (parentPage.hasClass('product-page-display')){
      $('.' + $(this).attr('data-href'), parentPage).show().siblings('.tab-content').hide();
    }
    else {
      $('#' + $(this).attr('data-href')).show().siblings('.tab-content').hide();
    }

    return false;
  });

  require(["jquerymobile"], function() {
    this.router = new Mobile();
  });
});