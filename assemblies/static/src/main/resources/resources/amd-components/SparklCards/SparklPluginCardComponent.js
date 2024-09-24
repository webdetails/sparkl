/*!
 * Copyright 2002 - 2017 Webdetails, a Hitachi Vantara company. All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

define([
  'cdf/components/UnmanagedComponent',
  'cdf/lib/jquery',
  'amd!cdf/lib/underscore',
  './SparklCards/SparklPluginCardComponent.models',
  './SparklCards/SparklPluginCardComponent.templates',
  './SparklCards/SparklPluginCardComponent.views',
  'css!./SparklCards/SparklPluginCardComponent'
], function(
  UnmanagedComponent,
  $,
  _,
  SparklPluginCardComponentModels,
  SparklPluginCardComponentTemplates,
  SparklPluginCardComponentViews
) {

  function _getHashCode(str) {
    var hash = 0, i, char;
    if(str.length == 0) return hash;
    for(i = 0, l = str.length; i < l; i++) {
      char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  var SparklPluginCardComponent = UnmanagedComponent.extend({

    pluginActions: [{
      id: "action1",
      label: "Action 1"
    }, {
      id: "action2",
      label: "Action 2"
    }],
    newPluginActions: [{
      id: "newAction1",
      label: "New Action 1"
    }, {
      id: "newAction2",
      label: "New Action 2"
    }],

    colorPalette: ["#e6b313", "#ed5825", "#ed2556", "#0fb63a", "#5825ed"],

    _models: {},
    _views: {},
    _newPluginModel: undefined,
    _newPluginView: undefined,

    update: function() {
      $.extend(this.options, this);
      this.ph = $("#" + this.htmlObject);
      var callback = _.bind(this.handleJsonResponse, this);
      this.clean();
      this.triggerQuery(this.chartDefinition, callback);
    },

    clean: function() {
      _.each(this._models, function(model) {
        model.destroy();
      });
      this._views = {};
      this._models = {};
    },
    // construct plugins info based on query data
    handleJsonResponse: function(json) {
      var myself = this;
      var plugins = _.map(json.resultset, function(rawPlugin) {
        var plugin = {};
        _.each(rawPlugin, function(value, idx) {
          plugin[json.metadata[idx].colName] = value;
          plugin.actionOpts = myself.pluginActions; //append opts data not included in query
        });
        return plugin;
      });
      this.redraw(plugins);
    },

    getColor: function(str) {
      return this.colorPalette[Math.abs(_getHashCode(str)) % this.colorPalette.length];
    },

    redraw: function(plugins) {
      $('#' + this.htmlObject).empty();

      var cd = this.chartDefinition;
      var that = this;

      // Construct NewPlugin
      var newPlugin = {};
      newPlugin.pluginId = this.dashboard.getParameterValue('pluginIdParam');
      newPlugin.actionOpts = this.newPluginActions;

      /* Initialize New Plugin Card */
      if(!that._newPluginModel) {
        that._newPluginModel = new SparklPluginCardComponentModels.sparklNewPluginCard(newPlugin);
      } else {
        that._newPluginModel.set(newPlugin);
      }
      if(!that._newPluginView) {
        that._newPluginView = new SparklPluginCardComponentViews.sparklNewPluginCard({
          template: SparklPluginCardComponentTemplates.sparklNewPluginCard,
          model: that._newPluginModel,
          tagName: 'div'
        });
      }
      that._newPluginView.render('#' + that.htmlObject);
      that.configureListeners(that._newPluginModel, that.newPluginActions);

      /* Initialize Plugins Cards models and views */
      _.each(plugins, function(pluginOpts) {
        pluginOpts.backgroundColor = that.getColor(pluginOpts.pluginId);
        if(!that._models[pluginOpts.pluginId]) {
          that._models[pluginOpts.pluginId] = new SparklPluginCardComponentModels.sparklPluginCard(pluginOpts);
        } else {
          that._models[pluginOpts.pluginId].set(pluginOpts);
        }
        if(!that._views[pluginOpts.pluginId]) {
          that._views[pluginOpts.pluginId] = new SparklPluginCardComponentViews.sparklPluginCard({
            model: that._models[pluginOpts.pluginId],
            tagName: 'div'
          });
        }
        that.configureListeners(that._models[pluginOpts.pluginId], that.pluginActions);
      });

      _.each(this.getSortedViews(), function(v) {
        v.render('#' + that.htmlObject);
      });

    },

    getSortedViews: function(prop, direction) {
      var viewsArray = _.map(this._views, function(el) {
        return el;
      });
      if(prop) {
        viewsArray.sort(function(v1, v2) {
          var s1 = v1.model.get(prop).toLowerCase(),
              s2 = v2.model.get(prop).toLowerCase();
          return (s1 < s2) ? -1 : 1;
        });
      }
      return viewsArray;
    },

    sortViews: function(prop, direction) {
      var viewsArray = this.getSortedViews(prop, direction);
      _.each(viewsArray, function(v) {
        v.detachView().appendView();
      });
    },

    configureListeners: function(model, actions) {
      var myself = this;
      _.each(actions, function(action) {
        if(action.callback) {
          model.off('action:' + action.id);
          model.on('action:' + action.id, action.callback, this);
        }
      });
    }

  });

  return SparklPluginCardComponent;

});
