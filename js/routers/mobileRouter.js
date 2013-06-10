// Mobile Router
// =============

// Includes file dependencies
define([
  "jquery",
  "backbone", 
  "../models/PageModel",
  "../collections/PageCollection",
  "../views/PageView",
  '../views/StaticView',
], function( $, Backbone, PageModel, PageCollection, PageView, StaticView) {
    // Extends Backbone.Router
    var IssRouter = Backbone.Router.extend( {
        // The Router constructor
        initialize: function() {
          Backbone.history.start();
        },

        // Backbone.js Routes
        routes: {
            '' : 'staticPage',
            'home' : 'staticPage',
            '!/:id' : 'pages'
        },

        // Home method
        home: function() {
          // Programatically changes to the categories page
          $.mobile.changePage( "#home" , { reverse: false, changeHash: false });
        },
        pages: function (pId) {
          $.mobile.loading("show");
          $.support.cors = true;
          $.mobile.allowCrossDomainPages = true;
          if( typeof pId == 'undefined') {
            pId = 'home';
          }
          var id = 0;
          switch (pId){
            case 'about':
              id = 2555;
              break;
            case 'contact':
              id = 168;
              break;
          }

          var idPath = '#' + pId;
          if ($(idPath).hasClass('loaded')){
            $.mobile.changePage( idPath , { reverse: false, changeHash: false,  transition: 'slide'} );
            return false;
          }
          var page = new PageModel({id:id});
          page.fetch({
            data:{
              page_id : id,
              json : '1',
              custom_fields: "mobile_content",
            },
            crossDomain: true,
            processData: true,
            success: function(){
              var currentView = new PageView({el: idPath, page: page});
              //console.log(currentView);
              $.mobile.changePage( idPath , { reverse: false, changeHash: false,  transition: 'slide'} );
            },
            error: function(m, r){
              //var currentView = new ErrorView({el: idPath, page: page});
              //$.mobile.changePage( idPath , { reverse: false, changeHash: false,  transition: 'slide'} );
              var changeThis = $(idPath).find('div[data-role="content"]');
              
              changeThis.html('Error');
              jQuery.each(r, function(index, value) {
                changeThis.append(index + " : " + value + '<br />');
              });
              $.mobile.changePage( idPath , { reverse: false, changeHash: false,  transition: 'slide'} );
            }
          });
        },
        staticPage : function(pId){
          if( typeof pId == 'undefined') {
            pId = 'home';
          }
          $.mobile.loading('show');
          var idPath = '#' + pId;
          if ($(idPath).hasClass('loaded')){
            $.mobile.changePage( idPath , { reverse: false, changeHash: false,  transition: 'slide'} );
            return false;
          }

          var currentView = new StaticView({el:idPath, id:pId});
          $.mobile.changePage( idPath , { reverse: false, changeHash: false,  transition: 'slide'} );
        }
    } );
    // Returns the Router class
    return IssRouter;
} );