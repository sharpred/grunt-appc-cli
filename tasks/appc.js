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
    var appcObjects = {};
    ['options','access','config','generate','info','help','install','login','logout','new','owner','org','platform','publish','run','search','setup','switch','ti','unpublish','user','whoami'].forEach(function(option){
        appcObjects[option]={};
    });
    grunt.config.merge({
        appc : appcObjects
    });

    grunt.registerMultiTask('appc', "appc CLI tasks", function() {

        switch(this.target) {
            case "whoami":
                grunt.task.run("whoami");
                break;
            case "ti":
                var cmd = grunt.option("command");
                grunt.task.run("ti:"+cmd);
                break;
            default:
                grunt.log.ok(this.target + " not implemented.  Fork git@github.com:sharpred/grunt-appc-cli.git and submit a pull request!");
                break;
        }
    });

};
