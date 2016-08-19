module.exports = function(grunt) ***REMOVED***

    grunt.initConfig(***REMOVED***

        jshint: ***REMOVED***
            files: ['Gruntfile.js', 'client/scripts/*.js', 'routes/*.js', 'modules/*.js', 'server.js']
        ***REMOVED***,
        watch: ***REMOVED***
            files: ['client/**/*', 'server.js', 'modules/*.js', 'routes/*.js'],
            tasks: ['jshint', 'uglify', 'cssmin']
        ***REMOVED***,
        copy: ***REMOVED***
            main: ***REMOVED***
                files: [***REMOVED***
                    expand: true,
                    cwd: 'node_modules',
                    src: ['angular/**', 'angular-animate/**', 'angular-aria/**', 'angular-material/**', 'angular-messages/**', 'angular-route/**', 'angularfire/**', 'firebase/**'],
                    dest: 'public/assets/vendors'
                ***REMOVED***, ],
            ***REMOVED***,
        ***REMOVED***,
        uglify: ***REMOVED***
            options: ***REMOVED***
                mangle: false
            ***REMOVED***,
            my_target: ***REMOVED***
                files: ***REMOVED***
                    'public/assets/scripts/client.min.js': ['client/scripts/*.js']
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***,
        cssmin: ***REMOVED***
            target: ***REMOVED***
                files: [***REMOVED***
                    expand: true,
                    cwd: 'client/styles',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/assets/styles',
                    ext: '.min.css'
                ***REMOVED***]
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'watch']);

***REMOVED***;
