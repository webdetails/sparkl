/*! ******************************************************************************
 *
 * Pentaho
 *
 * Copyright (C) 2024 by Hitachi Vantara, LLC : http://www.pentaho.com
 *
 * Use of this software is governed by the Business Source License included
 * in the LICENSE.TXT file.
 *
 * Change Date: 2028-08-13
 ******************************************************************************/

define([], function() {

  return {

    sparklNewPluginCard:
      "   <div class='overlay'></div>" +
      "   <div class='optionsContainer'></div>" +
      "   <div class='separator'>" +
      "     <div class='horizontalRectangle'></div>" +
      "     <div class='verticalRectangle'></div>" +
      "   </div>",

    sparklPluginCard:
      "   <div class=descriptionExpandCont>" +
      "     <div class='cardHeader'>" +
      "       <div class='nameContainer'>" +
      "         <span class='name' title='{{plugin_name}}'>{{plugin_name}}</span>" +
      "       </div>" +
      "       <div class='id' title='{{pluginId}}'>{{pluginId}}</div>" +
      "     </div>" +
      "     <div class='cardBody'>" +
      "       <div class='imageContainer'>" +
      "       </div>" +
      "       <div class='descriptionContainer'>" +
      "         <div class='header'>Description</div>" +
      "         <div class='body'>{{plugin_description}}</div>" +
      "       </div>" +
      "     </div>" +
      "   </div>" +
      "   <div class='cardFooter'>" +
      "     <div class='optionsContainer'>" +
      "     </div>" +
      "   </div>"
  };
});