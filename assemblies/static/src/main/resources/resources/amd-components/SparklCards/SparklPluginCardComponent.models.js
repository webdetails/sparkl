/*! ******************************************************************************
 *
 * Pentaho
 *
 * Copyright (C) 2024 by Hitachi Vantara, LLC : http://www.pentaho.com
 *
 * Use of this software is governed by the Business Source License included
 * in the LICENSE.TXT file.
 *
 * Change Date: 2029-07-20
 ******************************************************************************/


define([
  'amd!cdf/lib/backbone',
  './SparklPluginCardComponent.ext',
], function(Backbone, SparklPluginCardComponentExt) {

  /*
   * Models
   */
  return {
    sparklNewPluginCard: Backbone.Model.extend({
      defaults: {
        "pluginId": "newPluginId",
        "actionOpts": []
      },
      fireAction: function(action) {
        this.trigger('action:' + action, this.get('pluginId'));
      }
    }),

    sparklPluginCard: Backbone.Model.extend({
      defaults: {
        "pluginId": "",
        "plugin_name": "",
        "plugin_description": "",
        "author_name": "",
        "company_name": "",
        "company_url": "",
        "creation_date": "",
        "version": "",
        "CPK_version": "",
        "pluginImage": "",
        "actionOpts": [],
        "imgSrc": "",
        "backgroundColor": "none"
      },
      initialize: function() {
        var pluginId = this.get('pluginId'),
            imgSrc = SparklPluginCardComponentExt.webAppPath + '/api/repos/' + pluginId + '/static/system/img/pluginLogo.png';
        this.set('imgSrc', imgSrc);
      },
      fireAction: function(action) {
        this.trigger('action:' + action, this.get('pluginId'));
      }
    })
  };
});
