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

})();