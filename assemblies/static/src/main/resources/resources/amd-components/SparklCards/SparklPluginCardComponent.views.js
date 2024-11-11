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
  'cdf/lib/jquery',
  'amd!cdf/lib/underscore',
  'cdf/lib/mustache',
  './SparklPluginCardComponent.templates',
], function(Backbone, $, _, Mustache, SparklPluginCardComponentTemplates) {

  function _testFile(url, successCallback, errorCallback) {
    successCallback = successCallback || function() {
      return true;
    };
    errorCallback = errorCallback || function() {
      return true;
    };
    $.ajax({
      url: url,
      type: 'HEAD',
      error: errorCallback,
      success: successCallback
    });
  }

  /*
   * Views
   */
  return {
    sparklNewPluginCard: Backbone.View.extend({
      template: SparklPluginCardComponentTemplates.sparklNewPluginCard,
      tagName: 'div',
      className: 'sparklNewPluginCardContainer',
      events: {},
      initialize: function() {

      },
      render: function(ph) {
        var that = this;
        that.$el.html(Mustache.render(that.template, that.model.toJSON()));

        var $optsContainer = that.$el.find('.optionsContainer');
        _.each(that.model.get('actionOpts'), function(action, idx) {
          $('<div/>').addClass('optionCont')
                     .append($('<span/>').text(action.label).addClass('label'))
                     .click(function() { that.model.fireAction(action.id); })
                     .appendTo($optsContainer);
        });
        that.$el.addClass('numActions-' + that.model.get('actionOpts').length);

        this.appendView(ph);
      },
      appendView: function(ph) {
        if(ph) {
          this.$ph = $(ph);
        }
        if(this.$ph) {
          this.$ph.append(this.$el);
        }
        return this;
      }
    }),

    sparklPluginCard: Backbone.View.extend({
      template: SparklPluginCardComponentTemplates.sparklPluginCard,
      tagName: 'div',
      className: 'sparklPluginCardContainer',
      events: {
        "click .optionsIcon": "toggleOptionsExpanded"
      },
      initialize: function() {
        this.model.on('change:imgSrc', function(v) {
          if(v) {
            this.$el.find('img').show();
          }
        });
      },
      render: function(ph) {
        var self = this;

        self.$el.html(Mustache.render(self.template, self.model.toJSON()));

        _.each(self.model.get('actionOpts'), function(action) {
          var $optsContainer = self.$el.find('.optionsContainer');
          var $opt = $("<div/>").text(action.label)
                                .attr('id', action.id)
                                .addClass('optionCont')
                                .addClass(action.classes || "");
          $optsContainer.append($opt);
          $opt.click(function() {
            self.model.fireAction(action.id);
            self.toggleOptionsExpanded(false);
          });
        });

        var imgSrc = self.model.get('imgSrc'),
          $container = self.$el.find('.imageContainer'),
          successCallback = function() {
            $('<img/>').attr('src', imgSrc).addClass('image').appendTo($container);
          },
          errorCallback = function() {
            $('<div/>').text(self.model.get('plugin_name') || self.model.get('pluginId') || "")
                       .addClass('imagePlaceholder')
                       .appendTo($container);
          };
        $container.css('background-color', self.model.get('backgroundColor'));
        _testFile(imgSrc, successCallback, errorCallback);

        self.appendView(ph);
      },
      appendView: function(ph) {
        if(ph) {
          this.$ph = $(ph);
        }
        if(this.$ph) {
          this.$ph.append(this.$el);
        }

        var $header = this.$el.find('.cardHeader'),
            $title = $header.find('.name');
        if($title.width() > $header.width()) {
          $header.addClass('overflow');
        }

        return this;
      },
      detachView: function() {
        this.$el.detach();
        return this;
      },
      toggleOptionsExpanded: function(predicate) {
        var $ph = this.$el.find('.optsExternCont');
        var pred = _.isUndefined(predicate) ? !$ph.hasClass('expanded') : predicate;
        $ph.toggleClass('expanded', pred);
      }
    })
  };
});
