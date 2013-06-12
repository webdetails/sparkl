/********************************** Project namespace *******************************************/


/************************************  AddIns ************************************/


;(function (){

	var parameterButton = {
	    name: "parameterButton",
	    label: "Parameter Button",
	    defaults: {
	    	buttonClass: "viewButton",
	    	buttonTitle: "View",
	      	buttonAction: function(v, st) {
	      		Dashboards.log(v);
	      	}
	    },

	    init: function(){
	      	$.fn.dataTableExt.oSort[this.name+'-asc'] = $.fn.dataTableExt.oSort['string-asc'];
	      	$.fn.dataTableExt.oSort[this.name+'-desc'] = $.fn.dataTableExt.oSort['string-desc'];
	    },
	    
	    implementation: function(tgt, st, opt){
	    	var $button = $("<button class='"+opt.buttonClass+" '>"+opt.buttonTitle+"</button>");
	    	$button.click(function(){
	    		opt.buttonAction(st.value, st);
	    	});
	    	var $cell = $(tgt);
	    	$cell.empty();
	    	$cell.append($button);
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