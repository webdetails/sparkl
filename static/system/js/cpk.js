/************************************  AddIns ************************************/

(function (){

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
	  var text = $("<input/>").attr({value:value, type:'text'})
		.keyup(function(event){
			if (event.keyCode == 13) {
				opt.action( $(this).val(), st );
			}
			var idx = this.parentNode.parentNode.rowIndex;
			metadataParam[idx-1][1] = $(this).val();
		});
	  
	  t.empty();
	  t.append(text);
    }
  };
  Dashboards.registerAddIn("Table", "colType", new AddIn(editable));





})();