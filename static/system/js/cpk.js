/************************************  AddIns ************************************/

(function (){

/* edit data of table  */
  var editable = {
    name: "editable",
    label: "Editable",
    defaults: {
      
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
	  selectHTML = "<textarea>" + st.value + "</textarea>";
	  $(tgt).append(selectHTML);
    }
  };
  Dashboards.registerAddIn("Table", "colType", new AddIn(editable));





})();