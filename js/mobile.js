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

  $(document).bind("pagebeforechange", function(e, data){
    // If the new page is not being loaded by URL, bail
    if (typeof data.toPage !== "string") {
      return;
    }

    // If the new page has a corresponding navbar link, activate its content div
    var url = $.mobile.path.parseUrl(data.toPage);
    var $a = $("div[data-role='navbar'] a[href='" + url.hash + "']");
    if ($a.length) {
        // Suppress normal page change handling since we're handling it here for this case
        e.preventDefault();
    }
    // If the new page has a navbar, activate the content div for its active item
    else {
        $a = $(url.hash + " div[data-role='navbar']").find("a.ui-btn-active");
 
        // Allow normal page change handling to continue in this case so the new page finishes rendering
    }
 
    // Show the content div to be activated and hide other content divs for this page
    var $content = $($a.attr("href"));
    $content.siblings().hide();
    $content.show();
  });

  require(["jquerymobile"], function() {
    this.router = new Mobile();
  });
});