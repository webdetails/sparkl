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


/**
 * RequireJS configuration file for sparkl
 */

(function() {

  var requirePaths = requireCfg.paths;

  var prefix;
  if(typeof KARMA_RUN !== "undefined") { // unit tests
    prefix = requirePaths['sparkl/components'] = 'resources/amd-components';

  } else if(typeof CONTEXT_PATH !== "undefined") { // production
    prefix = requirePaths['sparkl/components']  = CONTEXT_PATH + 'api/repos/sparkl/resources/amd-components';

  } else if(typeof FULL_QUALIFIED_URL != "undefined") { // embedded production
    prefix = requirePaths['sparkl/components']  = FULL_QUALIFIED_URL + 'api/repos/sparkl/resources/amd-components';

  } else { // build
    prefix = requirePaths['sparkl/components'] = '../resources/amd-components';
  }

  requirePaths['sparkl/components/SparklPluginCardComponent'] = prefix + '/SparklCards/SparklPluginCardComponent';
})();
