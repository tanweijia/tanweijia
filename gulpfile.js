// 在nodejs环境下运行的js文件
// 按照nodejs的语法使用

// 引用模块: require();  得到一个对象/函数
// gulp,gulp-sass

let gulp = require('gulp');//{task(),}
// ==========================================
let sass = require('gulp-sass');//fn


// sass->css
gulp.task('compileSass',function(){
	// 先查找sass文件所在目录
	gulp.src('./src/sass/*.scss') // 返回文件流（液体，文件在内存中的状态）

	// scss->css
	.pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))

	// 输出到硬盘
	.pipe(gulp.dest('./src/css/'))
});


// 监听文件修改，自动执行编译任务
gulp.task('watch',function(){
	gulp.watch('./src/sass/*.scss',['compileSass'])
})
// =================================================
// es6-->es5
let babel = require('gulp-babel');

gulp.task('es6',function(){
	gulp.src('./src/js/*.js')
	.pipe(babel({
		'presets':['es2015']
	}))
	.pipe(gulp.dest('./dist/js/es5/'))
});

// ============================================
// js压缩
// let uglify = require('gulp-uglify');
let pump = require('pump');
let concat = require('gulp-concat');
let rename = require('gulp-rename');

gulp.task('compressJs',function(cb){
	// gulp.src('./src/js/**/*.js')

	// .pipe(uglify())

	// // 输出到构建目录
	// .pipe(gulp.dest('./dist/js/'))

	pump([
		gulp.src('./src/js/es5/*.js'),

		// 合并
		concat('all.js'),
		gulp.dest('./dist/js/'),

		// 压缩
		uglify(),

		// 重命名
		rename({
			suffix:'.min'
		}),

		gulp.dest('dist/js/')
	],cb );
});

// 自动刷新服务器
let browserSync = require('browser-sync');

// 静态服务器
gulp.task('server',()=>{
	browserSync({
		// 服务器路径
		// server:'./src/',

		// 代理服务器
		proxy:'http://localhost:2323',

		// 端口
		port:666,

		// 监听文件修改，自动刷新
		files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
	});

	// 监听sass文件修改，并自动编译
	gulp.watch('./src/sass/*.scss',['compileSass'])
})

//压缩css文件
let cssmin=require('gulp-cssmin');
gulp.task('cssmin',function(){
  return gulp.src('src/css/*.css')
  			 .pipe(cssmin())
  			 .pipe(gulp.dest('dist/css'));
});

//压缩css文件 并重命名
// let rename=require('gulp-rename');
gulp.task('rename',function(){
  return gulp.src('src/css/*.css')
  			 .pipe(cssmin())
  			 .pipe(rename({suffix: '.min'}))
  			 .pipe(gulp.dest('dist/css'));
});

//压缩js并重命名
var uglify=require('gulp-uglify');

gulp.task('uglify',function(){
  return gulp.src('src/lib/*.js')
  			 .pipe(uglify())
  			 .pipe(rename({suffix: '.min.js'}))
  			 .pipe(gulp.dest('dist/lib'));
});

//压缩图片

var imagemin=require('gulp-imagemin');

gulp.task('imagemin',function(){
  return gulp.src('src/images/*')
  			 .pipe(imagemin())
  			 .pipe(gulp.dest('dist/images'));
});


//布置任务：将src目录下的index.html 复制到dist目录下

gulp.task('copyfile',function(){
	return gulp.src('src/index.html').pipe(gulp.dest('dist/'));	
});