
/*
1) Instalando o gulp no computador:
	npm rm --global gulp (remover para evitar conflitos)
	npm install --global gulp-cli

2) Criar o arquivo package.json
	npm init

3) Instalando os módulos e incluindo a definição do package.json (--save-dev)
	$ npm install gulp --save-dev
	$ npm install gulp-util --save-dev
	$ npm install gulp-uglify --save-dev
	$ npm install gulp-watch --save-dev
	$ npm install gulp-concat -- save-dev
	$ npm install gulp-rename --save-dev
	$ npm install gulp-jshint --save-dev
*/

// instanciando módulos
var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('scripts', function(){
	return gulp
		.src(['src/js/**/*.js'])
		.pipe(concat('ab.js'))
		.pipe(uglify())	
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('build/js'));
});

//Tarefa para avaliar o código javascript
gulp.task('lint', function(){
	return gulp
    	.src(['src/js/**/*.js'])
        .pipe(jshint())            
        .pipe(jshint.reporter('default'));        
});

// Tarefa para verificar se os arquivos foram alterados e executar a tarefa 'scripts'
gulp.task('watch', function(){
   gulp.watch('src/js/**/*.js', function(event){
   		gutil.log('File '+event.path+' was '+event.type+', running tasks...');
        gulp.run('scripts');
   });
});

// Tarefa padrão 
gulp.task('default', function(){

	// Roda as tarefas da lista
	gulp.run('scripts', 'lint');

	// Cria um watch para verificar se os arquivos foram alterados e executar a tarefa 'scripts'
	gulp.watch('src/js/**/*.js', function(event){
   		gutil.log('File '+event.path+' was '+event.type+', running tasks...');
        gulp.run('scripts', 'lint');
   });

});