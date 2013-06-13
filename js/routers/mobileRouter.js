// Mobile Router
// =============

// Includes file dependencies
define([
  "jquery",
  "backbone", 
  "../models/PageModel",
  "../views/PageView",
  '../views/StaticView',
  "../models/ProductsModel",
  "../views/ProductsView",
  "../views/ProductsListView",
  "../views/ProductView"
], function( $, Backbone, PageModel, PageView, StaticView, ProductsModel, ProductsView, ProductsListView, ProductView) {
    // Extends Backbone.Router
    var IssRouter = Backbone.Router.extend( {
        _ChexProducts : null,
        _FrankenmanProducts : null,
        // The Router constructor
        initialize: function() {
          var self = this;
          $.mobile.loading('show');
          self._loadProducts();
          Backbone.history.start();
        },
        // Backbone.js Routes
        routes: {
            '' : 'staticPage',
            'home' : 'staticPage',
            '!/:id' : 'pages',
            'products' : 'products',
            'product/:id' : 'product'
        },

        // Home method
        home: function() {
          // Programatically changes to the categories page
          this.changePage("#home");
        },
        pages: function (pId) {
          var self = this;
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
            self.changePage(idPath);
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
              self.changePage(idPath);
            },
            error: function(m, r){
              //var currentView = new ErrorView({el: idPath, page: page});
              //$.mobile.changePage( idPath , { reverse: false, changeHash: false,  transition: 'slide'} );
              var changeThis = $(idPath).find('div[data-role="content"]');
              
              changeThis.html('Error');
              jQuery.each(r, function(index, value) {
                changeThis.append(index + " : " + value + '<br />');
              });
              self.changePage(idPath);
            }
          });
        },
        staticPage : function(pId){
          var self = this;
          if( typeof pId == 'undefined') {
            pId = 'home';
          }
          $.mobile.loading('show');
          var idPath = '#' + pId;
          if ($(idPath).hasClass('loaded')){
            self.changePage(idPath);
          }
          else {
            var currentView = new StaticView({el:idPath, id:pId});
            self.changePage(idPath);
          }
        },
        products : function(){
          var self = this,
            idPath = '#products';

          $.mobile.loading('show');
          if (!$(idPath).hasClass('loaded')){
            var currentView = new ProductsView({el: idPath});
            var chexListView = new ProductsListView({el : '#products-chex', row : self._ChexProducts});
            var frankenmanListView = new ProductsListView({el : '#products-frankenman', row : self._FrankenmanProducts});
          }

          self.changePage(idPath);
        },
        product : function(id){
          var self = this,
              idPath = '#product-'+id;
          var page = $(idPath);
          if (page.length > 0){
            self.changePage(idPath);
          }
          else {
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
                var currentView = new ProductView({el: idPath, page: page});
                self.changePage(idPath);
              },
              error: function(m, r){
                //var currentView = new ErrorView({el: idPath, page: page});
                //$.mobile.changePage( idPath , { reverse: false, changeHash: false,  transition: 'slide'} );
                var changeThis = $(idPath).find('div[data-role="content"]');
                changeThis.html('Error');
                jQuery.each(r, function(index, value) {
                  changeThis.append(index + " : " + value + '<br />');
                });
                self.changePage(idPath);
              }
            });
          }
        },
        changePage:function (page) {
            //$(page.el).attr('data-role', 'page');
            //page.render();
            //$('body').append($(page.el));
            $.mobile.changePage(page, { reverse: false, changeHash: false,  transition: 'slide'});
        },
        _loadProducts: function() {
          var self = this;
          self._ChexProducts = new ProductsModel({id : 'chex'});
          self._ChexProducts.fetch({
            async : false,
            data : {
              tag : 'chex'
            },
            processData : true,
            success : function(){
              //console.log(self._ChexProducts);
            },
            error: function(){
              console.log('Error on chex');
            }
          });
          self._FrankenmanProducts = new ProductsModel({id : 'frankenman'});
          self._FrankenmanProducts.fetch({
            async : false,
            data : {
              tag : 'frankenman'
            },
            processData : true,
            success : function(){
              //console.log(self._FrankenmanProducts);
            },
            error: function(){
              console.log('Error on chex');
            }
          });
        }
    } );
    // Returns the Router class
    return IssRouter;
} );