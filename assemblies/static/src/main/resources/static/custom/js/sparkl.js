/********************************** Project namespace *******************************************/
var sparkl = {};
(function (myself) {

  var _settings = {
    expressions: {
      element: /^[A-Za-z][A-Za-z\d]*$/,
      plugin: /^[A-Za-z][A-Za-z\d]*$/,
      image: /\.(png|jpg)$/,
      zip: /\.(zip)$/
    },
    reservedNames: [
      'status', 'refresh', 'reload'
    ]
  };

  myself.getSettings = function () {
    var acc = _settings;

    _.every(arguments, function (el) {
      acc = acc[el] || undefined;
      return !!acc;
    });

    return acc;
  };

  myself.changeLocation = function (newLocation, bookmarks, isNew) {
    if (!newLocation) {
      return;
    }

    var hash = (bookmarks && !_.isEmpty(bookmarks)) ? '#' + generateHashValue("bookmark", {
      impl: "client",
      params: bookmarks
    }) : "";

    if (isNew) {
      window.open(newLocation + hash);
    } else {
      window.location = newLocation + hash;
    }
  };

  function generateHashValue(key, value) {
    var obj = Dashboards.getHashValue();

    if (arguments.length === 1) {
      obj = key;
    } else {
      obj[key] = value;
    }

    return JSON.stringify(obj);
  }

  myself.isValidName = function (name, type) {
    var reg = _settings.expressions[type || 'plugin'] || /.*/;

    return reg.test(name);
  };

  myself.isUpdated = function (srcVersion, pluginVersion) {
    var srcVersionObj = myself.parseVersion(srcVersion);
    var pluginVersionObj = myself.parseVersion(pluginVersion);

    if (pluginVersionObj.major < srcVersionObj.major) return false;
    if (pluginVersionObj.minor < srcVersionObj.minor) return false;
    if (pluginVersionObj.other < srcVersionObj.other) return false;
    if (pluginVersionObj.patch < srcVersionObj.patch) return false;

    return true;
  };

  myself.parseVersion = function (version) {
    // Matches - Major.minor.other.patch
    var versionRegx = /^([0-9]+)(?:\.([0-9]*)(?:\.([0-9]*))?(?:\.([0-9]*))?)?/;

    var match = versionRegx.exec(version);

    return {
      major: Number(match[1] || ""),
      minor: Number(match[2] || ""),
      other: Number(match[3] || ""),
      patch: Number(match[4] || "")
    };
  };

  myself.isJobError = function (json) {
    return (json && json.result === false);
  };

  myself.hasUploaderComponent = function () {
    return !(typeof FileUploaderComponent == 'undefined');
  };

  myself.createElementsTableEmptyRawData = function () {
    return {
      metadata: [{
        colIndex: 0,
        colType: 'String',
        colName: 'elementName'
      }, {
        colIndex: 1,
        colType: 'String',
        colName: 'elementType'
      }, {
        colIndex: 2,
        colType: 'Boolean',
        colName: 'adminOnly'
      }, {
        colIndex: 3,
        colType: 'String',
        colName: 'fileName'
      }, {
        colIndex: 4,
        colType: 'String',
        colName: 'elementName'
      }],
      queryInfo: {
        totalRows: 0
      },
      resultset: []
    };
  };

  myself.addUploadForm = function (ph, opts) {
    var _opts = {
      root: '.',
      success: function (/* filename */) {
        Dashboards.log('File uploaded');
      },

      uploadError: function () {
        Dashboards.log('Error uploading file');
      },

      validationError: function () {
        Dashboards.log('File type not allowed.');
      },

      isValidFilename: function (filename) {
        var reg = myself.getSettings('expressions', 'image');

        return reg.test(filename);
      }
    };

    opts = $.extend({}, _opts, opts);

    var $ph = $(ph);
    var cfrStoreEndpoint = Dashboards.getWebAppPath() + '/plugin/cfr/api/store';
    var $uploadForm = $('<form action="' + cfrStoreEndpoint + '" method="post" enctype="multipart/form-data">').addClass('WDhidden');
    var filename = '';

    var validateForm = function () {
      if (opts.isValidFilename(filename)) {
        return true;
      }

      opts.validationError();

      return false;
    };

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

    var $fileInput = $('<input type="file" class="file" name="file" required/>').appendTo($uploadForm);
    var $pathInput = $('<input type="hidden" name="path" value="' + opts.root + '"/>').appendTo($uploadForm);
    var $submitInput = $('<button type="submit">').appendTo($uploadForm);

    $fileInput.attr("id", this.htmlObject + "_file");
    $fileInput.change(function () {
      if ($fileInput.val() !== "") {
        filename = $fileInput.val();

        if (filename.slice(3, 11) === "fakepath") {
          filename = filename.slice(12, filename.length);
        }

        $submitInput.click();
      }
    });

    return function () {
      $fileInput.click();
    };
  };

  myself.testFile = function (url, successCallback, errorCallback) {
    successCallback = successCallback || function () {
      return true;
    };

    errorCallback = errorCallback || function () {
      return true;
    };

    $.ajax({
      url: url,
      type: 'HEAD',
      error: errorCallback,
      success: successCallback
    });
  };


  myself.runEndpoint = function (pluginId, endpoint, opts0) {
    if (!pluginId && !endpoint) {
      Dashboards.log('PluginId or endpointName not defined.');

      return false;
    }

    var _opts = {
      success: function () {
        Dashboards.log(pluginId + ': ' + endpoint + ' ran successfully.');
      },

      error: function () {
        Dashboards.log(pluginId + ': error running ' + endpoint + '.');
      },

      params: {},
      systemParams: {},

      type: 'POST',
      dataType: 'json'
    };

    var opts = $.extend({}, _opts, opts0);
    var url = Dashboards.getWebAppPath() + '/plugin/' + pluginId + '/api/' + endpoint;

    function successHandler(json) {
      if (json && json.result === false) {
        opts.error.apply(this, arguments);
      } else {
        opts.success.apply(this, arguments);
      }
    }

    function errorHandler() {
      opts.error.apply(this, arguments);
    }

    var ajaxOpts = { // XXX - do this better
      url: url,
      async: true,
      type: endpoint !== 'renderer/refresh' ? opts.type : 'GET',
      dataType: opts.dataType,
      success: successHandler,
      error: errorHandler,
      data: {}
    };

    _.each(opts.params, function (value, key) {
      ajaxOpts.data['param' + key] = value;
    });

    _.each(opts.systemParams, function (value, key) {
      ajaxOpts.data[key] = value;
    });

    $.ajax(ajaxOpts);
  };

  myself.getEndpointCaller = function (pluginId, endpoint, opts) {
    var myself = this;

    return function (callback, errorCallback, params) {
      var _opts = $.extend({}, opts);
      _opts.params = params || _opts.params;
      _opts.success = callback || _opts.success;
      _opts.error = errorCallback || _opts.error;

      myself.runEndpoint(pluginId, endpoint, _opts);
    };
  };

  myself.publishToServer = function (callback) {
    $.ajax({
      url: Dashboards.getWebAppPath() + '/plugin/sparkl/api/reloadPlugins',
      type: 'POST',
      data: {
        'publish': 'now',
        'class': 'org.pentaho.platform.plugin.services.pluginmgr.PluginAdapter'
      },
      success: callback
    });
  };

  myself.addCallWrapper = function (caller, callback) {
    return function (/* json */) {
      caller(callback);
    };
  };
  myself.addRefreshWrapper = function (pluginId, callback) {
    var endpoint = pluginId !== 'pentaho-cdf-dd' ? 'refresh' : 'renderer/refresh'; // XXX - do this better

    var caller = this.getEndpointCaller(pluginId, endpoint, {
      dataType: 'text'
    });

    return this.addCallWrapper(caller, callback);
  };

  myself.addPublishWrapper = function (callback) {
    // HACK: This call is only here because cpk is acting weird after a publish. Remove when bug
    // on cpk is found!!!
    var cb = function () {
      $.ajax({
        url: Dashboards.getWebAppPath() + '/plugin/sparkl/api/getpluginmetadata',
        type: 'GET',
        async: true,
        success: callback,
        error: callback
      });
    };

    return this.addCallWrapper(this.publishToServer, cb);
  };

})(sparkl);

