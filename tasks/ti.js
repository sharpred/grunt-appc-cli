/*
 * grunt-appc-cli
 * https://github.com/paulryanwork/grunt-appc-cli
 *
 * Copyright (c) 2015 Paul Ryan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    var tiObject = {
        'build' : {
            options : {
                "params" : [1, 2, 3],
                "log-level" : "info"
            }
        },
        create : {}
    };
    //add some defaults.  Remove these from the array as you implement them correctly.
    ['analyze', 'analyze-options', 'analyze-plugins', 'clean', 'config', 'help', 'info', 'login', 'logout', 'module', 'plugin', 'project', 'sdk', 'setup', 'status'].forEach(function(option) {
        tiObject[option] = {};
    });

    grunt.config.merge({
        ti : tiObject
    });

    grunt.registerMultiTask('ti', 'titanium commands', function(args) {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({}),
            spawn = require('child_process').spawn,
            task,
            done = this.async(),
            cwd = process.cwd();

         task = spawn('appc', ['ti', this.target], {
         'cwd' : cwd
         });

         task.stdout.on('data', function(data) {
         grunt.log.ok(data);
         });

         task.stderr.on('error', function(data) {
         grunt.log.error(data);
         });

         task.stdout.on('close', function(code) {
         done(true);
         });

    });
};
