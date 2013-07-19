
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
          plugin_id: 'plugin1',
          plugin_description: 'A plugin made of gold',
          plugin_name: 'BSilva Breakfast Plugin',
          version: '01a13',
          actionOpts: pluginOptsButton,
          imgSrc: '../img/alpha.png'
      },
      {
          plugin_id: 'plugin2',
          plugin_description: 'Testing some stuff 22222',
          plugin_name: 'BSilva Lunch Plugin',
          version: '01a13',
          actionOpts: pluginOptsButton,
          imgSrc: '../img/beta.png'
      },
      {
          plugin_id: 'plugin3',
          plugin_description: 'Testing some stuff 3333',
          plugin_name: 'BSilva Tea Plugin',
          version: '01a13',
        actionOpts: pluginOptsButton,
          imgSrc: '../img/gamma.png'
      },
      {
          plugin_id: 'plugin4',
          plugin_description: 'Testing some stuff 3333',
          plugin_name: 'PMartins Plugin',
          version: '01a13',
          actionOpts: pluginOptsButton,
          imgSrc: '../img/omega.png'
      }
    ]

  var MyClass = UnmanagedComponent.extend({



	update: function() {
		$.extend(this.options,this);
	   	this.ph = $("#" + this.htmlObject);
	   	var redraw = _.bind(this.redraw,this);
	   	this.synchronous(redraw, [plugins]);
      //this.triggerQuery( this.chartDefinition , handleJsonResponse );
	},

  handleJsonResponse: function (json){
     // { metadata: [], queryInfo: [], resultset: [[ ],[]]}

    var plugins = _.map( json.resulset , function (rawPlugin){
      var plugin = {};

      _.each ( rawPlugin, function(value, idx){
        plugin[ json.metadata[idx].title ] = value;
      });

      return plugin
    });

    this.redraw(plugins);
  },

	redraw: function(plugins) {
    	var cd = this.chartDefinition;
/*    	var modelOptions = $.extend({
        	sow: (_.isNumber(cd.startOfWeek)) ? cd.startOfWeek : 1,
          	selection: Dashboards.getParameterValue( this.parameter ) || {}
        }, cd );
*/

    	/* Initialize model and view, if needed */
  		_.each( plugins , function(pluginOpts){

  			if( !this.pluginCardModel[pluginOpts.plugin_id] ){
    			this.pluginCardModel[pluginOpts.plugin_id] = new wd.cpk.models.sparklPluginCard( pluginOpts );
    		} else {
    			this.pluginCardModel[pluginOpts.plugin_id].set( pluginOpts );
    		}

    		if( !this.pluginCardView[pluginOpts.plugin_id] ){
	    		this.pluginCardView[pluginOpts.plugin_id] = new wd.cpk.views.sparklPluginCard({	
	      			model: pluginCardModel[pluginOpts.plugin_id],
	      			tagName: 'div'
	    		});
	    	}
    		pluginCardView.render( '#' + this.htmlObject );
    		this.configureListeners();
    		/*this.selectorModel.syncSelection();*/
  		});
  	}
	configureListeners: function (){

		this.pluginCardModel[pluginOpts.plugin_id].off('action:deleteOption');
		this.pluginCardModel[pluginOpts.plugin_id].off('action:viewOption');

    	this.pluginCardModel[pluginOpts.plugin_id].on('action:deleteOption',function(id){
      		Console.log('Deleting '+id);
    	},this);
    	this.pluginCardModel[pluginOpts.plugin_id].on('action:viewOption',function(id){
      		Console.log('Viewing '+id);
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
}); 

return MyClass

})();