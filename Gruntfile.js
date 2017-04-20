module.exports = function(grunt) {

    grunt.initConfig({
        'gh-pages': {
            options: {
                base: '_book',
                repo: 'git@git.oschina.net:waterloocode/nginxDevelopmentGuide.git'
            },
            src: ['**']
        }
    });
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.registerTask('default', ["gh-pages"]);
};