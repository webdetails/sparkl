/*!
 * Copyright 2002 - 2015 Webdetails, a Pentaho company. All rights reserved.
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
