/********************************** Project namespace *******************************************/

/********************************** Project namespace *******************************************/
var sampleNamespace = (function () {

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



