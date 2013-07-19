
var MedavisOptionsComponent = UnmanagedComponent.extend({


  update: function() {
    $.extend(this.options,this);
    this.ph = $("#" + this.htmlObject);
    var redraw = _.bind(this.redraw,this);
    this.synchronous(redraw);
  },

  redraw: function() {
    var cd = this.chartDefinition;
    var modelOptions = $.extend({
          sow: (_.isNumber(cd.startOfWeek)) ? cd.startOfWeek : 1,
          selection: Dashboards.getParameterValue( this.parameter ) || {}
        }, cd );

    /* Initialize model and view, if needed */
    if(!this.selectorModel) {
      this.selectorModel = new wd.custom.components.models.widgetOptions(modelOptions);
    } else {
      this.selectorModel.set(modelOptions);
    }
    if(!this.selectorView) {
      this.selectorView = new wd.custom.components.views.widgetOptions({
        model: this.selectorModel,
        el: '#' + this.htmlObject
      });
    }
    this.selectorView.render();
    // this.handleSelectionChange();
    this.configureListeners();
    this.selectorModel.syncSelection();
  },

  configureListeners: function (){
    this.selectorModel.off('change:selection');
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
  },

 /* handleCollapse: function(evt){
    if(evt.changed.collapsed) Dashboards.processChange(this.name);
  },*/

  handleSelectionChange: function(evt){
      Dashboards.processChange(this.name);
  },

  getValue: function() {
    return this.selectorModel.get('selection');
  }

}); 
