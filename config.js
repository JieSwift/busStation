var src = './src/';
var dest = './build/';

module.exports = {
    dest: './build/',
    sass: {
        all: src + '/sass/*.scss', //所有的scss
        src: src + 'sass/app.scss', //需要编译的scss
        dest: dest + '/css',
        rev: dest + '/rev/css',
        setting: {

        }
    },
    clean: {
        src: dest
    },
    rev: {
        revJson: dest + '/rev/css/*.json',
        src: '*.html',
        dest: ''
    },
    build:{
        src:dest+'css/*.css',
        dest:dest+'css/'
    }
}
