var src = './src';
var dest = './build/';

module.exports = {
    dest: './build/',
    sass: {
        all: src + '/sass/*.scss', //所有的sass
        src: src + 'sass/*/*.sass', //需要编译的sass
        dest: dest + '/css',
        rev: dest + '/rev/css',
        setting: {

        }
    },
    clean: {
        src: dest
    },
    rev: {
        revJson: dest + '/rev/**/*.json',
        src: '*.html',
        dest: ''
    }
}
