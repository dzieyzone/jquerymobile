$(document).ready(function() {
  // Before handling a page change...
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
 
});