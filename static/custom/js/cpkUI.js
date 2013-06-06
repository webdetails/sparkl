/********************************** Project namespace *******************************************/

/********************************** Project namespace *******************************************/
var cpkUI = (function () {

/************************************* Site Map Settings and Functions ******************************************/
var siteMap = function () {
  var solution = Dashboards.context.solution;

  return [ {name: "Dashboard1",  id:"d1",  link: undefined , action:function() {Dashboards.log("Link1");}, sublinks: [] },
           {name: "Dashboard2",  id:"d2",  link: undefined , action:function() {Dashboards.log("Link2");}, sublinks: [] },
           {name: "Dashboard3",  id:"d3",  link: undefined , action:function() {Dashboards.log("Link3");}, sublinks: [] }
         ];
}  

/************************************* Colors ******************************************/

var colors = { }
/************************************* Settings  ******************************************/

var settings = { }

return { siteMap: siteMap, 
         colors: colors, 
         settings: settings  } ;
})();

/*********************************** Functions ******************************************/



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
	 		/* onclick='"opt.buttonAction.call(this, st)"' */
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