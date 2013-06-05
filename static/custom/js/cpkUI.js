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

cpkUI.configViewPluginOp = function() {
	var $tableBodyTrArray = $('#'+this.htmlObject).find('table tbody tr');
	$tableBodyTrArray.each(function(){
		var $tdArray = $(this).find('td');
		/* */
		var $placeHolder = $($tdArray[$tdArray.length - 1]);
		var pluginId = $placeHolder.text();
		$placeHolder.empty().addClass('viewPluginButtonContainer');
		var $viewPluginButton = $("<button type='button'>View plugin</button>").addClass('button');
		$placeHolder.append($viewPluginButton);
	});
}
