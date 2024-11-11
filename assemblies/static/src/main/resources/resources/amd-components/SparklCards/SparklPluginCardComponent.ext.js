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


define([], function() {

  return {
    webAppPath: CONTEXT_PATH
      ? CONTEXT_PATH.substr(0, CONTEXT_PATH.length - 1)
      : "/" + window.location.pathname.split( '/' )[1]
  };
});