/************************************  AddIns ************************************/
(function () {

  var actionButtonsOpts = {
    name: "actionButtons",
    label: "Action Buttons",
    defaults: {
      buttons: [{
        cssClass: "viewButton",
        title: "View",
        tooltip: "View",
        action: function (v, st) {
          Dashboards.log(v);
        }
      }]
    },

    init: function () {
      $.fn.dataTableExt.oSort[this.name + '-asc'] = $.fn.dataTableExt.oSort['string-asc'];
      $.fn.dataTableExt.oSort[this.name + '-desc'] = $.fn.dataTableExt.oSort['string-desc'];
    },

    implementation: function (tgt, st, opt) {
      var $buttonContainer = $('<div/>')
        .addClass('buttonContainer')
        .addClass('numButtons-' + opt.buttons.length);

      _.each(opt.buttons, function (el, idx) {
        var $button = $("<button/>")
          .addClass(el.cssClass || "")
          .text(el.title || "")
          .attr('title', el.tooltip || "");

        $button.click(function () {
          if (el.action) {
            el.action(st.value, st);
          }
        });

        $buttonContainer.append($button);
      });

      $(tgt).empty().append($buttonContainer);
    }
  };
  Dashboards.registerAddIn("Table", "colType", new AddIn(actionButtonsOpts));


  /* edit data of table  */
  var editable = {
    name: "editable",
    label: "Editable",
    defaults: {
      action: function (v, st) {
        Dashboards.log(v);
      }
    },

    init: function () {
      // Register this for datatables sort
      var myself = this;

      $.fn.dataTableExt.oSort[this.name + '-asc'] = function (a, b) {
        return myself.sort(a, b);
      };

      $.fn.dataTableExt.oSort[this.name + '-desc'] = function (a, b) {
        return myself.sort(b, a);
      };
    },

    sort: function (a, b) {
      return this.sumStrArray(a) - this.sumStrArray(b);
    },

    implementation: function (tgt, st, opt) {
      var t = $(tgt);
      var value = st.value;
      var text = $("<input/>")
        .attr({
          'value': value,
          'type': 'text',
          'class': 'editBox'
        })
        .keyup(function (event) {
          if (event.keyCode === 13) {
            opt.action($(this).val(), st);
          }

          var obj = this.parentNode.parentNode.children[0].textContent;

          metadataParam[obj.toString()] = $(this).val();
        });

      t.empty();
      t.append(text);
    }
  };
  Dashboards.registerAddIn("Table", "colType", new AddIn(editable));

})();

$(document).ready(function () {
  $('.chzn-results li').click(function () {
    $(this).closest('.chzn-results').find('.result-relected').removeClass('result-selected');
  });
});
