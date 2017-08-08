/*
 * grunt-appc-cli
 * https://github.com/paulryanwork/grunt-appc-cli
 *
 * Copyright (c) 2015 Paul Ryan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    var _ = require("lodash");
    var tiObject = {};
    var cmdfunction = require("./lib/cmdfunction");

    var appcSettings = grunt.config.get("appc-cli");

    grunt.registerTask('ti', 'titanium commands', cmdfunction);
}