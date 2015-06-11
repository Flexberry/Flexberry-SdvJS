module.exports = function(grunt) {

    // Template method for stylesheets insertions in html build tasks.
    String.prototype.toCssLink = function() {
        return "<link rel=\"stylesheet\" href=\"" + this + "\" />\n";
    };

    // Template method for scripts insertions in html build tasks.
    String.prototype.toScriptLink = function() {
        return "<script type=\"text/javascript\" src=\"" + this + "\"></script>\n";
    };

    // Configure grunt tasks.
    grunt.initConfig({

        // Load package information.
        pkg: grunt.file.readJSON('package.json'),

        // Define all major directories and files names.
        srcLibraryName: 'sdv.js',
        minLibraryName: 'sdv.min.js',

        leafletPluginName: 'leaflet.sdv.js',

        srcPath: 'src',
        distPath: 'dist',
        testsPath: 'test',

        pagesSrcPath: 'pagesSrc',
        pagesDistPath: 'pagesDist',

        pagesRelativeCssPath: 'css',
        pagesCssPath: '<%= pagesDistPath %>/<%= pagesRelativeCssPath %>',

        pagesRelativeDocsPath: 'docs',
        pagesDocsPath: '<%= pagesDistPath %>/<%= pagesRelativeDocsPath %>',

        pagesRelativeTestsCoveragePath: 'coverage',
        pagesTestsCoveragePath: '<%= pagesDistPath %>/<%= pagesRelativeTestsCoveragePath %>',

        pagesRelativeDownloadsPath: 'downloads',
        pagesDownloadsPath: '<%= pagesDistPath %>/<%= pagesRelativeDownloadsPath %>',

        pagesRelativeScriptsPath: 'scripts',
        pagesScriptsPath: '<%= pagesDistPath %>/<%= pagesRelativeScriptsPath %>',

        pagesRelativeLibraryPath: '<%= pagesRelativeScriptsPath %>/sdv',
        pagesRelativeLibraryRef: '<%=  pagesRelativeLibraryPath %>/<%= srcLibraryName %>',
        pagesLibraryPath: '<%= pagesDistPath %>/<%= pagesRelativeLibraryPath %>',

        pagesRelativeLeafletPluginRef: '<%=  pagesRelativeLibraryPath %>/<%= leafletPluginName %>',

        pagesRelativeTestsPath: '<%= pagesRelativeScriptsPath %>/sdvTest',
        pagesTestsPath: '<%= pagesDistPath %>/<%= pagesRelativeTestsPath %>',

        pagesRelativeVendorScriptsPath: '<%= pagesRelativeScriptsPath %>/vendor',
        pagesTemplatesSharedPath: '<%= pagesSrcPath %>/shared',

        pagesRelativeHighlightPath: '<%= pagesRelativeVendorScriptsPath %>/highlightjs',
        pagesTemplatesHighlightPath: '<%= pagesTemplatesSharedPath %>/highlight',
        pagesRelativeHighlightJsRef: '<%= pagesRelativeHighlightPath %>/highlight.pack.js',
        pagesRelativeHighlightCssRef: '<%= pagesRelativeHighlightPath %>/styles/monokai.css',

        pagesRelativeSliderPath: '<%= pagesRelativeVendorScriptsPath %>/jsImageSlider',
        pagesTemplatesSliderPath: '<%= pagesTemplatesSharedPath %>/jsImageSlider',
        pagesRelativeSliderJsRef: '<%= pagesRelativeSliderPath %>/js-image-slider.js',
        pagesRelativeSliderCssRef: '<%= pagesRelativeSliderPath %>/js-image-slider.css',

        currentLibraryArchiveName: '<%= pagesDownloadsPath %>/<%= pkg.name %>-<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>',

        pagesTemplatesEmptyTemplatesPath: '<%= pagesSrcPath %>/emptyTemplates',
        pagesTemplatesEmptyPageRef: '<%= pagesTemplatesEmptyTemplatesPath %>/emptyPage.html',
        pagesTemplatesEmptyMarkdownRef: '<%= pagesTemplatesEmptyTemplatesPath %>/emptyMarkdown.md',

        leafletCdnJsRef: 'http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js',
        leafletCdnCssRef: 'http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css',
        jqueryCdnJsRef: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js',

        // Concat library code source files.
        concat: {
            options: {
                separator: '\n\n',
                banner: '/*! <%= pkg.title %> version <%= pkg.version %>.\n' +
                '    <%= pkg.description %>.\n' +
                '    Builded <%= grunt.template.today("yyyy-mm-dd") %>.\n */\n' +
                '(function(window, document, undefined) {\n    \'use strict\';\n\n',
                footer: '\n})(window, document);',
                process: function(src, filepath) {
                    return src.replace(/^/g, "    ").replace(/\n/g, "\n    ");
                }
            },
            main: {
                src: [
                    /* Library code source files. */
                    /* Base script including library entry point. */
                    '<%= srcPath %>/sdv.js',

                    /* Scripts including base library utilities. */
                    '<%= srcPath %>/util/sdv.util.js',

                    /* Script including validation utilities. */
                    '<%= srcPath %>/util/sdv.util.validation.js',

                    /* Script with type-related utilities. */
                    '<%= srcPath %>/util/sdv.util.boolean.js',
                    '<%= srcPath %>/util/sdv.util.string.js',
                    '<%= srcPath %>/util/sdv.util.number.js',
                    '<%= srcPath %>/util/sdv.util.array.js',
                    '<%= srcPath %>/util/sdv.util.function.js',
                    '<%= srcPath %>/util/sdv.util.object.js',

                    /* Script including JSON utilities. */
                    '<%= srcPath %>/util/sdv.util.json.js',

                    /* Script including XML utilities. */
                    '<%= srcPath %>/util/sdv.util.xml.js',

                    /* Script including AJAX utilities. */
                    '<%= srcPath %>/util/sdv.util.ajax.js',

                    /* Script including GeoJSON utilities. */
                    '<%= srcPath %>/util/sdv.util.geojson.js',

                    /* Scripts including facilities to localize text resources/messages of the library. */
                    '<%= srcPath %>/localization/sdv.localization.js',
                    '<%= srcPath %>/localization/sdv.localization.ru.js',
                    '<%= srcPath %>/localization/sdv.localization.en.js',

                    /* Script including LINQ-like enumerable facilities. */
                    '<%= srcPath %>/enumerable/sdv.enumerable.js',

                    /* Script including templated conditions facilities. */
                    '<%= srcPath %>/condition/sdv.condition.js',

                    /* Script including capabilities for working with colors. */
                    '<%= srcPath %>/color/sdv.color.js',
                    '<%= srcPath %>/color/sdv.color.random.js',
                    '<%= srcPath %>/color/model/sdv.color.model.js',
                    '<%= srcPath %>/color/model/sdv.color.model.hex.js',
                    '<%= srcPath %>/color/model/sdv.color.model.rgb.js',
                    '<%= srcPath %>/color/model/sdv.color.model.hsl.js',
                    '<%= srcPath %>/color/model/sdv.color.model.hsb.js',

                    /* Analysis tools */
                    '<%= srcPath %>/tool/sdv.tool.js',
                    '<%= srcPath %>/tool/base/sdv.tool.base.js',
                    '<%= srcPath %>/tool/choropleth/sdv.tool.choropleth.js',
                    '<%= srcPath %>/tool/choropleth/mode/sdv.tool.choropleth.mode.random.js'
                ],
                dest: '<%= distPath %>/<%= srcLibraryName %>'
            },
            leaflet: {
                src: [
                    '<%= srcPath %>/visualization/leaflet/leaflet.sdv.js',
                    '<%= srcPath %>/visualization/leaflet/leaflet.sdv.choropleth.js'
                ],
                dest: '<%= distPath %>/<%= leafletPluginName %>'
            }
        },

        // Minify results of concatenation.
        uglify: {
            options: {
                banner: '/*! <%= pkg.title %> version <%= pkg.version %>.\n    <%= pkg.description %>.\n    Builded <%= grunt.template.today("yyyy-mm-dd") %>.\n */\n'
            },
            main: {
                files: {
                    // Use concatenation results instead of source files.
                    '<%= distPath %>/<%= minLibraryName %>': '<%= concat.main.dest %>'
                }
            }
        },

        // Copy some prepared files.
        copy: {
            // Copy prepared scripts to pagesDist directory.
            main: {
                expand: true,
                flatten: true,
                cwd: '<%= distPath %>',
                src: '**/*',
                dest: '<%= pagesLibraryPath %>'
            },

            // Copy prepared unit tests to tests pages.
            tests: {
                options: {
                    process: function(src, filepath) {
                        return 'mocha.setup(\'bdd\');\n' +
                            'chai.should();\n' +
                            'var expect = chai.expect;\n' +
                            'var assert = chai.assert;\n\n' +
                            src + '\n\n' +
                            'mocha.run();';
                    }
                },
                expand: true,
                cwd: '<%= testsPath %>',
                src: '**/*',
                dest: '<%= pagesTestsPath %>'
            },

            // Copy LICENSE file to directories of those pages, which where generated from README.md (it has a LICENSE link).
            license: {
                files: {
                    '<%= pagesDistPath %>/LICENSE': 'LICENSE',
                    '<%= pagesDocsPath %>/LICENSE': 'LICENSE'
                }
            }
        },

        // Convert jsdoc comments to a single markdown file.
        jsdoc2md: {
            main: {
                options: {
                    // All @example blocks will be concluded into such construction: '''javascript <examples code here> '''.
                    "example-lang": 'javascript',

                    // Start size of header wil be <h1> instead of default <h2>.
                    "heading-depth": 1
                },
                src: '<%= concat.main.dest %>',
                dest: '<%= pagesSrcPath %>/docs/DOCS.md'
            }
        },

        // Generate some html with content from markdown files.
        markdown: {
            index: {
                src: 'README.md',
                dest: '<%= pagesSrcPath %>/index/index.html',
                options: {
                    template: '<%= pagesSrcPath %>/index/indexTemplate.html',
                    markdownOptions: {
                        gfm: true,
                        highlight: 'manual'
                    }
                }
            },
            docs: {
                // Commented for a while. Till documentation template is not prepared.
                // src: '<%= jsdoc2md.main.dest %>',
                src: '<%= pagesTemplatesEmptyMarkdownRef %>',
                dest: '<%= pagesSrcPath %>/docs/docs.html',
                options: {
                    template: '<%= pagesSrcPath %>/docs/docsTemplate.html',
                    markdownOptions: {
                        gfm: true,
                        highlight: 'manual'
                    }
                }
            }
        },

        // Build pages from templates.
        htmlbuild: {
            // Common options.
            options: {
                beautify: true,
                relative: true,
                styles: {
                    pageAdditionalInlineStyles: []
                },
                sections: {
                    pageContent: '<%= pagesTemplatesEmptyPageRef %>'
                },
                scripts: {
                    pageAdditionalInlineScripts: []
                },
                data: {
                    pageTitle: 'SDV.js'
                }
            },
            page404: {
                src: '<%= pagesSrcPath %>/masterPage.html',
                dest: '<%= pagesDistPath %>/404.html',
                options: {
                    sections: {
                        pageContent: '<%= pagesSrcPath %>/404/404.html'
                    },
                    data: {
                        pageTitle: 'SDV Error 404'
                    }
                }
            },
            index: {
                src: '<%= pagesSrcPath %>/masterPage.html',
                dest: '<%= pagesDistPath %>/index.html',
                options: {
                    styles: {
                        pageAdditionalInlineStyles: [
                            '<%= pagesTemplatesHighlightPath %>/styleOverrides.css',
                            '<%= pagesTemplatesSliderPath %>/styleOverrides.css'
                        ]
                    },
                    sections: {
                        pageContent: '<%= pagesSrcPath %>/index/index.html'
                    },
                    scripts: {
                        pageAdditionalInlineScripts: [
                            '<%= pagesTemplatesHighlightPath %>/initialization.js',
                            '<%= pagesTemplatesSliderPath %>/initialization.js'
                        ]
                    },
                    data: {
                        pageTitle: 'SDV Overview',
                        pageAdditionalStyles: '<%= pagesRelativeHighlightCssRef.toCssLink() %>' +
                                              '<%= pagesRelativeSliderCssRef.toCssLink() %>',
                        overviewMiAdditionalClass: 'current',
                        pageAdditionalScripts: '<%= pagesRelativeHighlightJsRef.toScriptLink() %>' +
                                               '<%= jqueryCdnJsRef.toScriptLink() %>' +
                                               '<%= pagesRelativeSliderJsRef.toScriptLink() %>'
                    }
                }
            },
            examples: {
                src: '<%= pagesSrcPath %>/masterPage.html',
                dest: '<%= pagesDistPath %>/examples.html',
                options: {
                    sections: {
                        pageContent: '<%= pagesSrcPath %>/examples/examples.html'
                    },
                    scripts: {
                        pageAdditionalInlineScripts: [
                            '<%= pagesSrcPath %>/examples/leafletExample.js'
                        ]
                    },
                    data: {
                        pageTitle: 'SDV Examples',
                        pageAdditionalStyles: '<%= leafletCdnCssRef.toCssLink() %>',
                        examplesMiAdditionalClass: 'current',
                        pageAdditionalScripts: '<%= leafletCdnJsRef.toScriptLink() %>' +
                                               '<%= pagesRelativeLibraryRef.toScriptLink() %>' +
                                               '<%= pagesRelativeLeafletPluginRef.toScriptLink() %>'
                    }
                }
            },
            docs: {
                src: '<%= pagesSrcPath %>/masterPage.html',
                dest: '<%= pagesDistPath %>/docs.html',
                options: {
                    styles: {
                        pageAdditionalInlineStyles: [
                            '<%= pagesTemplatesHighlightPath %>/styleOverrides.css'
                        ]
                    },
                    sections: {
                        pageContent: '<%= pagesSrcPath %>/docs/docs.html'
                    },
                    scripts: {
                        pageAdditionalInlineScripts: [
                            '<%= pagesTemplatesHighlightPath %>/initialization.js'
                        ]
                    },
                    data: {
                        pageTitle: 'SDV API Documentation',
                        pageAdditionalStyles: '<%= pagesRelativeHighlightCssRef.toCssLink() %>',
                        documentationMiAdditionalClass: 'current',
                        pageAdditionalScripts: '<%= pagesRelativeHighlightJsRef.toScriptLink() %>'
                    }
                }
            },
            tests: {
                src: '<%= pagesSrcPath %>/masterPage.html',
                dest: '<%= pagesDistPath %>/tests.html',
                options: {
                    sections: {
                        pageContent: '<%= pagesSrcPath %>/tests/tests.html'
                    },
                    data: {
                        pageTitle: 'SDV Unit Tests',
                        testsMiAdditionalClass: 'current'
                    }
                }
            },
            downloads: {
                src: '<%= pagesSrcPath %>/masterPage.html',
                dest: '<%= pagesDistPath %>/downloads.html',
                options: {
                    sections: {
                        pageContent: '<%= pagesSrcPath %>/downloads/downloads.html'
                    },
                    data: {
                        pageTitle: 'SDV Downloads',
                        downloadsMiAdditionalClass: 'current'
                    }
                }
            }
        },

        // Generate docs from jsdoc-comments.
        jsdoc: {
            main: {
                src: ['<%= concat.main.dest %>', 'README.md'],
                options: {
                    destination: '<%= pagesDocsPath %>',
                    private: false
                }
            }
        },

        // Clear some directories.
        clean: {
            docs: {
                src: ['<%= jsdoc.main.options.destination %>']
            },

            // Remove coverage-report catalog from project root.
            coverage: {
                src: ['coverage']
            }
        },

        // Compress prepared scripts into archives (for downloads).
        compress: {
            zipArchive: {
                options: {
                    mode: 'zip',
                    archive: '<%= currentLibraryArchiveName %>.zip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= distPath %>',
                    src: '**'
                }]
            },
            tgzArchive: {
                options: {
                    mode: 'tgz',
                    archive: '<%= currentLibraryArchiveName %>.tgz'
                },
                files: '<%= compress.zipArchive.files %>'
            }
        },

        // Run unit tests.
        karma: {
            // Single run mode.
            main: {
                configFile: 'karma.conf.js',
                singleRun: true,
                background: false
            },

            // Continuous integration mode.
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: false,
                background: true,
                browsers: ['PhantomJS']
            }
        },

        // Watch for changes in source files.
        watch: {
            main: {
                files: '<%= concat.main.src %>',
                tasks: [
                    'concat',
                    'uglify',
                    'clean:docs',
                    'copy:main',
                    'copy:license',
                    'jsdoc',
                    'jsdoc2md',
                    'compress',
                    'markdown',
                    'htmlbuild',
                    'karma:continuous:run',
                    'clean:coverage'
                ]
            },
            tests: {
                files: ['<%= testsPath %>/**/*'],
                tasks: [
                    'copy:tests',
                    'karma:continuous:run',
                    'clean:coverage'
                ]
            },
            html: {
                files: ['README.md', '<%= pagesSrcPath %>/**/*'],
                tasks: [
                    'clean:docs',
                    'copy:license',
                    'jsdoc',
                    'jsdoc2md',
                    'markdown',
                    'htmlbuild'
                ]
            },
            license: {
                files: ['LICENSE'],
                tasks: ['copy:license']
            }
        },

        'gh-pages': {
            options: {
                base: '<%= pagesDistPath %>'
            },
            src: '**/*'
        }
    });

    // Load required plugins.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks("grunt-jsdoc-to-markdown");
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-gh-pages');

    // Default task, with followed expectation of changes in source code or in unit tests.
    grunt.registerTask('default', [
        'concat',
        'uglify',
        'clean:docs',
        'copy',
        'jsdoc',
        'jsdoc2md',
        'compress',
        'markdown',
        'htmlbuild',
        'karma:continuous:start',
        'watch'
    ]);

    // The task for a single-run of all required activities.
    grunt.registerTask('runOnce', [
        'concat',
        'uglify',
        'clean:docs',
        'copy',
        'jsdoc',
        'jsdoc2md',
        'compress',
        'markdown',
        'htmlbuild',
        'karma:main:single',
        'clean:coverage'
    ]);

    // The task for a single-run of all required activities, except unit-tests.
    grunt.registerTask('runOnceNoTests', [
        'concat',
        'uglify',
        'clean:docs',
        'copy',
        'jsdoc',
        'jsdoc2md',
        'compress',
        'markdown',
        'htmlbuild'
    ]);

    // Pages building task.
    grunt.registerTask('buildPages', [
        'concat',
        'clean:docs',
        'copy',
        'jsdoc',
        'jsdoc2md',
        'markdown',
        'htmlbuild'
    ]);

    // The task for a single-run of unit tests.
    grunt.registerTask('runTests', [
        'karma:main:single',
        'clean:coverage'
    ]);
};