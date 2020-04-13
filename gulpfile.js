const gulp = require('gulp');
const scss = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
const run = require("run-sequence");

gulp.task('clean', () => 
    del('build')
);

gulp.task("style", [], () => 
    gulp.src("src/scss/style.scss")
        .pipe(plumber())
        .pipe(scss())        
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream())
);

gulp.task("images", () => 
    gulp.src("src/img/**/*.{png,jpg,jpeg,svg}")
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
    ]))
    .pipe(gulp.dest("src/img"))
);

gulp.task("html", () => 
    gulp.src("src/*.html")
    .pipe(posthtml([
        include()
    ]))
    .pipe(gulp.dest("build"))
);

gulp.task("copy", () => 
    gulp.src([
        "src/fonts/**",
        "src/img/**",
        "src/js/**"
    ], {
        base: 'src'
    })
    .pipe(gulp.dest('build'))
)

gulp.task("sprite", () => 
    gulp.src("src/img/**/*.svg")
    .pipe(svgstore({
        inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest("build/img"))
);

gulp.task("serve", ["style"], () => {
    server.init({
        server: 'build/'
    })

    gulp.watch("src/scss/**/*.scss", ['style']).on("change", server.reload);
    gulp.watch("src/*.html", ["html"]).on('change', server.reload);
    gulp.watch("src/js/**/*.*", ["copy"]).on('change', server.reload)
});

gulp.task("build", done => {
    run(
        "clean",
        "images",
        "copy",
        "style",
        "sprite",
        "html",
        done
    )
})