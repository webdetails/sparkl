
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

    var newPluginOpts = [
    	{
    		id: "createOption",
    		label: "Create"
    	},
    	{
    		id: "importOption",
    		label: "Import"
    	}
    ]

	var MyClass = UnmanagedComponent.extend({

	  	_models: {},
	  	_views: {},
	  	_newPluginModel: undefined,
	  	_newPluginView: undefined,

		update: function() {
			$.extend(this.options,this);
		   	this.ph = $("#" + this.htmlObject);
		   	var callback = _.bind(this.handleJsonResponse,this);
//		   	var redraw = _.bind(this.redarw,this);
//		   	this.synchronous(redraw, plugins);
			this.clean();
	      	this.triggerQuery( this.chartDefinition , callback );
		},

		clean: function (){
			this._views = {};
			this._models = {};
		},
		// construct plugins info based on query data
	  	handleJsonResponse: function (json){
	    	var	plugins = _.map( json.resultset , function (rawPlugin){
	      		var plugin = {};
	      		_.each ( rawPlugin, function(value, idx){
	        		plugin[ json.metadata[idx].colName ] = value;
		      		plugin.actionOpts = pluginOptsButton; //append opts data not included in query
	      		});
	      		return plugin
	    	});
	    	this.redraw(plugins);
	  	},

		redraw: function(plugins) {
			$('#'+this.htmlObject).empty();

	    	var cd = this.chartDefinition;
	    	var that = this;

	    	// Construct NewPlugin
	    	var newPlugin = {};
	    	newPlugin.pluginId = Dashboards.getParameterValue('pluginIdParam');
	    	newPlugin.actionOpts = newPluginOpts;

	    	/* Initialize New Plugin Card */
	  		if( !that._newPluginModel ){
	    		that._newPluginModel = new wd.cpk.models.sparklNewPluginCard( newPlugin );
	    	} else {
	    		that._newPluginModel.set( newPlugin );
	   		}
	   		if( !that._newPluginView ){
	    		that._newPluginView = new wd.cpk.views.sparklNewPluginCard({	
	      			model: that._newPluginModel,
	      			tagName: 'div'
	       		});
		    }
	    	that._newPluginView.render( '#' + that.htmlObject );
	   		that.configureNewCardListeners( that._newPluginModel );	

	    	/* Initialize Plugins Cards models and views */
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
	    		that.configureListeners( that._models[pluginOpts.pluginId] );
	  		});

	  		_.each( this.getSortedViews() , function(v){
	  			v.render('#' + that.htmlObject ); 
	  		});

//			var nrCardsInRow = 4,
//				cardWidth = Math.floor(($(document).find('.pluginsListContainer').width() - 10*(nrCardsInRow-1))/nrCardsInRow),
//				$card = $(document).find('.sparklPluginCardContainer');
/*			$card.css('width',cardWidth);
			$card.css('height',cardWidth);
			$card.each(function(j){
				if( (j+1) % nrCardsInRow == 0)
		        	$(this).addClass('lastInRow');
  			});
*/
	  	},

	  	getSortedViews: function (prop, direction){
	  		var viewsArray = _.map( this._views , function(el){ return el});
	  		if (prop){
	  			viewsArray.sort( function(v1,v2){
					var s1 = v1.model.attributes[prop].toLowerCase(),
						s2 = v2.model.attributes[prop].toLowerCase();
					if(s1 < s2){
						return -1;
					}else{
						return 1;
					}
	  			});
	  		}
	  		return viewsArray;
	  	},

	  	sortViews: function (prop, direction){
	  		var viewsArray = this.getSortedViews( prop, direction);
	  		_.each( viewsArray , function(v){
	  			v.detachView().appendView();
	  		});
	  	},

		configureNewCardListeners: function (model){

			model.off('action:createOption');
			model.off('action:importOption');

	    	model.on('action:createOption',function(id){
			    var tableData = Dashboards.getComponentByName("render_pluginsTable").rawData,
			        idsArray = [],
			        pluginId = Dashboards.getParameterValue('${p:pluginIdParam}');
			    
			    $.each(tableData.resultset, function(idx,el){
			        idsArray.push(el[0]);
			    });
			    
			    if( idsArray.indexOf(id) > -1 ){
			        var dialogComponent = Dashboards.getComponentByName("render_dialogGrabComponent");
			        dialogComponent.open({
			            message:"Id "+id+" already in use. Please, try again with a different Id.",
			            buttons:[
			                {
			                    text: "OK",
			                    click: function () {
			                        $("#"+dialogComponent.htmlObject).dialog("close");
			                    }                               
			                }
			            ]
			        });
			    }
			    else{
			        sparkl.changeLocation( '/pentaho/content/sparkl/plugininfo', {
			            isNewPluginParam: true,
			            metadataReadonlyParam: false,
			            pluginIdParam: id
			        });
			    }
	    	},this);

	    	model.on('action:importOption',function(id){
		        var dialogComponent = Dashboards.getComponentByName("render_dialogGrabComponent");
		        dialogComponent.open({
		            message:"Import option not implemented yet.",
		            dialogClass:'closeButtonVisible',
		            buttons:[]
		        });
	    	},this);
		},

		configureListeners: function (model){

			model.off('action:deleteOption');
			model.off('action:viewOption');

	    	model.on('action:deleteOption',function(id){
                var dialogComponent = Dashboards.getComponentByName("render_dialogGrabComponent");
                dialogComponent.open({
                    message:"You are about to delete "+id+". Please, press OK to continue...",
                    buttons:[
                        {
                            text: "OK",
                            click: function () {
                                $.ajax({
                                    url: '/pentaho/content/sparkl/deletePlugin',
                                    type: 'POST',
                                    data: {
                                        parampluginId:id
                                    },
                                    success: function (){
                                        Dashboards.fireChange('updateTableEvent');
                                    }
                                });
                                $("#"+dialogComponent.htmlObject).dialog("close");
                            }
                        },
                        {
                            text: "Cancel",
                            click: function () {
                                $("#"+dialogComponent.htmlObject).dialog("close");
                            }                               
                        }
                    ]
                });
	    	},this);

	    	model.on('action:viewOption',function(id){
                sparkl.changeLocation( '/pentaho/content/sparkl/plugininfo', {
                    pluginIdParam: id,
                    metadataReadonlyParam: false
                });
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