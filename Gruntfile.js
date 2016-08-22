module.exports = function(grunt) {

    grunt.initConfig({

        jshint: {
            files: ['Gruntfile.js', 'client/scripts/*.js', 'routes/*.js', 'modules/*.js', 'server.js']
        },
        watch: {
            files: ['client/**/*', 'server.js', 'modules/*.js', 'routes/*.js'],
            tasks: ['jshint', 'uglify', 'cssmin']
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'node_modules',
                    src: ['angular/**', 'angular-animate/**', 'angular-aria/**', 'angular-material/**', 'angular-messages/**', 'angular-route/**', 'angularfire/**', 'firebase/**'],
                    dest: 'public/assets/vendors'
                }, ],
            },
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'public/assets/scripts/client.min.js': ['client/scripts/*.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'client/styles',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/assets/styles',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'watch']);

};
