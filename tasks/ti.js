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
    var _ = require("lodash");
    var tiObject = {
        'build' : {
            "options" : {
                "--log-level" : "info",
                "--platform" : "ios",
                "--project-dir" : ".",
                "--target" : "device",
                "--pp-uuid" : "d8cf31a2-1071-4584-90dd-48991c746bf9",
                "--developer-name" : "Paul Ryan (5SKE6V3MFC)"
            },
            "args" : ['--no-banner', "--no-progress-bars", "--no-prompt", "--liveview"]
        }
    };
    //add some defaults.  Remove these from the array as you implement them correctly.
    ['analyze', 'analyze-options', 'analyze-plugins', 'clean', 'config', 'create', 'help', 'info', 'login', 'logout', 'module', 'plugin', 'project', 'sdk', 'setup', 'status'].forEach(function(cmd) {
        tiObject[cmd] = {};
    });

    //flesh out with some proper defaults
    //TODO

    grunt.config.merge({
        ti : tiObject
    });

    grunt.registerMultiTask('ti', 'titanium commands', function(args) {
        // Merge task-specific and/or target-specific options with these defaults.

        var options = this.options({}),
            spawn = require('child_process').spawn,
            task,
            done = this.async(),
            cwd = process.cwd(),
            params = ['ti', this.target];
        switch(this.target) {
            case 'build':
                _.each(options, function(obj, val) {
                    params.push(val + "=" + obj);
                });
                _.extend(this.data.args, params);
                grunt.log.ok(JSON.stringify(params));

                task = spawn('appc', params, {
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

                break;
            default:
                grunt.log.ok(this.target + " not implemented.  Fork git@github.com:sharpred/grunt-appc-cli.git and submit a pull request!");
        }

    });
};
