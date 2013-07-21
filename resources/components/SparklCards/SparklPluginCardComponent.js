
var SparklPluginCardComponent = (function(){

    var pluginOptsButton = [
      	{
        	 id: "deleteOption",
          	label: "Delete"
      	},
      	{
        	id: "viewOption",
          	label: "View"
      	}
    ]

    var plugins = [
     	{
        	pluginId: 'plugin1',
          	plugin_description: 'A plugin made of gold',
          	plugin_name: 'BSilva Breakfast Plugin',
          	version: '01a13',
          	actionOpts: pluginOptsButton,
          	imgSrc: '../img/alpha.png'
      	},
      	{
         	pluginId: 'plugin2',
          	plugin_description: 'Testing some stuff 22222',
          	plugin_name: 'BSilva Lunch Plugin',
          	version: '01a13',
          	actionOpts: pluginOptsButton,
          	imgSrc: '../img/beta.png'
      	},
      	{
        	pluginId: 'plugin3',
          	plugin_description: 'Testing some stuff 3333',
          	plugin_name: 'BSilva Tea Plugin',
          	version: '01a13',
        	actionOpts: pluginOptsButton,
          	imgSrc: '../img/gamma.png'
      	},
      	{
         	pluginId: 'plugin4',
          	plugin_description: 'Testing some stuff 3333',
          	plugin_name: 'PMartins Plugin',
          	version: '01a13',
          	actionOpts: pluginOptsButton,
          	imgSrc: '../img/omega.png'
      	}
    ]

	var MyClass = UnmanagedComponent.extend({

	  	_models: {},
	  	_views: {},

		update: function() {
			$.extend(this.options,this);
		   	this.ph = $("#" + this.htmlObject);
		   	var redraw = _.bind(this.redraw,this);
		   	this.synchronous(redraw, plugins);
	      	//this.triggerQuery( this.chartDefinition , handleJsonResponse );
		},

	  	handleJsonResponse: function (json){
	     	//{ metadata: [], queryInfo: [], resultset: [[ ],[]]}
	    	var plugins = _.map( json.resulset , function (rawPlugin){
	      		var plugin = {};
	      		_.each ( rawPlugin, function(value, idx){
	        		plugin[ json.metadata[idx].title ] = value;
		      		plugin.actionOpts = pluginOptsButton;
	      		});
	      		return plugin
	    	});
	    	this.redraw(plugins);
	  	},

		redraw: function(plugins) {
	    	var cd = this.chartDefinition;
	    	var that = this;
	    	/* Initialize model and view, if needed */
	  		_.each( plugins , function(pluginOpts){
	  			if( !that._models[pluginOpts.pluginId] ){
	    			that._models[pluginOpts.pluginId] = new wd.cpk.models.sparklPluginCard( pluginOpts );
	    		} else {
	    			that._models[pluginOpts.pluginId].set( pluginOpts );
	    		}
	    		if( !that._views[pluginOpts.pluginId] ){
		    		that._views[pluginOpts.pluginId] = new wd.cpk.views.sparklPluginCard({	
		      			model: that._models[pluginOpts.pluginId],
		      			tagName: 'div'
		    		});
		    	}
	    		that._views[pluginOpts.pluginId].render( '#' + that.htmlObject );
	    		that.configureListeners( that._models[pluginOpts.pluginId] );
	    		/*this.selectorModel.syncSelection();*/
	  		});
	  	},
		configureListeners: function (model){

			model.off('action:deleteOption');
			model.off('action:viewOption');

	    	model.on('action:deleteOption',function(id){
	      		Dashboards.log('Deleting '+id);
	    	},this);
	    	model.on('action:viewOption',function(id){
	      		Dashboards.log('Viewing '+id);
	    	},this);

	/*    	this.selectorModel.off('change:selection');
	    	this.selectorModel.off('fullReport');
	    	this.selectorModel.off('export');

	    	this.selectorModel.on('change:selection', this.handleSelectionChange, this);
	    	this.selectorModel.on('export', function (){
	      		var comp = Dashboards.getComponentByName( this.chartDefinition.exportComponent ),
	          		q = comp.query || comp.queryState;
	      		if (q){
	        		q.exportData('xls');
	      		} else {
	        		Dashboards.log('No query object found in component ' + comp.name );
	      		}
	    	}, this);
	    	this.selectorModel.on('fullReport' , function (){
	      		// Do nothing
	      		Dashboards.log('Not implemented yet. Override.')
	    	}, this);
		*/
		/*	},
		  	handleSelectionChange: function(evt){
		     	Dashboards.processChange(this.name);
		  	},  	
		*/
		}
	}); 
	return MyClass
})();