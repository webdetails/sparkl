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
      		"pluginId" : "newPluginId", 
   				"actionOpts" : []
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
    	},

    	fireAction: function (action){
    		this.trigger('action:' + action , this.get('pluginId') );
    	},
	});

	/*
	 * Templates
	 */



	namespace.templates.sparklNewPluginCard = Mustache.compile(
		"   <div class='overlay'></div>" +
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
		"		  	<div class='nameContainer'>"+
		"         <span class='name'>{{plugin_name}}</span>"+
		"					<div class='ellipsis'>...</div>" +
		"       </div>"+
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
			var that = this;
	      	that.$el.html( that.template( that.model.toJSON()) );

			var $optsContArr = that.$el.find('.optionCont');

	      	_.each ( that.model.get('actionOpts') , function (action,idx) {
				$optsContArr[idx].innerHTML=action.label;
	      		$($optsContArr[idx]).click( function (){
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
	      			that.toggleOptionsExpanded(false);
	      		});
	      	});	

	      that.appendView(ph);
	    },

	    appendView: function(ph){
	    	if (ph){
	    		this.$ph = $(ph);
	    	}
	    	if (this.$ph){
	    		this.$ph.append(this.$el);
	    	}

	    	var $header = this.$el.find('.cardHeader'),
	      		$title = $header.find('.name');
	      if( $title.width() > $header.width()){
	      	$header.addClass('overflow');
	      }

	    	return this
	    },

	    detachView: function(){
			this.$el.detach();
			return this
	    },
	
	    toggleOptionsExpanded: function( predicate ){
		    var $ph = this.$el.find('.optsExternCont');
		    var pred = _.isUndefined( predicate ) ? !$ph.hasClass('expanded') : predicate;
		    $ph.toggleClass('expanded', pred);
	    },
	});

}) (wd.cpk);
