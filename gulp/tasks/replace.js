const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const del = require('del');
const open = require('open');

const imgSource = './input';
const imgDest = './output';

gulp.task('compress', () => {
  gulp.src(`${imgSource}/**/*`)
    .pipe(imagemin([
      mozjpeg({
        // quality is compression quality. Min and max are numbers in range 0 (worst) to 100 (perfect).
        quality: 40,
        // progressive of false creates baseline JPEG file.
        progressive: true,
      }),
      pngquant({
        // quality uses the least amount of colors required to meet or exceed the max quality
        quality: '75-90',
        // Speed/quality trade-off from 1 (brute-force) to 10 (fastest). Speed 10 has 5% lower quality, but is 8 times faster than the default.
        speed: 3,
      }),
      imagemin.gifsicle({
        // interlaced gif for progressive rendering
        interlaced: false,
        // optimization level determines how much optimization is done; higher levels take longer, but may have better results.
        optimizationLevel: 4,
        // Reduce the number of distinct colors in each output GIF to num or less. Num must be between 2 and 256.
        colors: 175,
      }),
      imagemin.svgo({
        removeViewBox: true,
        // more plugins later
      })
    ],{
      verbose: true
    }))
    .pipe(gulp.dest(imgDest))
    .pipe(open(imgDest))
});

gulp.task('clean-input', () => {
  del(`${imgSource}/**/*`);
});

gulp.task('clean-output', () => {
  del(`${imgDest}/**/*`);
});
