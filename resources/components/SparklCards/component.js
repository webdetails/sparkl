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

  	namespace.models.sparklPluginCard = Backbone.Model.extend({
    	defaults:{
      		"plugin_id" : "", 
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
   			"imgSrc": ""
    	},

    	initialize: function (){
			      	
    	},

    	fireAction: function (action){
    		this.trigger('action:' + action , this.get('plugin_id') );
    	}
	});


	/*
	 * Templates
	 */
//aminGundi
	namespace.templates.sparklPluginCard = Mustache.compile(
		"		<div class=descriptionExpandCont>"+
		"			<div class='cardHeader'>"+
		"		  	 	{{plugin_name}}"+
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
//animBSilva
/*	namespace.templates.sparklPluginCard = Mustache.compile(
		"		<div class=descriptionExpandCont>"+
		"			<div class='cardHeader'>"+
		"		  	 	{{plugin_name}}"+
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
		"			<div class='optionsIcon'>"+
		"			</div>"+
		"		</div>"+
		"		<div class='optionsContainer'>"+
		"		</div>"
);
*/
//	namespace.templates.option = Mustache.compile(
//		"		<div id='{{id}}' class='optionCont'>{{label}}</div>"
//	);

	/*
	 * Views
	 */

	namespace.views.sparklPluginCard = Backbone.View.extend({
		template: namespace.templates.sparklPluginCard,
//		optionTemplate: namespace.templates.option,	  
		tagName: 'div',
		className: 'sparklPluginCardContainer',
		events:{
//	    	"mouseenter .optionsIcon": "toggleOptionsExpanded",
//	    	"mouseleave .optionsContainer.expanded": "toggleOptionsExpanded",
//	    	"mouseenter .imageContainer": "toggleDescriptionExpanded",
//	    	"mouseleave .descriptionContainer.expanded": "toggleDescriptionExpanded"
	    },

	    initialize: function (){
	    },
	    render: function (ph){
			var that = this;
	      	that.$el.html( that.template( that.model.toJSON()) );

	      	_.each ( that.model.get('actionOpts') , function (action) {
	      		var $optsContainer = that.$el.find('.optionsContainer');
//	      		$optsContainer.html( that.optionTemplate() );
				var $opt = $("<div id='"+action.id+"' class='optionCont'>"+action.label+"</div>");
				$optsContainer.append($opt);
	      		$opt.click( function (){
	      			that.model.fireAction( action.id );
	      		});
	      	});	

	      	if (ph){
	      		that.$ph = $(ph);
	      		$(ph).append(that.$el);
	      	}
	    },
/*	    toggleOptionsExpanded: function(){
		    var $ph = this.$el.find('.optionsContainer');
		    $ph.toggleClass('expanded');
	    },
	    toggleDescriptionExpanded: function(){
		    var $ph = this.$el.find('.descriptionContainer');
		    $ph.toggleClass('expanded');
	    }
*/	});

}) (wd.cpk);
