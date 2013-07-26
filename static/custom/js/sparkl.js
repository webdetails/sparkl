/********************************** Project namespace *******************************************/
var sparkl = {};
(function(myself){
	
	myself.changeLocation = function (newLocation, params, isNew){
        if(!newLocation){ return; }
        var hash = (params && !_.isEmpty(params) ) ? '#' + generateHashValue( "bookmark" , { impl: "client" , params: params } ) : "";
        if (isNew){
        	window.open( newLocation + hash);
    		} else {
    			window.location = newLocation + hash;
    		}
    }

  	function generateHashValue (key, value) {
        var obj = Dashboards.getHashValue(),json;
        if (arguments.length == 1) {
            obj = key;
        } else {
            obj[key] = value;
        }
        json = JSON.stringify(obj);
        return json;
    }

    myself.createElementsTableEmptyRawData = function() {
    	var emptyData = {
    		metadata:[
    			{
    				colIndex: 0,
    				colType: 'String',
    				colName: 'elementName'
    			},
    			{
    				colIndex: 1,
    				colType: 'String',
    				colName: 'elementType'
    			},
    			{
    				colIndex: 2,
    				colType: 'Boolean',
    				colName: 'adminOnly'
    			},
    			{
    				colIndex: 3,
    				colType: 'String',
    				colName: 'fileName'
    			},
    			{
    				colIndex: 4,
    				colType: 'String',
    				colName: 'elementName'
    			}
    		],
    		queryInfo:{
    			totalRows: 0
    		},
    		resultset: []
    	}
    	return emptyData;
    }	

})(sparkl);

/************************************  AddIns ************************************/


;(function (){

	var parameterButton = {
	    name: "parameterButton",
	    label: "Parameter Button",
	    defaults: {
	    	buttons:[
		    	{
			    	cssClass: "viewButton",
			    	title: "View",
			      	action: function(v, st) {
			      		Dashboards.log(v);
			      	}
		    	}
	    	]
	    },

	    init: function(){
	      	$.fn.dataTableExt.oSort[this.name+'-asc'] = $.fn.dataTableExt.oSort['string-asc'];
	      	$.fn.dataTableExt.oSort[this.name+'-desc'] = $.fn.dataTableExt.oSort['string-desc'];
	    },
	    
	    implementation: function(tgt, st, opt){
	    	var $buttonContainer = $('<div/>').addClass('buttonContainer');
	    	_.each(opt.buttons, function(el,idx){
		    	var $button = $("<button/>").addClass(el.cssClass||"").text(el.title||"");
		    	$button.click(function(){
		    		if (el.action) {
		    			el.action(st.value, st);
		    		}
		    	});
		    	$buttonContainer.append($button);
	    	});
	    	$(tgt).empty().append($buttonContainer);

	    }

  	};
  	Dashboards.registerAddIn("Table", "colType", new AddIn(parameterButton));
	
	
/* edit data of table  */
  var editable = {
    name: "editable",
    label: "Editable",
    defaults: {
		action: function (v, st) {
			Dashboards.log(v);
		}
    },
    init: function(){
        
      // Register this for datatables sort
      var myself = this;
      $.fn.dataTableExt.oSort[this.name+'-asc'] = function(a,b){
        return myself.sort(a,b)
      };
      $.fn.dataTableExt.oSort[this.name+'-desc'] = function(a,b){
        return myself.sort(b,a)
      };     
    }, 
    sort: function(a,b){
      return this.sumStrArray(a) - this.sumStrArray(b);
    }, 

    implementation: function (tgt, st, opt) {
      var t = $(tgt);
	  var value = st.value;
	  var text = $("<input/>").attr({value:value, type:'text', class:'editBox'})
		.keyup(function(event){
			if (event.keyCode == 13) {
				opt.action( $(this).val(), st );
			}
			/*var idx = this.parentNode.parentNode.rowIndex;
			metadataParam[idx-1][1] = $(this).val();*/
			var obj = this.parentNode.parentNode.children[0].textContent;
			metadataParam[obj.toString()] = $(this).val();
		});
	  
	  t.empty();
	  t.append(text);
    }
  };
  Dashboards.registerAddIn("Table", "colType", new AddIn(editable));
	
})();