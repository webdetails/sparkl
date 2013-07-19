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

  	namespace.models.sparklElementCard = Backbone.Model.extend({
    	defaults:{
   	    	"element_name": "",
    	  	"elementType": "",
	      	"adminOnly": "",
   			"actionOpts" : []
    	},

    	initialize: function (){
			      	
    	},

    	fireAction: function (action){
    		this.trigger('action:' + action , this.get('element_name') );
    	}
	});


	/*
	 * Templates
	 */

	namespace.templates.sparklElementCard = Mustache.compile(
		"		<div class='optsExpandCont type{{elementType}}'>"+
		"			<div class='cardBody'>"+
		"				{{element_name}} is an element that does lots of things"+
		"			</div>"+
		"			<div class='cardFooter'>"+
		"				<div class='typeLabel'>[{{elementType}}]</div>"+
		"			</div>"+
		"			<div class='optsExternCont'>"+
		"				<div class='optionsContainer'>"+
		"				</div>"+
		"				<div class='optionsIcon'>"+
		"				</div>"+
		"			</div>"+
		"		</div>"
	);

	/*
	 * Views
	 */

	namespace.views.sparklElementCard = Backbone.View.extend({
		template: namespace.templates.sparklElementCard,
		tagName: 'div',
		className: 'sparklElementCardContainer',
		events:{
	    },

	    initialize: function (){
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
	      		});
	      	});	

	      	if (ph){
	      		that.$ph = $(ph);
	      		$(ph).append(that.$el);
	      	}
	    },
	});

}) (wd.cpk);
