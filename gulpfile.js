const gulp = require('gulp');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const nunjucksRender = require('gulp-nunjucks-render');

// File paths
const paths = {
    css: {
        src: 'src/css/styles.css',
        dest: 'public/css'
    },
    js: {
        src: 'src/js/**/*.js',
        dest: 'public/js'
    },
    html: {
        src: 'src/pages/**/*.njk',
        dest: 'public'
    },
    images: {
        src: 'src/images/**/*.{jpg,jpeg,png,gif,svg,webp}',
        dest: 'public/images'
    }
};

// CSS task
function css() {
    return gulp.src(paths.css.src)
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('tailwindcss'),
            require('autoprefixer'),
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browserSync.stream());
}

// JavaScript task
function js() {
    return gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream());
}

// HTML task
function nunjucks() {
    return gulp.src(paths.html.src)
        .pipe(nunjucksRender({
            path: ['src/templates']
        }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

// Images task
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream());
}

// Browser sync server
function serve(done) {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
    done();
}

// Watch files
function watchFiles() {
    gulp.watch('src/css/**/*.css', css);
    gulp.watch(paths.js.src, js);
    gulp.watch(['src/pages/**/*.njk', 'src/templates/**/*.njk'], nunjucks);
    gulp.watch(paths.images.src, images);
}

// Complex tasks
const build = gulp.parallel(css, js, nunjucks, images);
const watch = gulp.series(build, serve, watchFiles);

// Export tasks
exports.css = css;
exports.js = js;
exports.nunjucks = nunjucks;
exports.images = images;
exports.build = build;
exports.default = watch;         