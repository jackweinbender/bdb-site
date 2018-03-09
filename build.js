var fs = require('fs');
const hbs = require('handlebars')

const letters = require('./letters')
const pages = require('./pages')

fs.readFile('templates/index.hbs', 'utf8', function(err, contents) {
    if (err) throw err;
    let t = hbs.compile(contents)
    pages.forEach(page => {
        let output = t({letters: letters, page: page})
        fs.writeFile(`dist/${page.id}.html`, output, (err) => {
            if (err) throw err
        });
    })
});

