/*
 * Selector Model describes the behaviour for the selector
 * as a whole. 
 */



/*
model.on('action:delete' , function(id){
	Dashboards.log('Deleting plugin ' + id);
});**/




var wd = wd || {};
wd.cpk = wd.cpk || {};

(function (namespace) {

	namespace.models = namespace.models || {};
	namespace.views = namespace.views || {};
	namespace.templates = namespace.templates || {};

	/*
	 * Models
	 */

  	namespace.models.sparklNewPluginCard = Backbone.Model.extend({
    	defaults:{
      		"pluginId" : "", 
      		"plugin_name" : "",
      		"plugin_description" : "",
      		"author_name": "",
      		"company_name": "",
      		"company_url": "",
      		"creation_date": "",
      		"version": "",
      		"CPK_version": "",
      		"pluginImage": "",
   	
   			"actionOpts" : [],
   			"imgSrc": "",

   			"selected" : true
    	},

    	selec: function (){
			      	
    	},

    	fireAction: function (action){
    		this.trigger('action:' + action , this.get('pluginId') );
    	},
	});

	namespace.models.sparklPluginCard = Backbone.Model.extend({
    	defaults:{
      		"pluginId" : "", 
      		"plugin_name" : "",
      		"plugin_description" : "",
      		"author_name": "",
      		"company_name": "",
      		"company_url": "",
      		"creation_date": "",
      		"version": "",
      		"CPK_version": "",
      		"pluginImage": "",
   	
   			"actionOpts" : [],
   			"imgSrc": "",

   			"selected" : true
    	},

    	selec: function (){
			      	
    	},

    	fireAction: function (action){
    		this.trigger('action:' + action , this.get('pluginId') );
    	},
    	//match: function () {}
    	//se true: lanca envento A
    	//se false : lança evento B

    	//var match =

    	//this.set('selected', match);

    	//As views escutam os eventos
	});

	/*
	 * Templates
	 */

	 

	namespace.templates.sparklNewPluginCard = Mustache.compile(
		"		<div class='optionCont first'></div>"+
		"		<div class='separator'>"+
		"			<div class='horizontalRectangle'></div>"+
		"			<div class='verticalRectangle'></div>"+
		"		</div>"+
		"		<div class='optionCont second'></div>"
	);

	namespace.templates.sparklPluginCard = Mustache.compile(
		"		<div class=descriptionExpandCont>"+
		"			<div class='cardHeader'>"+
		"		  	 	<div class='name'>{{plugin_name}}</div>"+
		"				<div class='id'>{{pluginId}}</div>"+
		"			</div>"+
		"			<div class='cardBody'>"+
		"				<div class='imageContainer'>"+
		"					<img src='{{imgSrc}}' class='image'/> " +
		"				</div>"+
		"				<div class='descriptionContainer'>"+
		"					<div class='header'>Description</div>"+
		"					<div class='body'>{{plugin_description}}</div>"+
		"				</div>"+
		"			</div>"+
		"		</div>"+
		"		<div class='cardFooter'>"+
		"			<div class='versionLabel'> VER. "+
		"					{{version}}"+
		"			</div>"+
		"		</div>"+
		"		<div class='optsExternCont'>"+
		"			<div class='optionsContainer'>"+
		"			</div>"+
		"			<div class='optionsIcon'>"+
		"			</div>"+
		"		</div>"
	);

	/*
	 * Views
	 */

	namespace.views.sparklNewPluginCard = Backbone.View.extend({
		template: namespace.templates.sparklNewPluginCard,
		tagName: 'div',
		className: 'sparklNewPluginCardContainer',
		events:{},

		initialize: function (){

		},
		render: function (ph){
			var that = this,
				$optsContArr = that.$el.find('.optionCont');

	      	that.$el.html( that.template( that.model.toJSON()) );

	      	_.each ( that.model.get('actionOpts') , function (action,idx) {
				var $label = $("<div id='"+action.id+"' class='label'>"+action.label+"</div>");
				$optsContArr[idx].append($label);
	      		$optsContArr[idx].click( function (){
	      			that.model.fireAction( action.id );
	      		});
	      	});	

	      	if (ph){
	      		that.$ph = $(ph);
	      		$(ph).append(that.$el);
	      	}
		},
	});

	namespace.views.sparklPluginCard = Backbone.View.extend({
		template: namespace.templates.sparklPluginCard,
		tagName: 'div',
		className: 'sparklPluginCardContainer',
		events:{
	    	"click .optionsIcon": "toggleOptionsExpanded"
//	    	"mouseleave .optionsContainer.expanded": "toggleOptionsExpanded",
//	    	"mouseenter .imageContainer": "toggleDescriptionExpanded",
//	    	"mouseleave .descriptionContainer.expanded": "toggleDescriptionExpanded"
	    },

	    initialize: function (){
	    //	that.model.on('change:selected', function(e){
	    //		that.model.get('selected');	
	    //	})
	    },
	    render: function (ph){
			var that = this;
	      	that.$el.html( that.template( that.model.toJSON()) );

	      	_.each ( that.model.get('actionOpts') , function (action) {
	      		var $optsContainer = that.$el.find('.optionsContainer');
				var $opt = $("<div id='"+action.id+"' class='optionCont'>"+action.label+"</div>");
				$optsContainer.append($opt);
	      		$opt.click( function (){
	      			that.model.fireAction( action.id );
	      			that.toggleOptionsExpanded(false);
	      		});
	      	});	

	      	if (ph){
	      		that.$ph = $(ph);
	      		$(ph).append(that.$el);
	      	}
	    },
	
	    toggleOptionsExpanded: function( predicate ){
		    var $ph = this.$el.find('.optsExternCont');
		    var pred = _.isUndefined( predicate ) ? !$ph.hasClass('expanded') : predicate;
		    $ph.toggleClass('expanded', pred);
	    },
/*	    toggleDescriptionExpanded: function(){
		    var $ph = this.$el.find('.descriptionContainer');
		    $ph.toggleClass('expanded');
	    }
*/	});

}) (wd.cpk);
