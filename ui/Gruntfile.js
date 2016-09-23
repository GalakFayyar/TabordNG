module.exports = function(grunt) {
    grunt.initConfig({
        // Task configuration.
        // ngAnnotate: { ... },
        concat: {
            js: {
                src: ['app/js/**.js', 'app/js/animations/**.js', 'app/js/conf/**.js', 'app/js/directives/**.js', 'app/js/filters/**.js', 'app/js/services/**.js', 'app/js/controllers/**.js'],
                dest: 'build/app.js'
            }
        },
        uglify: {
            js: {
                src: ['build/app.js'],
                dest:'build/app.js'
            }
        }
    });

    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //register grunt default task
    grunt.registerTask('default', ['concat', 'uglify']);
}