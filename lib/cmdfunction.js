module.exports = function (command, job) {
    // Merge task-specific and/or target-specific options with these defaults.

    var options = this.options({}),
        spawn = require('child_process').spawn,
        task,
        done = this.async(),
        cwd = process.cwd(),
        params = ['ti', command],
        settings = appcSettings[job];

    var buildArgs = [];
    _.each(settings.options, function (obj, val) {
        params.push("--" + val + "=" + obj);
    });
    _.extend(buildArgs, params);
    if (settings.args) {
        settings.args.forEach(function (item) {
            buildArgs.push(item);
        });
    }

    task = spawn('appc', buildArgs, {
        'cwd': cwd
    });

    task.stdout.on('data', function (data) {
        if (data.indexOf("Project built successfully") !== -1) {
            done(true);
        }
        grunt.log.ok(data);
    });

    task.stderr.on('data', function (data) {
        var status = data.toString().substr(0, data.toString().indexOf(" "));
        switch (status) {
            case "[DEBUG]":
                grunt.log.debug(data);
                break;
            case "[INFO]":
                grunt.log.ok(data);
                break;
            case "[WARN]":
                grunt.log.error(data);
                break;
            case "[ERROR]":
                grunt.log.error(data);
                done(false);
                break;
            default:
                grunt.log.ok(data);
        }
    });

    task.stderr.on('error', function (data) {
        grunt.log.error(data);
        done(false);
    });

    task.stdout.on('close', function (code) {
        done(true);
    });

}