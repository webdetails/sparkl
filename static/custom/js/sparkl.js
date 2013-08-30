/********************************** Project namespace *******************************************/
var sparkl = {};
(function(myself){

  _settings = {
    expressions: {
      element: /^[A-Za-z][A-Za-z\d]+$/,
      plugin: /^[A-Za-z][A-Za-z\d]+$/
    }
  };

  
  myself.changeLocation = function (newLocation, bookmarks, isNew){
  if(!newLocation){ return; }
    var hash = (bookmarks && !_.isEmpty(bookmarks) ) ? '#' + generateHashValue( "bookmark" , { impl: "client" , params: bookmarks } ) : "";
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

  myself.isValidName = function (name, type){
    var reg = _settings.expressions[ type || 'plugin' ] || /.*/;
    return reg.test(name);
  }  


  myself.isJobError = function(json){
    return (json && json.result === false );
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


myself.addUploadForm = function(ph, opts){
    var _opts = {
      root:'.',
      success: function (filename) {
        Dashboards.log('File uploaded');
      },
      uploadError: function () {
        Dashboards.log('Error uploading file');
      },
      validationError: function () {
        Dashboards.log('File type not allowed.');
      },
      isValidFilename: function(filename){
        return (/\.(png)$/i).test(filename);
      }
    }

    opts = _.extend({}, _opts, opts);

    var $ph = $(ph)
        myself = this,
        $uploadForm = $('<form action="../cfr/store" method="post" enctype="multipart/form-data">').addClass('WDhidden'),
        filename = '';

    var validateForm = function (){
      if ( opts.isValidFilename(filename) ){
        return true
      } else {
        opts.validationError();
        return false
      }
    }

    var resetUploadForm = function () {
      $fileInput.val('');
      filename = '';
    };

    var fileUploaded = function (response) {
      if (response.result) {
        opts.success(filename);
        resetUploadForm(filename);
      } else {
        opts.uploadError(filename);
      }
    };

    // configure file upload form
    $uploadForm.ajaxForm({
      dataType: 'json',
      success: fileUploaded,
      error: opts.uploadError,
      beforeSubmit: validateForm
    });

    $ph.append($uploadForm);

    var $fileInput = $('<input type="file" class="file" name="file" required/>').appendTo($uploadForm),
        $pathInput = $('<input type="hidden" name="path" value="' + opts.root + '"/>').appendTo($uploadForm),
        $submitInput = $('<button type="submit">').appendTo($uploadForm);

    $fileInput.attr("id", this.htmlObject + "_file");
    $fileInput.change(function () {
      if ($fileInput.val() !== "") {
        filename = $fileInput.val();
        if (filename.slice(3, 11) == "fakepath") {
          filename = filename.slice(12, filename.length);
        }
        $submitInput.click();
      }
    });

    return function (){
      $fileInput.click();
    }
  }


  myself.testFile = function (url, successCallback, errorCallback){
    successCallback = successCallback || function (){ return true };
    errorCallback = errorCallback || function(){ return true }
    $.ajax({
      url: url,
      type:'HEAD',
      error: errorCallback,
      success: successCallback
    });
  }



  myself.runEndpoint = function ( pluginId, endpoint, opts){

    if ( !pluginId && !endpoint){
      Dashboards.log('PluginId or endpointName not defined.');
      return false
    }

    var _opts = {
      success: function (){
        Dashboards.log( pluginId + ': ' + endpoint + ' ran successfully.')
      },
      error: function (){
        Dashboards.log( pluginId + ': error running ' + endpoint + '.')
      },
      params: {},
      systemParams: {},
      type: 'POST',
      dataType: 'json'
    }
    var opts = $.extend( {}, _opts, opts);
    var url = Dashboards.getWebAppPath() + '/content/' + pluginId + '/' + endpoint;

    function successHandler  (json){
      if ( json && json.result == false){
        opts.error.apply(this, arguments);
      } else {
        opts.success.apply( this, arguments );
      }
    }

    function errorHandler  (){
      opts.error.apply(this, arguments);
    }

    var ajaxOpts = {
      url: url,
      async: true,
      type: opts.type,
      dataType: opts.dataType,
      success: successHandler,
      error: errorHandler,
      data: {}
    }

    _.each( opts.params , function ( value , key){
      ajaxOpts.data['param' + key] = value;
    });
    _.each( opts.systemParams , function ( value , key){
      ajaxOpts.data[key] = value;
    });

    $.ajax(ajaxOpts)
  }

  myself.getEndpointCaller = function( pluginId, endpoint, opts ){
    var myself = this;
    return function (callback, errorCallback, params){
      var _opts = $.extend({}, opts);
      _opts.params = params || _opts.params;
      _opts.success = callback || _opts.success;
      _opts.error = errorCallback || _opts.error;
      myself.runEndpoint(pluginId, endpoint, _opts);
    }
  };

  myself.publishToServer = function (callback){
    $.ajax({
      url: Dashboards.getWebAppPath() + '/Publish',
      type:'POST',
      data: {
        'publish': 'now',
        'class': 'org.pentaho.platform.plugin.services.pluginmgr.PluginAdapter'
      },                
      success: callback
    });
  }

  myself.addCallWrapper = function ( caller , callback){
    return function (json) { 
      caller( callback ); 
    };
  };
  myself.addRefreshWrapper = function (pluginId, callback){
    var caller = this.getEndpointCaller( pluginId, 'refresh' , { dataType:'text'});
    return this.addCallWrapper( caller, callback );
  }
  myself.addPublishWrapper = function (callback){
    // HACK: This call is only here because cpk is acting weird after a publish. Remove when bug 
    // on cpk is found!!!
    var cb = function (){
      $.ajax({
        url: Dashboards.getWebAppPath() + '/content/sparkl/getpluginmetadata',
        type: 'GET',
        async: true,
        success: callback,
        error: callback
      });
    };
    return this.addCallWrapper( this.publishToServer, cb );
  };





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