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

/**
 * RequireJS configuration file for sparkl
 */

(function() {

  var apiReposSparkl = 'api/repos/sparkl/';
  var sparklComponentsPath = 'resources/amd-components';

  var requirePaths = requireCfg.paths;

  var prefix;
  if (typeof KARMA_RUN !== "undefined") { // unit tests
    prefix = requirePaths['sparkl/components'] = sparklComponentsPath;

  } else if (typeof CONTEXT_PATH !== "undefined") { // production
    prefix = requirePaths['sparkl/components']  = CONTEXT_PATH + apiReposSparkl + sparklComponentsPath;

  } else if (typeof FULL_QUALIFIED_URL !== "undefined") { // embedded production
    prefix = requirePaths['sparkl/components']  = FULL_QUALIFIED_URL + apiReposSparkl + sparklComponentsPath;

  } else { // build
    prefix = requirePaths['sparkl/components'] = '../' + sparklComponentsPath;
  }

  requirePaths['sparkl/components/SparklPluginCardComponent'] = prefix + '/SparklCards/SparklPluginCardComponent';

})();
